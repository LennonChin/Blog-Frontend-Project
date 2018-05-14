import API from 'API';
import AES from 'crypto-js/aes';
import MD5 from 'crypto-js/md5';
import ENCUTF8 from 'crypto-js/enc-utf8';
import {mapState} from 'vuex';
import {LineBreakMode} from '@/common/js/const';

// 按社交方式格式化时间
export function socialDateFormat(formateDate) {
  let timestamp = Date.parse(new Date(formateDate));
  // 获取时间戳
  let time = new Date().getTime();
  // 去掉时间戳后三位，保持一致
  time = parseInt((time - timestamp) / 1000);

  // 存储转换值
  let s;
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
    let date = new Date(parseInt(timestamp));
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
}

/**
 * LocalStorage的操作
 * classify 分类
 * key 存储键
 * value 存储值
 * */
// 存储到LocalStorage
export function saveToLocal(classify, key, value) {
  try {
    let blog = window.localStorage.__blog__;
    if (!blog) {
      blog = {};
      blog[classify] = {};
    } else {
      blog = JSON.parse(AES.decrypt(blog, 'local storage').toString(ENCUTF8));
      if (!blog[classify]) {
        blog[classify] = {};
      }
    }
    blog[classify][key] = value;
    window.localStorage.__blog__ = AES.encrypt(JSON.stringify(blog), 'local storage').toString();
  } catch (exception) {
    console.log(exception);
  }
}

// 从LocalStorage中取
export function loadFromLocal(classify, key, def) {
  try {
    let blog = window.localStorage.__blog__;
    if (!blog) {
      return def;
    }
    blog = AES.decrypt(blog, 'local storage').toString(ENCUTF8);
    blog = JSON.parse(blog)[classify];
    if (!blog) {
      return def;
    }
    let ret = blog[key];
    return ret || def;
  } catch (exception) {
    console.log(exception);
  }
}

// 检查文章加密
export function checkPostAuth(post, title, message, noAuthCallback, successCallback, failCallback) {
  let browseAuth = '';
  if (post.browse_password_encrypt) {
    let checkAuth = (browseAuth, isAutoRemove) => {
      let encryptedBrowseAuth = MD5(browseAuth).toString();
      if (encryptedBrowseAuth === post.browse_password_encrypt) {
        successCallback(encryptedBrowseAuth);
        if (isAutoRemove) {
          this.$Modal.remove();
        }
      } else {
        failCallback();
      }
    };

    this.$Modal.confirm({
      maskClosable: true,
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
        children.push(h('i-input', {
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
          },
          nativeOn: {
            keyup: (event) => {
              if (event.keyCode === 13) {
                checkAuth(browseAuth, true);
              }
            }
          }
        }));
        return h('div', {}, children);
      },
      onOk: () => {
        checkAuth(browseAuth, false);
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

  // 上传文件
  let upload = function (data) {
    let formdata = new FormData();
    formdata.append('file', file);
    formdata.append('filename', file.name);
    formdata.append('key', data['key']);
    formdata.append('token', data['token']);

    API.uploadImage(formdata).then((response) => {
      let fileURL = data.base_url + response.data.key;
      successCallback(response.data.hash, fileURL);
    }).catch((error) => {
      console.log(error);
      failCallback(error);
    });
  };

  // 获取上传Token
  API.getUploadToken({
    suffix: suffix
  }).then((response) => {
    upload(response.data);
  }).catch((error) => {
    console.log(error);
    failCallback(error);
  });
}

const siteImageBaseUrl = 'https://material.coderap.com';
export const mixin = {
  data() {
    return {
      siteImageBaseUrl: siteImageBaseUrl
    };
  },
  computed: {
    ...mapState({
      allCategorysInfo: state => state.base.allCategorysInfo
    })
  },
  methods: {
    // 用于添加图片前缀
    resolveImageTagsUrl(images) {
      images.forEach((image) => {
        let imageSrc = image.getAttribute('data-src');
        image.src = this.resolveImageUrl(imageSrc);
      });
      images = null;
    },
    resolveImageUrl(url) {
      if (url === null || url === undefined) return;
      if (url.length > 0 && url.indexOf('http') !== 0) {
        while (url.indexOf('/') === 0) {
          // 去掉前面的反斜杠
          url = url.substr(1);
        }
        return `${siteImageBaseUrl}/${url}`;
      } else {
        return url;
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
};
