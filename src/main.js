import Vue from 'vue';
import router from '@/router';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

// Element UI 组件引入
import { Button, Tabs, TabPane, Submenu, MenuItem, MenuItemGroup, Menu, Col, Row, Input, Select, Option } from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);

Vue.component(Col.name, Col);
Vue.component(Row.name, Row);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Menu.name, Menu);
Vue.component(Select.name, Select);
Vue.component(Input.name, Input);
Vue.component(Option.name, Option);

let vm = new Vue({
  router,
  el: '#app',
  render: h => h(App)
});

Vue.use({
  vm
});
