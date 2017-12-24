import Vue from 'vue';
import router from '@/router';
import 'iview/dist/styles/iview.css';
import '@/common/stylus/index.styl';
import App from './App.vue';

// 全局加载resource拦截器
import './axios/';
import Axios from 'axios';
import socialDateFormat from '@/common/js/utils';

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
  Affix,
  Select,
  Option,
  DatePicker,
  DatePickerCell,
  Spin
} from 'iview';

Vue.prototype.$http = Axios;

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
Vue.component('iv-select', Select);
Vue.component('iv-option', Option);
Vue.component('iv-date-picker', DatePicker);
Vue.component('iv-date-picker-cell', DatePickerCell);
Vue.component('iv-spin', Spin);

// 全局混合
Vue.mixin({
  methods: {
    socialDate: function (formatedDate) {
      return socialDateFormat(formatedDate);
    },
    responsiveRender: function (xsShow, smShow, mdShow, lgShow) {
      let clientWidth = document.body.clientWidth;
      if (clientWidth < 768) {
        return xsShow;
      } else if (clientWidth >= 768 && clientWidth < 992) {
        return smShow;
      } else if (clientWidth >= 992 && clientWidth < 1200) {
        return mdShow;
      } else if (clientWidth >= 1200) {
        return lgShow;
      }
    }
  }
});

let vm = new Vue({
  router,
  el: '#app',
  render: h => h(App)
});

Vue.use({
  vm
});
