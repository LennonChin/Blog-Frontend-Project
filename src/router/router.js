import Router from 'vue-router';

import routes from './routes';
import {LoadingBar, Modal, Notice} from 'iview';
import {hexMd5} from '@/common/js/md5';
import {saveToLocal, loadFromLocal} from '@/common/js/utils';

// 配置加载进度条
LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 2
});

let titleIdiom = [
  '蜂采百花酿甜蜜，人读群书明真理',
  '己所不欲，勿施于人',
  '理想是人生的太阳',
  '人生贵知心，定交无暮早',
  '真实是人生的命脉，是一切价值的根基',
  '人生中最困难者，莫过于选择',
  '有所作为是生活的最高境界',
  '爱情不过是一种疯'
];

// 整站访问控制
let accessGuard = (successCallBack, password, defaultEncrypt) => {
  let browseAuth = '';
  if (password.length === 0 || defaultEncrypt === password) {
    successCallBack();
    return;
  }
  // 获取本地网站访问控制信息进行比对
  let siteGuardInfo = loadFromLocal('site', 'site_guard_info', null);
  if (siteGuardInfo) {
    let expireTime = siteGuardInfo['expire_time'];
    let nowTimestamp = Date.parse(new Date());
    if (expireTime !== null && nowTimestamp - expireTime < 24 * 3600 * 1000) {
      browseAuth = siteGuardInfo['site_access_encrypt'];
      if (browseAuth === password) {
        successCallBack();
        return;
      }
    }
  }

  // 校验密码是否正确
  let checkAuth = (browseAuth, isAutoRemove) => {
    let encryptedBrowseAuth = hexMd5(browseAuth);
    if (encryptedBrowseAuth === password) {
      // 将认证信息保存到本地，避免多次请求
      let siteGuardInfo = {
        'expire_time': Date.parse(new Date()),
        'site_access_encrypt': encryptedBrowseAuth
      };
      saveToLocal('site', 'site_guard_info', siteGuardInfo);
      successCallBack();
      if (isAutoRemove) {
        Modal.remove();
      }
    } else {
      Notice.error({
        title: '密码错误',
        desc: '验证失败',
        onClose: () => {
          accessGuard(password, successCallBack);
        }
      });
    }
  };

  // 弹框让访问者输入密码
  Modal.confirm({
    maskClosable: true,
    render: (h) => {
      let children = [];
      children.push(h('h2', {
        domProps: {
          innerHTML: '访问受限'
        },
        'class': {
          'modal-title': true
        }
      }));
      children.push(h('p', {
        domProps: {
          innerHTML: '目前网站正在限制访问，请您输入访问密码'
        },
        'class': {
          'modal-message': true
        }
      }));
      children.push(h('iv-input', {
        props: {
          type: 'password',
          autofocus: true,
          placeholder: '请输入访问密码',
          value: ''
        },
        'class': {
          'modal-input': true
        },
        on: {
          input: (value) => {
            browseAuth = value;
          }
        },
        nativeOn: {
          keyup: (event) => {
            if (event.keyCode === 13) {
              console.log(browseAuth);
              checkAuth(browseAuth, true);
            }
          }
        }
      }));
      return h('div', {}, children);
    },
    onCancel: () => {
      Notice.error({
        title: '密码错误',
        desc: '验证失败',
        onClose: () => {
          accessGuard(password, successCallBack);
        }
      });
    },
    onOk: () => {
      checkAuth(browseAuth, false);
    }
  });
};

export default () => {
  let router = new Router({
    routes,
    mode: 'history',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  });

  router.beforeEach((to, from, next) => {
    LoadingBar.start();
    document.title = '加载中...';
    let defaultEncrypt = to.query.access_auth;
    accessGuard(next, window.__access_auth__, defaultEncrypt);
  });

  router.afterEach((to, from, next) => {
    // 停止进度条
    LoadingBar.finish();
    // 修改网页标题
    document.title = to.matched[to.matched.length - 1].meta.title + ' - ' + titleIdiom[Math.floor(Math.random() * titleIdiom.length)];
    window.scrollTo(0, 0);
  });

  return router;
};
