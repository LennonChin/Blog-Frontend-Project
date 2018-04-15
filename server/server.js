const Koa = require('koa');
const send = require('koa-send');
const path = require('path');
const pageRouter = require('./routers/dev-ssr');
const chalk = require('chalk');

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

app.use(async (ctx, next) => {
  try {
    console.log(chalk.red('==================================================='));
    console.log(chalk.red(`request with path ${ctx.path}`));
    console.log(chalk.red('==================================================='));
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    if (isDev) {
      ctx.body = err.message;
    } else {
      ctx.body = 'please try again later';
    }
  }
});

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')});
  } else {
    await next();
  }
});

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3333;

app.listen(PORT, HOST, () => {
  console.log(chalk.green(`server is listening on ${HOST}:${PORT}`));
});
