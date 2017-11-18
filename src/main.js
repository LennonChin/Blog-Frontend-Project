import Vue from 'vue';
import router from '@/router';
import 'iview/dist/styles/iview.css';
import '@/common/stylus/index.styl';
import App from './App.vue';

// iView UI 组件引入
import {
  Row,
  Col,
  Button,
  Input,
  Progress,
  Tag,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Icon,
  LoadingBar,
  Affix
} from 'iview';

Vue.component('iv-row', Row);
Vue.component('iv-col', Col);
Vue.component('iv-button', Button);
Vue.component('iv-input', Input);
Vue.component('iv-progress', Progress);
Vue.component('iv-tag', Tag);
Vue.component('iv-dropdown', Dropdown);
Vue.component('iv-dropdown-menu', DropdownMenu);
Vue.component('iv-dropdown-item', DropdownItem);
Vue.component('iv-menu', Menu);
Vue.component('iv-submenu', Submenu);
Vue.component('iv-menu-item', MenuItem);
Vue.component('iv-icon', Icon);
Vue.component('iv-loadingBar', LoadingBar);
Vue.component('iv-affix', Affix);

// 配置加载进度条
LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 2
});

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  next();
});

router.afterEach((to, from, next) => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
});

let vm = new Vue({
  router,
  el: '#app',
  render: h => h(App)
});

Vue.use({
  vm
});
