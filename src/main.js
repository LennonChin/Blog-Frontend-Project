import Vue from 'vue';
import router from '@/router';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import '@/common/stylus/index.styl';
import App from './App.vue';

// Element UI 组件引入
import {
  Button,
  Tabs,
  TabPane,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Menu,
  Col,
  Row,
  Input,
  Select,
  Option,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tag,
  Alert,
  Form,
  FormItem,
  DatePicker,
  TimePicker,
  Checkbox,
  Radio,
  Switch
} from 'element-ui';

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
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Tag.name, Tag);
Vue.component(Alert.name, Alert);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(DatePicker.name, DatePicker);
Vue.component(TimePicker.name, TimePicker);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Radio.name, Radio);
Vue.component(Switch.name, Switch);

let vm = new Vue({
  router,
  el: '#app',
  render: h => h(App)
});

Vue.use({
  vm
});
