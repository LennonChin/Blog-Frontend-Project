import createApp from './create-app';
import {
  initCopyCodeAction,
  initToggleCodeNumAction,
  initToggleCodeTheme,
  initToggleBreakCodeAction,
  initToggleFoldCodeAction,
  loadFromLocal,
  refreshLocal
} from '@/common/js/utils';

const {app, router, store} = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
  // 控制页面LocalStorage的强制刷新
  refreshLocal(window.__INITIAL_STATE__.base.siteInfo.is_force_refresh, window.__INITIAL_STATE__.base.siteInfo.force_refresh_time);
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
