import createApp from './create-app';
import {
  initCopyCodeAction,
  initToggleCodeNumAction,
  initToggleCodeTheme,
  initToggleBreakCodeAction,
  initToggleFoldCodeAction,
  loadFromLocal
} from '@/common/js/utils';

const {app, router, store} = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

if (window) {
  // 初始化一些代码的操作
  initCopyCodeAction();
  initToggleCodeTheme();
  initToggleCodeNumAction();
  initToggleBreakCodeAction();
  initToggleFoldCodeAction();
  app._i18n.locale = loadFromLocal('siteConfig', 'language', 'CN');
}

router.onReady(() => {
  app.$mount('#root');
});
