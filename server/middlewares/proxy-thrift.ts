import request from '../thrift/request';

const thriftPath = '/api/thrift';

export default async(ctx: any, next: any) => {
  if (ctx.path.startsWith(thriftPath)) {
    const params = ctx.method === 'GET' ? ctx.request.query : ctx.request.body;
    console.log(params)
    const result = await request(ctx, ctx.path.replace(thriftPath, ''), params);
    ctx.set('Content-Type', 'application/json');
    
    ctx.body = result;
  } else {
    await next();
  }
}