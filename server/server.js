const Koa = require('koa');
const send = require('koa-send');
const path = require('path');
const signale = require('../build/logger');
const staticRouter = require('./routers/static');

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

app.use(async (ctx, next) => {
  try {
    signale.note(`request with url ${ctx.url}`);
    await next();
  } catch (error) {
    signale.fatal(new Error(`Request ${error.message}, request with url : ${ctx.url}`));
    ctx.status = 500;
    if (isDev) {
      ctx.body = error.message;
    } else {
      ctx.body = '<h2>Please try again later</h2>';
    }
  }
});

app.use(async (ctx, next) => {
  if (/^\/+favicon\.ico/.test(ctx.path)) {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')});
  } else {
    await next();
  }
});

// 处理静态文件
app.use(staticRouter.routes()).use(staticRouter.allowedMethods());

// 区分生产环境和开发环境的Router
let pageRouter;
if (isDev) {
  pageRouter = require('./routers/dev-ssr');
} else {
  pageRouter = require('./routers/ssr');
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 9999;

app.listen(PORT, HOST, () => {
  signale.debug(`server is listening on ${HOST}:${PORT}`);
});
