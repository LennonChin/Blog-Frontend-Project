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
export const DefaultLimitSize = 1;

// 请求数据时的最大limit size
export const MaxLimitSize = 100;

// section title默认的menus
export const SectionTitleDefaultMenus = [
  {title: '顺序', selectedTitle: '逆序', selected: true, method: 'timeSorted'},
  {title: '评论最多', selected: false, method: 'mostComment'},
  {title: '推荐', selected: false, method: 'recommend'}
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
