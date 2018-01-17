import {hexMd5} from '@/common/js/md5';
import {getUploadToken} from '@/api/api';

// 按社交方式格式化时间
export function socialDateFormat(formateDate) {
  var timestamp = Date.parse(new Date(formateDate));
  // 获取时间戳
  var time = new Date().getTime();
  // 去掉时间戳后三位，保持一致
  time = parseInt((time - timestamp) / 1000);

  // 存储转换值
  var s;
  if (time < 60 * 10) {
    // 十分钟内
    return '刚刚';
  } else if ((time < 60 * 60) && (time >= 60 * 10)) {
    // 超过十分钟少于1小时
    s = Math.floor(time / 60);
    return s + '分钟前';
  } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
    // 超过1小时少于24小时
    s = Math.floor(time / 60 / 60);
    return s + '小时前';
  } else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
    // 超过1天少于3天内
    s = Math.floor(time / 60 / 60 / 24);
    return s + '天前';
  } else {
    // 超过3天
    var date = new Date(parseInt(timestamp));
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
};

// 存储到LocalStorage
export function saveToLocal(id, key, value) {
  let blog = window.localStorage.__blog__;
  if (!blog) {
    blog = {};
    blog[id] = {};
  } else {
    blog = JSON.parse(blog);
    if (!blog[id]) {
      blog[id] = {};
    }
  }
  blog[id][key] = value;
  window.localStorage.__blog__ = JSON.stringify(blog);
};

// 从LocalStorage中取
export function loadFromLocal(id, key, def) {
  let blog = window.localStorage.__blog__;
  if (!blog) {
    return def;
  }
  blog = JSON.parse(blog)[id];
  if (!blog) {
    return def;
  }
  let ret = blog[key];
  return ret || def;
};

// 检查文章加密
export function checkPostAuth(post, title, message, noAuthCallback, successCallback, failCallback) {
  let browseAuth = '';
  if (post.browse_password_encrypt) {
    this.$Modal.confirm({
      autoClosable: false,
      render: (h) => {
        let children = [];
        children.push(h('h2', {
          domProps: {
            innerHTML: title
          },
          'class': {
            'modal-title': true
          }
        }));
        children.push(h('p', {
          domProps: {
            innerHTML: message
          },
          'class': {
            'modal-message': true
          }
        }));
        children.push(h('iv-input', {
          props: {
            type: 'password',
            autofocus: true,
            placeholder: '请输入阅读密码'
          },
          'class': {
            'modal-input': true
          },
          on: {
            input: (value) => {
              browseAuth = value;
            }
          }
        }));
        return h('div', {}, children);
      },
      onOk: () => {
        let encryptedBrowseAuth = hexMd5(browseAuth);
        if (encryptedBrowseAuth === post.browse_password_encrypt) {
          successCallback(encryptedBrowseAuth);
        } else {
          failCallback();
        }
      }
    });
  } else {
    noAuthCallback();
  }
};

// 上传文件
export function uploadFile(file, useType, successCallback, failCallback) {
  let suffix = /.[^.]+$/.exec(file.name)[0];
  console.log(suffix);
  getUploadToken({
    suffix: suffix
  }).then((response) => {
    console.log('返回值', response);
  }).catch(function (error) {
    console.log(error);
    failCallback(error);
  });
}
