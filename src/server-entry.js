/**
 * 服务端渲染入口文件
 * */
import createApp from './create-app';
const signale = require('../build/logger');

export default context => {
  /**
   * 上面的context即是在server-render.js中renderer.renderToString()方法传入的context
   * 可以给这个context赋其他的属性值
   * */
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp();
    // 给路由推一条记录，让router匹配到需要调用的组件
    router.push(context.url);
    /**
     * 只有在服务端渲染才用到
     * 在路由被推入的时候，一些异步操作都做完后才会调用这个回调
     * 一般异步操作是获取数据的操作
     * */
    router.onReady(() => {
      // 获取匹配到的所有组件
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'));
      }
      // 用于装载所有的promise
      let targetPromises = [];
      // 这个缓存用于记录已经处理的组件的key，防止循环递归导致爆栈
      let keyCache = [];
      // 包装请求数据
      const doAsyncData = (component) => {
        if (component.asyncData) {
          targetPromises.push(component.asyncData({
            route: router.currentRoute,
            store
          }));
        }
      };
      // 递归查询子组件
      const recursive = (component, key) => {
        // 判断是否有name的缓存，如果有说明已经递归过
        if (keyCache.indexOf(key) !== -1) return;
        // 缓存key
        keyCache.push(key);
        // 请求数据
        doAsyncData(component);
        // 遍历子组件
        if (component.components) {
          Object.keys(component.components).forEach(key => {
            recursive(component.components[key], key);
          });
        }
      };
      matchedComponents.map(component => {
        recursive(component, component.name);
      });
      Promise.all(targetPromises).then(data => {
        targetPromises = [];
        keyCache = [];
        context.state = store.state;
        resolve(app);
      }).catch(error => {
        signale.info(`AsyncData Error Caused URL : ${context.url}`);
        signale.info(`AsyncData Error Caused : ${error}`);
        targetPromises = [];
        keyCache = [];
        // 这里需要处理请求失败的情况，可能是文章加密了
        if (error.code === 401) {
          // 文章加密了
          signale.info(`Server-entry Auth: ${error.code}`);
          context.state = store.state;
          resolve(app);
        }
      });
    }, reject);
  });
};
