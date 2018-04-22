/**
 * 服务端渲染入口文件
 * */
import createApp from './create-app';

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
      let result = [];
      // 包装请求数据
      let doAsyncData = (component) => {
        if (component.asyncData) {
          result.push(component.asyncData({
            route: router.currentRoute,
            store
          }));
        }
      };
      // 递归查询子组件
      let recursive = (component) => {
        doAsyncData(component);
        if (component.components) {
          Object.keys(component.components).forEach(key => {
            recursive(component.components[key]);
          });
        }
      };
      matchedComponents.map(component => {
        recursive(component);
      });
      Promise.all(result).then(data => {
        context.meta = app.$meta();
        context.state = store.state;
        resolve(app);
      });
    });
  });
};
