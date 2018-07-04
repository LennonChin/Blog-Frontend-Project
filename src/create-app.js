import Vue from 'vue';
// vue router相关
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './App.vue';
// v-viewer
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import createI18N from './i18n/i18n';
import createRouter from './router/router';
import createStore from './store/store';

// // iView UI 组件引入
import {
  Row,
  Col,
  Button,
  ButtonGroup,
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
  Affix,
  Select,
  Option,
  DatePicker,
  Switch,
  Modal,
  Message,
  Notice,
  Avatar,
  Spin,
  Tooltip,
  BackTop,
  Rate
} from 'iview';

import VueI18n from 'vue-i18n';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Viewer);

Vue.component('i-row', Row);
Vue.component('i-col', Col);
Vue.component('i-button', Button);
Vue.component('i-button-group', ButtonGroup);
Vue.component('i-input', Input);
Vue.component('i-progress', Progress);
Vue.component('i-tag', Tag);
Vue.component('i-dropdown', Dropdown);
Vue.component('i-dropdown-menu', DropdownMenu);
Vue.component('i-dropdown-item', DropdownItem);
Vue.component('i-menu', Menu);
Vue.component('i-submenu', Submenu);
Vue.component('i-menu-item', MenuItem);
Vue.component('i-icon', Icon);
Vue.component('i-loadingBar', LoadingBar);
Vue.component('i-affix', Affix);
Vue.component('i-select', Select);
Vue.component('i-option', Option);
Vue.component('i-date-picker', DatePicker);
Vue.component('i-switch', Switch);
Vue.component('i-avatar', Avatar);
Vue.component('i-backtop', BackTop);
Vue.component('i-spin', Spin);
Vue.component('i-tool-tip', Tooltip);
Vue.component('i-rate', Rate);

Vue.use(VueI18n);
Vue.locale = () => {};

Vue.prototype.$Modal = Modal;
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;

Vue.prototype.$Notice.config({
  top: 70,
  duration: 3
});

export default () => {
  // vue-router, vuex and i18n
  const router = createRouter();
  const store = createStore();
  const i18n = createI18N();
  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  });

  return { app, router, store };
};
