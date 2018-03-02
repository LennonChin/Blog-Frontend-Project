import Vue from 'vue';
import Router from 'vue-router';
import {LoadingBar, Modal, Notice} from 'iview';
import {hexMd5} from '@/common/js/md5';
import {saveToLocal, loadFromLocal} from '@/common/js/utils';

const Index = () => System.import('@/components/index/Index');
// 公共区域
const SimpleHeader = () => System.import('@/components/header/SimpleHeader/SimpleHeader');
const CommonFooter = () => System.import('@/components/footer/CommonFooter');

// 首页
const HomeContent = () => System.import('@/components/content/HomeContent');
const ArticleContent = () => System.import('@/components/content/ArticleContent');
const ArticleHomeContent = () => System.import('@/components/content/ArticleHomeContent');
const ArticleListContent = () => System.import('@/components/content/ArticleListContent');
const AlbumHomeContent = () => System.import('@/components/content/AlbumHomeContent');
const AlbumListContent = () => System.import('@/components/content/AlbumListContent');
const MovieContent = () => System.import('@/components/content/MovieContent');
const MovieHomeContent = () => System.import('@/components/content/MovieHomeContent');
const MovieListContent = () => System.import('@/components/content/MovieListContent');
const AlbumPreviewContent = () => System.import('@/components/content/AlbumPreviewContent');
const TimeLineContent = () => System.import('@/components/content/TimeLineContent');
const ReadHomeContent = () => System.import('@/components/content/ReadHomeContent');
const ReadListContent = () => System.import('@/components/content/ReadListContent');
const BookContent = () => System.import('@/components/content/BookContent');
const BookListContent = () => System.import('@/components/content/BookListContent');
const BookNoteContent = () => System.import('@/components/content/BookNoteContent');
const BookNoteListContent = () => System.import('@/components/content/BookNoteListContent');

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          name: 'index',
          components: {
            header: SimpleHeader,
            content: HomeContent,
            footer: CommonFooter
          },
          meta: {
            title: '首页'
          }
        },
        {
          path: 'articles',
          name: 'articles',
          components: {
            header: SimpleHeader,
            content: ArticleHomeContent,
            footer: CommonFooter
          },
          meta: {
            title: '文章'
          }
        },
        {
          path: 'article/:id',
          name: 'article',
          components: {
            header: SimpleHeader,
            content: ArticleContent,
            footer: CommonFooter
          },
          meta: {
            title: '文章详情',
            need_log: false
          }
        },
        {
          path: 'albums',
          name: 'albums',
          components: {
            header: SimpleHeader,
            content: AlbumHomeContent,
            footer: CommonFooter
          },
          meta: {
            title: '图集',
            need_log: false
          }
        },
        {
          path: 'album/:id',
          name: 'album',
          components: {
            content: AlbumPreviewContent
          },
          meta: {
            title: '图集详情',
            need_log: false
          }
        },
        {
          path: 'movies',
          name: 'movies',
          components: {
            header: SimpleHeader,
            content: MovieHomeContent,
            footer: CommonFooter
          },
          meta: {
            title: '电影',
            need_log: false
          }
        },
        {
          path: 'movie/:id',
          name: 'movie',
          components: {
            header: SimpleHeader,
            content: MovieContent,
            footer: CommonFooter
          },
          meta: {
            title: '电影详情',
            need_log: false
          }
        },
        {
          path: 'readings',
          name: 'readings',
          components: {
            header: SimpleHeader,
            content: ReadHomeContent,
            footer: CommonFooter
          },
          meta: {
            title: '读书',
            need_log: false
          }
        },
        {
          path: 'book/:id',
          name: 'book',
          components: {
            header: SimpleHeader,
            content: BookContent,
            footer: CommonFooter
          },
          meta: {
            title: '书籍概览',
            need_log: false
          }
        },
        {
          path: 'book/note/:id',
          name: 'book/note',
          components: {
            header: SimpleHeader,
            content: BookNoteContent,
            footer: CommonFooter
          },
          meta: {
            title: '笔记详情',
            need_log: false
          }
        },
        {
          path: 'timeline',
          name: 'timeline',
          components: {
            header: SimpleHeader,
            content: TimeLineContent,
            footer: CommonFooter
          },
          meta: {
            title: '时光轴',
            need_log: false
          }
        },
        {
          path: 'articles/category/:id',
          name: 'articles/category',
          components: {
            header: SimpleHeader,
            content: ArticleListContent,
            footer: CommonFooter
          },
          meta: {
            title: '文章列表',
            need_log: false
          }
        },
        {
          path: 'albums/category/:id',
          name: 'albums/category',
          components: {
            header: SimpleHeader,
            content: AlbumListContent,
            footer: CommonFooter
          },
          meta: {
            title: '图集列表',
            need_log: false
          }
        },
        {
          path: 'movies/category/:id',
          name: 'movies/category',
          components: {
            header: SimpleHeader,
            content: MovieListContent,
            footer: CommonFooter
          },
          meta: {
            title: '电影列表',
            need_log: false
          }
        },
        {
          path: 'readings/category/:id',
          name: 'readings/category',
          components: {
            header: SimpleHeader,
            content: ReadListContent,
            footer: CommonFooter
          },
          meta: {
            title: '电影列表',
            need_log: false
          }
        },
        {
          path: 'books/category/:id',
          name: 'books/category',
          components: {
            header: SimpleHeader,
            content: BookListContent,
            footer: CommonFooter
          },
          meta: {
            title: '电影列表',
            need_log: false
          }
        },
        {
          path: 'book/notes/category/:id',
          name: 'book/notes/category',
          components: {
            header: SimpleHeader,
            content: BookNoteListContent,
            footer: CommonFooter
          },
          meta: {
            title: '电影列表',
            need_log: false
          }
        }
      ]
    }
  ]
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
      let encryptedBrowseAuth = hexMd5(browseAuth);
      if (encryptedBrowseAuth === password) {
        // 将认证信息保存到本地，避免多次请求
        let siteGuardInfo = {
          'expire_time': Date.parse(new Date()),
          'site_access_encrypt': encryptedBrowseAuth
        };
        saveToLocal('site', 'site_guard_info', siteGuardInfo);
        successCallBack();
      } else {
        Notice.error({
          title: '密码错误',
          desc: '验证失败',
          onClose: () => {
            accessGuard(password, successCallBack);
          }
        });
      }
    }
  });
};

// 配置加载进度条
LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 2
});

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  document.title = '加载中...';
  let defaultEncrypt = to.query.access_auth;
  accessGuard(next, window.__access_auth__, defaultEncrypt);
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

router.afterEach((to, from, next) => {
  // 停止进度条
  LoadingBar.finish();
  // 修改网页标题
  document.title = to.matched[to.matched.length - 1].meta.title + ' - ' + titleIdiom[Math.floor(Math.random() * titleIdiom.length)];
  window.scrollTo(0, 0);
});

export default router;
