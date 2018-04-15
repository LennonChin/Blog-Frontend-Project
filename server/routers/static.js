// 处理静态文件
const Router = require('koa-router');
const send = require('koa-send');

const staticRouter = new Router({ prefix: '/public' });

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path);
});

module.exports = staticRouter;
