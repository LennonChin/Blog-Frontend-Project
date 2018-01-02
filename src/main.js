import Vue from 'vue';
import router from '@/router';
import 'iview/dist/styles/iview.css';
import App from './App.vue';

// 全局加载resource拦截器
import Axios from 'axios';
import {socialDateFormat} from '@/common/js/utils';
import {LineBreakMode, ResponsivePoint} from '@/common/js/const';

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
  Switch,
  Modal,
  Message,
  Notice,
  Avatar
} from 'iview';

Vue.prototype.$http = Axios;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;

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
Vue.component('iv-switch', Switch);
Vue.component('iv-avatar', Avatar);

// 全局混合
Vue.mixin({
  methods: {
    // 屏幕宽度响应式判断
    responsiveRender: function (xsShow, smShow, mdShow, lgShow) {
      let clientWidth = document.body.clientWidth;
      if (clientWidth < ResponsivePoint.Sm) {
        return xsShow;
      } else if (clientWidth >= ResponsivePoint.Sm && clientWidth < ResponsivePoint.Md) {
        return smShow;
      } else if (clientWidth >= ResponsivePoint.Md && clientWidth < ResponsivePoint.Lg) {
        return mdShow;
      } else if (clientWidth >= ResponsivePoint.Lg) {
        return lgShow;
      }
    }
  },
  filters: {
    // 用于格式化时间的过滤器
    socialDate: function (formatedDate) {
      return socialDateFormat(formatedDate);
    },
    // 用于处理行尾省略号的过滤器
    textLineBreak: function (text, maxLength, lineBreakMode) {
      if (lineBreakMode === null || lineBreakMode === undefined) {
        lineBreakMode = LineBreakMode.EllipsisTruncatingTail;
      }
      switch (lineBreakMode) {
        case LineBreakMode.WrappingTruncatingTail:
          return text.substr(0, maxLength);
        case LineBreakMode.WrappingTruncatingHead:
          return text.substr(-maxLength);
        case LineBreakMode.EllipsisTruncatingTail:
          return text.substr(0, maxLength) + (text.length > maxLength ? '...' : '');
        case LineBreakMode.EllipsisTruncatingMiddle:
          let resultText = text.substr(0, maxLength);
          if (text.length > maxLength) {
            return resultText.substr(0, parseInt(maxLength / 2)) + '...' + resultText.substr(parseInt(maxLength / 2));
          }
          return resultText;
        case LineBreakMode.EllipsisTruncatingHead:
          return (text.length > maxLength ? '...' : '') + text.substr(-maxLength);
      }
      return text;
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
