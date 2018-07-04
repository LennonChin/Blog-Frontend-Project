const ejs = require('ejs');
const signale = require('../../build/logger');

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html;charset=utf-8';
  /**
   * 用于在服务端渲染时传入到VueServerRender里面
   * VueServerRender会在渲染完成后在上面插入一些属性方便我们渲染HTML，如JS路径、CSS路径
   * */
  const context = { url: ctx.url };
  try {
    // HTML页面
    const appString = await renderer.renderToString(context);
    // 处理meta信息
    const state = context.state;
    const title = state.documentTitle || state.base.siteInfo.name;
    const description = state.documentDescription || state.base.siteInfo.desc;
    const keywords = state.documentKeywords || state.base.siteInfo.keywords;

    ctx.body = ejs.render(template, {
      appString,
      title,
      description,
      keywords,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      initialState: context.renderState()
    });
  } catch (error) {
    signale.fatal(new Error(`Render ${error.message}`));
    throw error;
  }
};
