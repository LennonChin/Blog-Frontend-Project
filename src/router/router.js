import Router from 'vue-router';

import routes from './routes';
import {LoadingBar, Modal, Notice} from 'iview';
import MD5 from 'crypto-js/md5';
import {saveToLocal, loadFromLocal} from '@/common/js/utils';

// 配置加载进度条
LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 2
});

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
    let encryptedBrowseAuth = MD5(browseAuth).toString();
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
      children.push(h('i-input', {
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
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        // 先判断目标路由有没有hash值
        return {selector: to.hash};
      }
      if (savedPosition) {
        return savedPosition;
      } else {
        return {x: 0, y: 0};
      }
    }
  });

  router.beforeEach((to, from, next) => {
    try {
      LoadingBar.start();
    } catch (err) {
    }
    next();
  });

  router.afterEach((to, from) => {
    try {
      LoadingBar.finish();
    } catch (err) {
    }
  });

  return router;
};
