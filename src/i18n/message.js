// 国际化
import zh from 'iview/dist/locale/zh-CN';
import en from 'iview/dist/locale/en-US';

export default {
  CN: Object.assign(zh, {
    title: '中文',
    common: {
      viewmore: '查看更多',
      recommendTitle: '推荐阅读',
      hotTitle: '最热阅读',
      tagsWallTitle: '标签墙',
      classifyMenu: {
        firstLevel: '一级',
        secondLevel: '二级',
        thirdLevel: '三级',
        all: '全部'
      },
      inputPlaceholder: {
        search: '你想搜什么？',
        selectDataRange: '选择日期区间'
      },
      socialTime: {
        recentWeek: '近一周'
      },
      detailAddTip: '以上内容添加于',
      detailUpdateTip: '更新于',
      browseMore: {
        clickToSeeMore: '点击查看更多',
        seemore: '查看更多',
        nomore: '暂无更多'
      }
    },
    sectionTitle: {
      filter: {
        order: {
          desc: '逆序',
          asc: '顺序'
        },
        mostComment: '评论最多',
        recommend: '推荐',
        hot: '最热',
        refresh: '刷新'
      }
    },
    article: {
      typeName: '文章',
      author: '作者',
      publishTime: '发布于',
      read: '阅读',
      comments: '评论',
      likes: '赞',
      desc: '简介',
      authTip: '该文章已加密，您需要输入访问密码',
      filter: {
        mostComment: '评论最多',
        hot: '最热',
        recommend: '推荐'
      }
    },
    book: {
      typeName: '图书',
      read: '阅读',
      comments: '评论',
      likes: '赞',
      authTip: '该图书文章已加密，您需要输入访问密码',
      filter: {
        mostComment: '评论最多',
        hot: '最热',
        recommend: '推荐'
      },
      author: '作者',
      publisher: '出版社',
      publishDate: '出版日期',
      pages: '页数',
      rating: '评分',
      desc: '简介',
      readDone: '已读',
      reading: '正在阅读',
      noRead: '未读',
      noteDone: '笔记已完成',
      bookInfo: '图书信息',
      readCatelog: '读书目录',
      catelog: '原书目录',
      readThink: '读后感'
    },
    bookNote: {
      typeName: '读书笔记',
      read: '阅读',
      comments: '评论',
      likes: '赞',
      authTip: '该笔记文章已加密，您需要输入访问密码',
      filter: {
        mostComment: '评论最多',
        hot: '最热',
        recommend: '推荐'
      },
      showBookInfo: '查看书籍 《{0}》 信息',
      HideBookInfo: '隐藏书籍 《{0}》 信息'
    },
    movie: {
      typeName: '电影',
      author: '作者',
      publishTime: '发布于',
      read: '阅读',
      comments: '评论',
      likes: '赞',
      desc: '简介',
      authTip: '该电影文章已加密，您需要输入访问密码',
      history: '历史观影',
      recent: '最近观影',
      recommend: '推荐观影',
      director: '导演',
      actors: '主演',
      type: '类型',
      region: '制片国家/地区',
      language: '语言',
      length: '片长',
      filter: {
        mostComment: '评论最多',
        hot: '最热',
        recommend: '推荐'
      }
    },
    album: {
      typeName: '图集',
      read: '阅读',
      comments: '评论',
      likes: '赞',
      authTip: '该图集已加密，您需要输入访问密码'
    },
    comments: {
      placeholder: '请输入内容...',
      blogger: '博主',
      reply: '回复',
      nickname: '昵称',
      email: '邮箱',
      nicknameTip: '请输入您的昵称',
      emailTip: '及邮箱以评论',
      commentClosed: '该文章关闭了评论功能',
      supportMarkdown: '支持Markdown',
      publish: '发布',
      publishing: '发布中'
    },
    timeline: {
      typeName: '存档时光',
      year: '{0}年',
      month: '{0}月',
      count: '共 {0} 篇',
      showDescTip: '查看简介',
      hideDescTip: '隐藏简介'
    },
    others: {
      bookTitle: '图书',
      bookNoteTitle: '笔记',
      list: '列表',
      category: '分类',
      author: '作者',
      time: '时间',
      master: '技能值',
      friendLinks: '友情链接',
      toc: '目录',
      siteNav: '网站导航',
      open: '开',
      close: '关',
      sticky: '置顶',
      stickyTip: '置顶文章',
      expandLeft: '通栏阅读',
      shrinkLeft: '退出通栏'
    }
  }),
  EN: Object.assign(en, {
    title: 'EN',
    common: {
      viewmore: 'View More',
      recommendTitle: 'Recommend Read',
      hotTitle: 'Hot Read',
      tagsWallTitle: 'Tags Wall',
      classifyMenu: {
        firstLevel: '1st',
        secondLevel: '2nd',
        thirdLevel: '3rd',
        all: 'All'
      },
      inputPlaceholder: {
        search: 'What do you want to search?',
        selectDataRange: 'Select Data Range'
      },
      socialTime: {
        recentWeek: 'Recent Week'
      },
      detailAddTip: 'Above context added at',
      detailUpdateTip: 'updated at',
      browseMore: {
        clickToSeeMore: 'Click to view more',
        seemore: 'More',
        nomore: 'No More'
      }
    },
    sectionTitle: {
      filter: {
        order: {
          desc: 'Desc',
          asc: 'Asc'
        },
        mostComment: 'Most Comment',
        hot: 'Hot',
        recommend: 'Recommend',
        refresh: 'Refresh'
      }
    },
    article: {
      typeName: 'Article',
      author: 'By',
      publishTime: 'At Time',
      read: 'read',
      comments: 'comments',
      likes: 'likes',
      desc: 'Abstract',
      authTip: 'Private Article, need reading password.',
      filter: {
        mostComment: 'Most Comment',
        hot: 'Hot',
        recommend: 'Recommend'
      }
    },
    book: {
      typeName: 'Book',
      read: 'Read',
      comments: 'Comments',
      likes: 'Likes',
      authTip: 'Private Book, need reading password.',
      filter: {
        mostComment: 'Most Comment',
        hot: 'Hot',
        recommend: 'Recommend'
      },
      author: 'Author',
      publisher: 'Publisher',
      publishDate: 'Publish Date',
      pages: 'Pages',
      rating: 'Ratings',
      desc: 'Desc',
      readDone: 'Read Done',
      reading: 'Reading Now',
      noRead: 'Unread',
      noteDone: 'Note Done',
      bookInfo: 'Book Info',
      readCatelog: 'Read Catelog',
      catelog: 'Catelog',
      readThink: 'Read Think'
    },
    bookNote: {
      typeName: 'Book Note',
      read: 'Read',
      comments: 'Comments',
      likes: 'Likes',
      authTip: 'Private Note, need reading password.',
      filter: {
        mostComment: 'Most Comment',
        hot: 'Hot',
        recommend: 'Recommend'
      },
      showBookInfo: 'Show Book《{0}》Info',
      HideBookInfo: 'Hide Book《{0}》Info'
    },
    movie: {
      typeName: 'Movie',
      author: 'By',
      publishTime: 'At Time',
      read: 'read',
      comments: 'comments',
      likes: 'likes',
      desc: 'Abstract',
      authTip: 'Private Movie, need reading password.',
      history: 'History',
      recent: 'Recent',
      recommend: 'Recommend',
      director: 'Director',
      actors: 'Actors',
      type: 'Type',
      region: 'Region',
      language: 'Language',
      length: 'Length',
      filter: {
        mostComment: 'Most Comment',
        hot: 'Hot',
        recommend: 'Recommend'
      }
    },
    album: {
      typeName: 'Album',
      read: 'Read',
      comments: 'Comments',
      likes: 'Likes',
      authTip: 'Private Album, need reading password.'
    },
    comments: {
      placeholder: 'Please input you words...',
      blogger: 'Blogger',
      reply: 'Reply',
      nickname: 'Name',
      email: 'Email',
      nicknameTip: 'Please input nickname',
      emailTip: 'and email to comment',
      commentClosed: 'This post cannot be commented',
      supportMarkdown: 'Support Markdown',
      publish: 'Publish',
      publishing: 'Publishing'
    },
    timeline: {
      typeName: 'Archive Time',
      year: '{0}',
      month: 'On Month {0}',
      count: 'All {0} pieces',
      showDescTip: 'Show Desc',
      hideDescTip: 'Hide Desc'
    },
    others: {
      bookTitle: 'Book',
      bookNoteTitle: 'Book Note',
      list: ' List',
      category: ' Category',
      author: 'Author',
      time: 'Time',
      master: 'Master',
      friendLinks: 'Friend Links',
      toc: ' Content',
      siteNav: 'Site Map',
      open: 'On',
      close: 'Off',
      sticky: 'Sticky',
      stickyTip: 'Sticky Post',
      expandLeft: 'Expand Left',
      shrinkLeft: 'Shrink Left'
    }
  })
};
