import config from '../../config/default';
import _ from 'lodash';
import uuid from 'uuid';
import { ThriftPool } from '@mtfe/thrift';
import getNamespace from './namespace';
// import { inspect } from 'util';

const trace = config.trace || {};
const { poolOptions, servers } = config.thrift;
const thriftPoolCache = {};
const DEFAULT_ENV = 'prod';
const OCTO_ENV_MAP = {
  prod: 'prod',
  production: 'prod',
  stage: 'staging',
  staging: 'staging',
  dev: 'dev',
  development: 'dev',
  test: 'test',
  qatest: 'test'
};

export default request;

/**
 * Thrift 请求接口
 * @param {object}      options
 * @param {koa.Context} options.koaContext      koa context
 * @param {String}      options.path            服务路径 /:server/:service[/:method] method 是可选的
 * @param {Object}      options.params          请求参数，
 * @param {Object}      options.header          service 自定义 header
 * 如果 path 中传了 method 可直接传请求参数，
 * 如果 path 中没传 method 则传 `{method, params}`，
 *
 * **注意**
 * thrift 文件汇总定义方法如果是位置参数，
 * 则 params 是一个数组，如果只有一个参数则可以直接传对象。
 *
 * 比如：`ResponseStruct foo(1: RequestStruct1 arg0, 2: RequestStruct2 arg1)`，
 * params 是 `{method: 'foo', params: [requestStruct1, requestStruct2]}`，
 * 只有一个参数如：`ResponseStruct foo(1: RequestStruct1 arg0)`
 * params 可以不是数组 `{method: 'foo', params: requestStruct1}`
 */
function request({koaContext, path, params: paramsArg, header}) {
  const pathParams = path.split('/').filter(v => v);
  const [server, service] = pathParams;
  let method = pathParams[2];
  let params = paramsArg;
  if (paramsArg && paramsArg.method) {
    method = paramsArg.method;
    // 先给个默认值，params 为 paramsArg
    params = [];
  }
  if (paramsArg && paramsArg.params) {
    params = paramsArg.params;
  }

  const pool = getThriftPool(koaContext, server);
  const conf = getServiceConfig(koaContext, {server, service, method, header});
  const isParamsEmpty = !Object.keys(params || {}).length;
  if (isParamsEmpty) {
    // 如果 params 是空 {} 必须传 undefined 进去，否则会出错
    return execPool(koaContext, pool, conf.Service, conf.options);
  }
  return execPool(koaContext, pool, conf.Service, conf.options, ...[].concat(params));
}

function execPool(ctx, pool, Service, options, ...args) {
  return pool.exec(Service, options, ...args)
    .then(res => {
      // let data = Object.assign({}, args.fields ? {} : { params: args }, { headers: ctx.request.headers }, { result: res }, { method: ctx.method })
      // ctx.cat.logEvent(ctx.path.replace(/\//g, '_'), `${options.serviceName}[${options.methodName}]`, ctx.cat.STATUS.SUCCESS, inspect(data, { depth: null }));
      // ctx.logger.info(`thrift 请求成功，[请求服务: ${options.serviceName}] [请求方法: ${options.methodName}]`)
      return res;
    })
    .catch((err) => {
      let error = err;
      if (typeof err === 'string') {
        error = new Error(err);
      }
      err.message += ` [请求服务: ${options.serviceName}] [请求方法: ${options.methodName}]`
      throw error;
    });
}

function getThriftPool(ctx, server) {
  const serverConf = servers[server];
  let pool = thriftPoolCache[server];
  if (!pool) {
    const options = Object.assign(
      {env: getEnv()},
      poolOptions, serverConf && serverConf.poolOptions
    );
    pool = new ThriftPool(options);
    thriftPoolCache[server] = pool;
  }
  return pool;
}

function getEnv() {
  return OCTO_ENV_MAP[process.env.NODE_ENV] || DEFAULT_ENV;
}

/**
 * 使用 config lib 来获取 thrift 的配置，配置内容见 root/config/thrift/dev 目录
 * @param {*} ctx
 * @param {*} param1
 */
function getServiceConfig(ctx, {server, service, method, header}) {
  const serverOption = servers[server] || {};
  const serviceOption = {service: '', options: {}};
  if (serverOption.service) {
    serviceOption.service = serverOption.service;
    serviceOption.options = serverOption.options || {};
    serviceOption.options.methodName = method || service;
  } else if (serverOption.services && service) {
    const serviceConf = serverOption.services[service];
    if (serviceConf && typeof serviceConf === 'string') {
      serviceOption.service = serviceConf;
      serviceOption.options.methodName = method || service;
    } else if (serviceConf) {
      serviceOption.options = serviceConf.options || {};
      if (serviceConf.service) {
        serviceOption.service = serviceConf.service;
        serviceOption.options.methodName = method || service;
      }
    }
  }

  if (!serviceOption.service) {
    if (service) {
      serviceOption.service = toBigCamelCase(service);
      serviceOption.options.methodName = method;
    } else {
      serviceOption.service = toBigCamelCase(server);
      serviceOption.options.methodName = service;
    }
  }

  if (!serviceOption.options.methodName) {
    ctx.throw(400, 'thrift 接口需要 method 参数');
  }

  try {
    serviceOption.Service = require(`./${server}/gen-nodejs/${serviceOption.service}`);
  } catch (err) {
    ctx.throw(404, 'thrift 服务不存在');
  }

  if (serverOption.serviceNamePrefix) {
    // 部分服务不能直接自动拼接，则可以指定 serviceNamePrefix
    serviceOption.options.serviceName = `${serverOption.serviceNamePrefix}.${serviceOption.service}`;
  } else {
    // 大部分服务可以自动拼接 serviceName
    const ns = getNamespace(serviceOption.service);
    if (ns) {
      serviceOption.options.serviceName = `${ns}.service.${serviceOption.service}`;
    }
  }

  serviceOption.timeout = serviceOption.timeout || 10000;

  serviceOption.options.header = _.merge(
    serviceOption.options.header || {},
    _.merge({globalContext: getHeaders(ctx)}, header)
  );

  return serviceOption;
}

/**
 * 配置通用的 Header 参数
 * https://wiki.sankuai.com/pages/viewpage.action?pageId=971313348#Http&Thrift接口规范整理版-3.1.2通用参数传递：
 * 专业服务接口约定 https://wiki.sankuai.com/pages/viewpage.action?pageId=967446392
 * 移动端的参数自己补充一下
 * @param {*} ctx
 * @param {*} custom
 */
function getHeaders(ctx, custom) {
  const headers = ctx.request.headers;
  const traceId = headers['x-trace-id'] || ctx.traceID || uuid();
  const { cookies } = ctx;
  // 美团把 uuid 定义为设备唯一识别码
  const deviceId = cookies.get('uuid') || cookies.get('iuuid') || traceId;
  // 注意 header 字段的值必须是字符串
  const header = Object.assign({
    // https://wiki.sankuai.com/pages/viewpage.action?pageId=633448084
    // 专业服务渠道 ID
    channel: headers['x-trace-channel'] || trace.channel || '',
    // PC 类型
    clientType: headers['x-trace-client'] || trace.clientType || '',
    reqTraceId: traceId,
    uuid: deviceId,
    rawIp: ctx.ip.split(':').slice(-1)[0],
    passportId: String(ctx.passportId || ''),
    misId: String(ctx.misId || ''),
    misName: String(ctx.misId || ''),
    token: ctx.token || '',
  }, custom);
  return header;
}

function toBigCamelCase(str) {
  return str.split('-').map(word => capitalized(word)).join('');
}

function capitalized(word) {
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}