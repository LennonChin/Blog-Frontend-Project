import zh from 'iview/dist/locale/zh-CN';
import en from 'iview/dist/locale/en-US';

// 文字省略模式
export const LineBreakMode = {
  WrappingTruncatingTail: 1, // 显示头部文字内容，其他直接截断。
  WrappingTruncatingHead: 2, // 显示尾部文字内容，其他直接截断。
  EllipsisTruncatingTail: 3, // 结尾部分的内容以……方式省略，显示头的文字内容。
  EllipsisTruncatingMiddle: 4, // 中间的内容以……方式省略，显示头尾的文字内容。
  EllipsisTruncatingHead: 5 // 前面部分文字以……方式省略，显示尾部文字内容。
};

// 响应式断点
export const ResponsivePoint = {
  Sm: 768,
  Md: 992,
  Lg: 1200
};

// 默认请求数据时的limit size
export const DefaultLimitSize = 10;

// 请求数据时的最大limit size
export const MaxLimitSize = 100;

// section title默认的menus
export const SectionTitleDefaultMenus = [
  {title: 'common.order.desc', selectedTitle: 'common.order.asc', selected: true, method: 'timeSorted'},
  {title: 'common.mostComment', selected: false, method: 'mostComment'},
  {title: 'common.recommend', selected: false, method: 'recommend'}
];

// section tite默认的日期选择options
export const SectionTitleDefaultDatePickerOptions = {
  disabledDate(date) {
    return date && date.valueOf() > Date.now();
  },
  shortcuts: [
    {
      text: '近一周',
      value() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        return [start, end];
      }
    },
    {
      text: '近一个月',
      value() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return [start, end];
      }
    },
    {
      text: '近三个月',
      value() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        return [start, end];
      }
    },
    {
      text: '近一年',
      value() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
        return [start, end];
      }
    }
  ]
};

// 国际化
export const i18nMessage = {
  CN: Object.assign(zh, {
    title: '中文',
    common: {
      viewmore: '查看更多',
      order: {
        desc: '逆序',
        asc: '顺序'
      },
      mostComment: '评论最多',
      hot: '最热',
      recommend: '推荐'
    },
    article: {
      author: '作者',
      publishTime: '发布于',
      read: '阅读',
      comments: '阅读',
      likes: '阅读',
      desc: '摘要',
      authTip: '该文章已加密，您需要输入阅读密码',
      detailAddTip: '以上内容添加于',
      detailUpdateTip: '更新于',
      mostComment: '评论最多',
      hot: '最热',
      recommend: '推荐'
    }
  }),
  EN: Object.assign(en, {
    title: 'CN',
    common: {
      viewmore: 'View More',
      order: {
        desc: 'Desc',
        asc: 'Asc'
      },
      mostComment: 'Most Comment',
      hot: 'Hot',
      recommend: 'Recommend'
    },
    article: {
      author: 'By',
      publishTime: 'At Time',
      read: 'read',
      comments: 'comments',
      likes: 'likes',
      desc: 'Abstract',
      authTip: 'Private Article, need reading password.',
      detailAddTip: 'Above context added at',
      detailUpdateTip: 'updated at',
      mostComment: 'Most Comment',
      hot: 'Hot',
      recommend: 'Recommend'
    }
  })
};
