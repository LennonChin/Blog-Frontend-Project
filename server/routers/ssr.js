/**
 * 处理生产环境时SSR的Router情况
 */
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const VueServerRender = require('vue-server-renderer');

const serverRender = require('./server-render');

const clientManifest = require('../../dist/vue-ssr-client-manifest.json');
const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    runInNewContext: 'once',
    inject: false,
    clientManifest
  }
);

const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
);

const pageRouter = new Router();

pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template);
});

module.exports = pageRouter;
