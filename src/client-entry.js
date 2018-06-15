import createApp from './create-app';
import {initCopyCodeAction, initBreakCodeAction, initFoldCodeAction} from '@/common/js/utils';

const {app, router, store} = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

if (window) {
  // 初始化一些代码的操作
  initCopyCodeAction();
  initBreakCodeAction();
  initFoldCodeAction();
}

router.onReady(() => {
  app.$mount('#root');
});
