const ejs = require('ejs');
const chalk = require('chalk');

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html';
  /**
   * 用于在服务端渲染时传入到VueServerRender里面
   * VueServerRender会在渲染完成后在上面插入一些属性方便我们渲染HTML，如JS路径、CSS路径
   * */
  const context = { url: ctx.url };
  try {
    const appString = await renderer.renderToString(context);
    const meta = context.meta.inject();
    ctx.body = ejs.render(template, {
      appString,
      meta: meta,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      initialState: context.renderState()
    });
  } catch (err) {
    console.log(chalk.red('Render Error ', err));
    throw err;
  }
};
