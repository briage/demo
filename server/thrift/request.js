import requestThrift from './requestThrift';

export default function(ctx, path, params) {
  return requestThrift({
    path,
    params,
    koaContext: ctx
  });
}