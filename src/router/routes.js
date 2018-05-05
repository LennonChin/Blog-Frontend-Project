const Index = () => System.import(/* webpackChunkName: "Index" */ '@/components/index/Index');
// 公共区域
const SimpleHeader = () => System.import(/* webpackChunkName: "SimpleHeader" */ '@/components/header/SimpleHeader/SimpleHeader');
const CommonFooter = () => System.import(/* webpackChunkName: "CommonFooter" */ '@/components/footer/CommonFooter');

// 首页
const HomeContent = () => System.import(/* webpackChunkName: "HomeContent" */ '@/components/content/HomeContent');
const ArticleContent = () => System.import(/* webpackChunkName: "ArticleContent" */ '@/components/content/ArticleContent');
const ArticleHomeContent = () => System.import(/* webpackChunkName: "ArticleHomeContent" */ '@/components/content/ArticleHomeContent');
const ArticleListContent = () => System.import(/* webpackChunkName: "ArticleListContent" */ '@/components/content/ArticleListContent');
const AlbumHomeContent = () => System.import(/* webpackChunkName: "AlbumHomeContent" */ '@/components/content/AlbumHomeContent');
const AlbumListContent = () => System.import(/* webpackChunkName: "AlbumListContent" */ '@/components/content/AlbumListContent');
const MovieContent = () => System.import(/* webpackChunkName: "MovieContent" */ '@/components/content/MovieContent');
const MovieHomeContent = () => System.import(/* webpackChunkName: "MovieHomeContent" */ '@/components/content/MovieHomeContent');
const MovieListContent = () => System.import(/* webpackChunkName: "MovieListContent" */ '@/components/content/MovieListContent');
const AlbumPreviewContent = () => System.import(/* webpackChunkName: "AlbumPreviewContent" */ '@/components/content/AlbumPreviewContent');
const TimeLineContent = () => System.import(/* webpackChunkName: "TimeLineContent" */ '@/components/content/TimeLineContent');
const ReadHomeContent = () => System.import(/* webpackChunkName: "ReadHomeContent" */ '@/components/content/ReadHomeContent');
const ReadListContent = () => System.import(/* webpackChunkName: "ReadListContent" */ '@/components/content/ReadListContent');
const BookContent = () => System.import(/* webpackChunkName: "BookContent" */ '@/components/content/BookContent');
const BookListContent = () => System.import(/* webpackChunkName: "BookListContent" */ '@/components/content/BookListContent');
const BookNoteContent = () => System.import(/* webpackChunkName: "BookNoteContent" */ '@/components/content/BookNoteContent');
const BookNoteListContent = () => System.import(/* webpackChunkName: "BookNoteListContent" */ '@/components/content/BookNoteListContent');

export default [
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
];
