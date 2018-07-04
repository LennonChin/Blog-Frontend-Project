// 处理静态文件
const Router = require('koa-router');
const send = require('koa-send');
const config = require('../../config');

const staticRouter = new Router({prefix: `/${config.build.assetsPublicPath}`});

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path);
});

module.exports = staticRouter;
