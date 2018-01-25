<template>
  <div class="book-overview-content layout-content" v-if="book != undefined">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <div class="book-base-info">
            <a>
              <div class="img">
                <div class="container">
                  <div class="bracket"></div>
                  <div class="target">
                    <img :src="book.images.large" alt="">
                  </div>
                </div>
              </div>
              <div class="info">
                <p class="title">{{ book.title }}</p>
                <p class="desc"><span>作者：</span>{{ book.author.join(' ') }}</p>
                <p class="desc"><span>出版社：</span>{{ book.publisher }}</p>
                <p class="desc"><span>出版日期：</span>{{ book.publish_date }}</p>
                <p class="desc"><span>页数：</span>{{ book.pages }}</p>
                <p class="desc"><span>评分：</span>
                  <iv-rate v-model="book.rating.average * 0.5" :allowHalf="true" :disabled="true"></iv-rate>
                </p>
                <iv-tag type="border" v-for="tag in book.tags" :key="tag.name">{{ tag.name }}</iv-tag>
              </div>
              <div class="rating"></div>
            </a>
            <vue-tabs class="infos">
              <v-tab title="目录">
                <book-catalog></book-catalog>
              </v-tab>
              <v-tab title="简介">
                <div class="summary">
                  <p>{{ book.summary }}</p>
                </div>
              </v-tab>
              <v-tab title="作品信息">
                标签三的内容
              </v-tab>
            </vue-tabs>
          </div>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {VueTabs, VTab} from 'vue-nav-tabs';
  import 'vue-nav-tabs/themes/paper.css';
  import BookCatalog from '@/components/views/Book/BookCatalog';
  // import {getDoubanBookInfo} from '@/api/api';

  export default {
    data() {
      return {
        book: undefined,
        tocs: [
          {title: '南极', level: 1},
          {title: '爱在高高的草丛', level: 2},
          {title: '水最深的地方', level: 2},
          {title: '跳舞课', level: 3},
          {title: '暴风雨', level: 1},
          {title: '唱歌的收银员', level: 2},
          {title: '烧伤', level: 1},
          {title: '男孩子的怪名字', level: 2},
          {title: '有胆量的就来吧', level: 2},
          {title: '男人和女人', level: 2},
          {title: '姐妹', level: 3},
          {title: '冬天的气息', level: 1},
          {title: '千万小心', level: 2},
          {title: '燃烧的棕榈', level: 1},
          {title: '护照汤', level: 1}
        ]
      };
    },
    created() {
      this.getBookInfo();
    },
    methods: {
      getBookInfo() {
        let json = JSON.parse('{"rating":{"max":10,"numRaters":19,"average":"9.7","min":0},"subtitle":"","author":["[爱尔兰] 克莱尔·吉根"],"pubdate":"2018-1","tags":[{"count":61,"name":"爱尔兰","title":"爱尔兰"},{"count":55,"name":"小说","title":"小说"},{"count":34,"name":"外国文学","title":"外国文学"},{"count":30,"name":"短篇","title":"短篇"},{"count":16,"name":"我想读这本书","title":"我想读这本书"},{"count":14,"name":"爱尔兰,小说,短篇","title":"爱尔兰,小说,短篇"},{"count":12,"name":"好书，值得一读","title":"好书，值得一读"},{"count":9,"name":"想读","title":"想读"}],"origin_title":"Antarctica","image":"https://img3.doubanio.com\\/mpic\\/s29630033.jpg","binding":"精装","translator":["姚媛"],"catalog":"南极\\n爱在高高的草丛\\n水最深的地方\\n跳舞课\\n暴风雨\\n唱歌的收银员\\n烧伤\\n男孩子的怪名字\\n有胆量的就来吧\\n男人和女人\\n姐妹\\n冬天的气息\\n千万小心\\n燃烧的棕榈\\n护照汤","pages":"184","images":{"small":"https://img3.doubanio.com\\/spic\\/s29630033.jpg","large":"https://img3.doubanio.com\\/lpic\\/s29630033.jpg","medium":"https://img3.doubanio.com\\/mpic\\/s29630033.jpg"},"alt":"https:\\/\\/book.douban.com\\/subject\\/27147922\\/","id":"27147922","publisher":"南海出版公司","isbn10":"7544263169","isbn13":"9787544263160","title":"南极","url":"https:\\/\\/api.douban.com\\/v2\\/book\\/27147922","alt_title":"Antarctica","author_intro":"克莱尔·吉根\\n爱尔兰女作家，爱尔兰文学艺术院院士，生于1968年。\\n在当代世界文坛，只专注于短篇小说创作，并获得国际声誉的作家并不多，克莱尔·吉根就是其中一位。只凭三部短篇小说作品，她已同博尔赫斯和雷蒙德·卡佛齐名。\\n短篇小说集《南极》获爱尔兰隆尼文学奖，2000年被《洛杉矶时报》评为年度小说。2010年出版《寄养》，获戴维·伯恩爱尔兰写作奖。","summary":"《南极》是爱尔兰短篇小说女王克莱尔·吉根经典小说集，被评为《洛杉矶时报》年度小说，获爱尔兰隆尼文学奖。\\n克莱尔·吉根与博尔赫斯、雷蒙德·卡佛齐名，被村上春树盛赞。\\n《南极》的十五个故事以简洁冷峻的笔调，描写普通人之间的情感和日常生活中的冲突，都有希区柯克式的悬念和欧·亨利式的意外结局，触动人们内心隐秘的地方——“你必须面对可能的糟糕局面，才能面对一切。”\\n《少年Pi的奇幻漂流》译者姚媛打造《南极》精致译文，知名设计师设计装帧，带来纯美阅读感受。\\n****************************************\\n这十五个关于等待、复仇、伤害或疗愈的故事，无一例外地触动读者的内心隐秘。\\n一个拥有美满婚姻的女人，决定离开家去体验一场艳遇，尽管她知道结果会令她失望；\\n一个决定离开妻子的男人，去赴一场世纪之约，一切却脱离了他的想象；\\n一个贪玩不愿回家的孩子，多一刻的停留却让他失去了母亲；\\n还有一对相依为命的姐妹，一对策划私奔的男女……\\n在吉根的笔下，无论是夫妻、姐妹、父女，还是情人，彼此都显得既熟悉又陌生。村上春树盛赞道，克莱尔·吉根将朴实无华的词语组合起来，构成一个个或温暖或深刻的意境，令人回味无穷。","price":""}');
        this.book = this.formatBookInfo(json);
        // getDoubanBookInfo({
        //   id: 27147922,
        //   type: 'book'
        // }).then((response) => {
        //   console.log('success');
        //   this.book = this.formatBookInfo(response.data);
        // }).catch(function (error) {
        //   console.log('error');
        //   console.log(error);
        // });
      },
      formatBookInfo(book) {
        let bookInfo = {};
        bookInfo.title = book.title;
        bookInfo.images = book.images;
        bookInfo.author = book.author;
        bookInfo.publisher = book.publisher;
        bookInfo.publish_date = book.pubdate;
        bookInfo.pages = book.pages;
        bookInfo.summary = book.summary;
        bookInfo.tags = book.tags;
        bookInfo.rating = book.rating;
        return bookInfo;
      }
    },
    components: {
      'vue-tabs': VueTabs,
      'v-tab': VTab,
      'book-catalog': BookCatalog
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  .book-overview-content
    .book-base-info
      > a
        display flex
        margin-bottom 20px
        .img
          position relative
          flex 0 0 130px
          width 130px
          overflow hidden
          .container
            width 100%
            position relative
            overflow hidden
            .bracket
              margin-top 140%
            .target
              position absolute
              top 0
              bottom 0
              left 0
              right 0
              > img
                width 100%
                height 100%
                transition: All 0.4s ease-in-out
                transform: scale(1.0)
                zoom: 1.0
        .info
          padding-left 15px
          .title
            font-size 20px
            line-height 28px
            font-weight 500
            color $color-typegraphy-title
            margin-bottom 5px
            text-align justify
          .desc
            font-size 15px
            font-weight 100
            line-height 19px
            color $color-gradually-gray-61
            text-align justify
            margin-bottom 3px
            > span
              color $color-gradually-gray-41
              font-weight 300
        &:hover
          img
            transition: All 0.4s ease-in-out
            transform: scale(1.05)
            zoom: 1.05
          .info
            .desc
              color $color-gradually-gray-11
      .infos
        .summary
          p
            font-size 14px
            font-weight 200
            line-height 23px
        .nav-tabs-navigation
          margin-bottom 20px
        .nav-tabs > li
          margin-bottom 1px

</style>
