/**
 * 处理开发时SSR的Router情况
 */
const Router = require('koa-router');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');

const serverRender = require('./server-render');
const serverConfig = require('../../build/webpack.server.conf');
const signale = require('../../build/logger');

// 编译webpack，生成一个webpack实例
const serverCompiler = webpack(serverConfig);
// 指定webpack的输出系统为MemoryFS，即放在内存中，提高效率
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;

let bundle;
// 使用watch可以在每次修改时进行新的打包
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  // 有些eslint之类的错误会放在stats的errors和warnings中
  stats.errors.forEach(err => signale.error(err));
  stats.warnings.forEach(warn => signale.warn(err));

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json' // 可以在VueServerPlugin实例化时指定filename，默认是这个名字
  );
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
  signale.success('New Bundle Generated');
});

const handleSSR = async (ctx) => {
  if (!bundle) {
    // 服务刚启动的时候bundle打包会非常慢
    ctx.body = '<h2>Waiting a moment for bundle generating</h2>';
    return;
  }
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8080/vue-ssr-client-manifest.json'
  );
  const clientManifest = clientManifestResp.data;
  // 使用EJS作为模板渲染
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  );
  // 生成可以直接调用render的function
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false, // 关闭render的注入操作
    clientManifest
  });

  await serverRender(ctx, renderer, template);
};

const router = new Router();
// 所有的请求都通过handleSSR处理
router.get('*', handleSSR);

module.exports = router;
