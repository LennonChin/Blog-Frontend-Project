import createApp from './create-app';
import {Notice} from 'iview';

const {app, router, store} = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

if (window) {
  window.copyCode = function (target) {
    let preEle = target.parentNode.parentNode.querySelector('pre');
    if (preEle !== 'undefined') {
      let oInput = document.createElement('textarea');
      oInput.innerText = preEle.innerText;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      document.body.removeChild(oInput);
      Notice.success({
        title: '复制成功',
        desc: '代码已复制到剪切板'
      });
    }
  };

  window.breakCode = function (target) {
    let preEle = target.parentNode.parentNode.querySelector('pre');
    if (preEle !== 'undefined') {
      let lis = preEle.querySelectorAll('li');
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.classList.contains('wrapline')) {
          li.classList.remove('wrapline');
        } else {
          li.classList.add('wrapline');
        }
      }
    }
  };

  window.foldCode = function (target) {
    let highlight = target.parentNode.parentNode.querySelector('.highlight');
    if (highlight !== 'undefined') {
      if (highlight.classList.contains('folded')) {
        highlight.classList.remove('folded');
        target.innerHTML = '展开代码';
        target.setAttribute('title', '点击展开代码');
        target.setAttribute('value', '展开代码');
      } else {
        highlight.classList.add('folded');
        target.innerHTML = '收起代码';
        target.setAttribute('title', '点击收起代码');
        target.setAttribute('value', '收起代码');
      }
    }
  };
}

router.onReady(() => {
  app.$mount('#root');
});
