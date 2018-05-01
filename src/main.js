import Vue from 'vue';
// vue router相关
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import createRouter from './router/router';
import createStore from './store/store';
import 'iview/dist/styles/iview.css';
import App from './App.vue';
import Viewer from 'v-viewer';

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
  Avatar,
  Tooltip,
  BackTop,
  Rate,
  AutoComplete
} from 'iview';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Viewer);

const router = createRouter();
const store = createStore();

Vue.prototype.$Modal = Modal;
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;

Vue.prototype.$Notice.config({
  top: 70,
  duration: 3
});

Vue.component('i-row', Row);
Vue.component('i-col', Col);
Vue.component('i-button', Button);
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
Vue.component('i-date-picker-cell', DatePickerCell);
Vue.component('i-switch', Switch);
Vue.component('i-avatar', Avatar);
Vue.component('i-backtop', BackTop);
Vue.component('i-spin', Spin);
Vue.component('i-tool-tip', Tooltip);
Vue.component('i-rate', Rate);
Vue.component('i-auto-complete', AutoComplete);

// 全局混合
Vue.mixin({
  data() {
    return {
      postImageBaseUrl: 'https://material.coderap.com'
    };
  },
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
    },
    // 用于添加图片前缀
    resolveImageTagsUrl(images) {
      images.forEach((image) => {
        let imageSrc = image.getAttribute('data-src');
        if (imageSrc.length > 0 && imageSrc.indexOf('http') !== 0) {
          while (imageSrc.indexOf('/') === 0) {
            // 去掉前面的反斜杠
            imageSrc = imageSrc.substr(1);
          }
          image.src = `${this.postImageBaseUrl}/${imageSrc}`;
        } else {
          image.src = imageSrc;
        }
      });
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
  store,
  render: h => h(App)
});

vm.$mount('#root');
