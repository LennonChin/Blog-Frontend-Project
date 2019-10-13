import API from 'API';
import AES from 'crypto-js/aes';
import MD5 from 'crypto-js/md5';
import ENCUTF8 from 'crypto-js/enc-utf8';
import {mapState} from 'vuex';
import {LineBreakMode} from '@/common/js/const';
import {Notice} from 'iview';

/**
 * 按社交方式格式化时间
 * @param formateDate
 * @returns {string}
 */
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
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month >= 10 ? month : '0' + month; // 不满10前面加0
    let day = date.getDate();
    day = day >= 10 ? day : '0' + day; // 不满10前面加0
    return year + '-' + month + '-' + day;
  }
}

/**
 * 时间前后推
 * @param dateTime 传入时间 yyyy-MM-dd
 * @param millisecond 毫秒
 * @returns {string} 返回时间 yyyy-MM-dd
 */
export function dateAdd(dateTime, millisecond) {
  let timestamp = Date.parse(new Date(dateTime));
  timestamp = timestamp + millisecond;
  let newDate = new Date(parseInt(timestamp));
  let year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  month = month >= 10 ? month : '0' + month; // 不满10前面加0
  let day = newDate.getDate();
  day = day >= 10 ? day : '0' + day; // 不满10前面加0
  return year + '-' + month + '-' + day;
}

/**
 * LocalStorage的操作
 * classify 分类
 * key 存储键
 * value 存储值
 * */
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

/**
 * 从LocalStorage中取
 * @param classify 分类
 * @param key 存储键
 * @param def 存储值
 * @returns {*} 获取的值
 */
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
    return def;
  }
}

/**
 * 强制刷新LocalStorage，防止由于代码修改，用户遗留的本地配置无法正确读取
 * @param forceRefresh 是否强制刷新
 * @param refreshTime 上次刷新时间
 */
export function refreshLocal(forceRefresh, refreshTime) {
  if (forceRefresh === null || forceRefresh === undefined || !forceRefresh ||
    refreshTime === null || refreshTime === undefined) {
    return false;
  }
  // 判断时间
  refreshTime = Date.parse(new Date(refreshTime));
  let latestRefreshTime = loadFromLocal('siteConfig', 'refreshTime', undefined);
  if (refreshTime > latestRefreshTime || latestRefreshTime === undefined) {
    // 需要刷新
    try {
      // 清空，并只存储上次刷新时间
      let blog = {
        siteConfig: {
          refreshTime: refreshTime
        }
      };
      window.localStorage.__blog__ = AES.encrypt(JSON.stringify(blog), 'local storage').toString();
      return true;
    } catch (exception) {
      console.log(exception);
      return false;
    }
  }
}

/**
 * 检查文章是否加密
 * @param post 文章数据
 * @param title 提示标题
 * @param message 提示消息正文
 * @param noAuthCallback 没有加密的回调
 * @param successCallback 解密成功的回调
 * @param failCallback 解密失败的回调
 */
export function checkPostAuth(post, title, message, noAuthCallback, successCallback, failCallback) {
  let browseAuth = '';
  if (post.need_auth) {
    /**
     * 检查加密
     * @param browseAuth 用户输入的密码
     * @param isAutoRemove 是否自动移除提示
     */
    let checkAuth = (browseAuth, isAutoRemove) => {
      let encryptedBrowseAuth = MD5(browseAuth).toString();
      API.verifyPostAuth({
        post_id: post.id,
        browse_auth: encryptedBrowseAuth
      }).then((response) => {
        // 验证通过
        successCallback(encryptedBrowseAuth);
        if (isAutoRemove) {
          this.$Modal.remove();
        }
      }).catch((error) => {
        console.log(error);
        failCallback(error);
      });
    };
    this.$Modal.confirm({
      closable: true,
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
            placeholder: '请输入访问密码'
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
      let fileURL = `${data.base_url}/${response.data.key}`;
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
    // 用于处理图片Base URL
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
    },
    // 用于处理国际化相关
    resolveI18N(key) {
      if (this.$i18n.locale === 'CN') {
        if (key.indexOf('en_') === 0) {
          return key.slice(3);
        }
        return key;
      }
      return `${this.$i18n.locale.toLowerCase()}_${key}`;
    },
    // 滚动到评论区域
    scrollToComments() {
      try {
        let commentEle = document.querySelector('#comments');
        const sTop = document.documentElement.scrollTop || document.body.scrollTop;
        const commentEleSTop = commentEle.offsetTop;
        scrollTop(window, sTop, commentEleSTop, Math.max((commentEleSTop - sTop) / 10, 1000));
      } catch (error) {
        console.log(error);
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
      if (text === undefined || text === null || text.length === 0) {
        return '';
      }
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

// scrollTop animation
export function scrollTop(el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) return;

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
}

// 复制元素的纯文本内容
export function copyInnerText(el) {
  let text = '';
  if (el.nodeName === 'SELECT') {
    el.focus();
    text = el.value;
  } else if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
    let readonly = el.hasAttribute('readonly');
    readonly || el.setAttribute('readonly', '');
    el.select();
    el.setSelectionRange(0, el.value.length);
    readonly || el.removeAttribute('readonly');
    text = el.value;
  } else {
    el.hasAttribute('contenteditable') && el.focus();
    let selection = window.getSelection();
    let range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
    text = selection.toString();
  }

  try {
    // 复制
    document.execCommand('Copy');
  } catch (e) {
    console.log('failed', e);
    return false;
  } finally {
    // 清除选中
    window.getSelection().removeAllRanges();
  }
  // 返回选中的值
  return text;
}

// 代码操作
// 复制代码
export function initCopyCodeAction() {
  window.copyCode = function (target) {
    let preEle = target.parentNode.parentNode.querySelector('pre');
    if (preEle !== 'undefined') {
      let result = copyInnerText(preEle);
      if (!result) {
        Notice.error({
          title: '复制出错',
          desc: '请手动选择复制'
        });
      } else {
        Notice.success({
          title: '复制成功',
          desc: '代码已复制到剪切板'
        });
      }
    }
  };
}

// 显示或隐藏代码行号
export function initToggleCodeNumAction() {
  window.toggleCodeNum = function (target) {
    let wrapDiv = target.parentNode.parentNode;
    if (wrapDiv !== 'undefined') {
      if (wrapDiv.classList.contains('shownum')) {
        wrapDiv.classList.remove('shownum');
      } else {
        wrapDiv.classList.add('shownum');
      }
    }
    let ul = target.parentNode.parentNode.querySelector('ul');
    if (ul !== 'undefined') {
      if (ul.classList.contains('numbered')) {
        ul.classList.remove('numbered');
      } else {
        ul.classList.add('numbered');
      }
    }
  };
}

// 切换代码明暗样式
export function initToggleCodeTheme() {
  window.toggleCodeTheme = function (target) {
    let wrapDiv = target.parentNode.parentNode;
    if (wrapDiv !== 'undefined') {
      if (wrapDiv.classList.contains('dark')) {
        wrapDiv.classList.remove('dark');
      } else {
        wrapDiv.classList.add('dark');
      }
    }
    let highlight = target.parentNode.parentNode.querySelector('.highlight');
    if (highlight !== 'undefined') {
      if (highlight.classList.contains('dark')) {
        highlight.classList.remove('dark');
      } else {
        highlight.classList.add('dark');
      }
    }
  };
}

// 折行代码
export function initToggleBreakCodeAction() {
  window.toggleBreakCode = function (target) {
    let wrapDiv = target.parentNode.parentNode;
    if (wrapDiv !== 'undefined') {
      if (wrapDiv.classList.contains('linefeed')) {
        wrapDiv.classList.remove('linefeed');
      } else {
        wrapDiv.classList.add('linefeed');
      }
    }
    let highlight = target.parentNode.parentNode.querySelector('.highlight');
    if (highlight !== 'undefined') {
      if (highlight.classList.contains('linefeed')) {
        highlight.classList.remove('linefeed');
      } else {
        highlight.classList.add('linefeed');
      }
    }
  };
}

// 关闭或收起代码
export function initToggleFoldCodeAction() {
  window.toggleFoldCode = function (target) {
    let wrapDiv = target.parentNode.parentNode;
    if (wrapDiv !== 'undefined') {
      if (wrapDiv.classList.contains('folded')) {
        wrapDiv.classList.remove('folded');
      } else {
        wrapDiv.classList.add('folded');
      }
    }
  };
}
