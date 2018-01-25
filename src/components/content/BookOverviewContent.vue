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
              <v-tab title="整书读后感">
                <p class="summary">整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感整书读后感</p>
              </v-tab>
              <v-tab title="简介">
                <p class="author" v-html="formatContent(book.author_intro)"></p>
                <p class="summary" v-html="formatContent(book.summary)"></p>
              </v-tab>
            </vue-tabs>
          </div>
          <social-section :article="article"></social-section>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend></recommend>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {VueTabs, VTab} from 'vue-nav-tabs';
  import 'vue-nav-tabs/themes/paper.css';
  import BookCatalog from '@/components/views/Book/BookCatalog';
  import Recommend from '@/components/views/Recommend';
  import SocialSection from '@/components/views/Comment/SocialSection';
  //   import {getDoubanBookInfo} from '@/api/api';

  export default {
    data() {
      return {
        book: undefined,
        article: undefined
      };
    },
    created() {
      this.getBookInfo();
    },
    methods: {
      getBookInfo() {
        let book = JSON.parse('{"rating":{"max":10,"numRaters":25,"average":"9.2","min":0},"subtitle":"","author":["[美] 托尼·朱特"],"pubdate":"2018-1-1","tags":[{"count":66,"name":"托尼·朱特","title":"托尼·朱特"},{"count":37,"name":"社会学","title":"社会学"},{"count":15,"name":"随笔","title":"随笔"},{"count":14,"name":"欧洲史","title":"欧洲史"},{"count":14,"name":"政治学","title":"政治学"},{"count":13,"name":"国际政治","title":"国际政治"},{"count":10,"name":"英国","title":"英国"},{"count":9,"name":"世界史","title":"世界史"}],"origin_title":"When the Facts Change","image":"https://img3.doubanio.com\\/mpic\\/s29630035.jpg","binding":"精装","translator":["陶小路"],"catalog":"序言 真诚之心 丨 珍妮弗·霍曼斯\\n第一部分 1989：我们的时代\\n第1 章 每况愈下\\n第2 章 欧洲幻梦\\n第3 章 罪行与过失\\n第4 章 “冷战”为何奏效\\n第5 章 自由与弗里多尼亚国\\n第二部分 大屠杀和犹太人\\n第6 章 此路不通\\n第7 章 另求他途\\n第8 章 游说团体非阴谋\\n第9 章 在战后欧洲谈“邪恶问题”\\n第10 章 “既成”虚构\\n第11 章 以色列须放弃民族神话\\n第12 章 没有陈词滥调的以色列\\n第13 章 还要做什么？\\n第三部分 “9·11”事件和世界新秩序\\n第14 章 论《鼠疫》\\n第15 章 美国最大的敌人是自己\\n第16 章 我们生活的方式\\n第17 章 海外的反美国主义\\n第18 章 世界新秩序 260\\n第19 章 联合国已穷途末路了吗？\\n第20 章 我们学到了什么？\\n第四部分 我们如今的生活方式\\n第21 章 铁路的荣光\\n第22 章 让火车回归！\\n第23 章 创新的破坏\\n第24 章 社会民主主义的生与死\\n第25 章 世代的平衡—与丹尼尔·朱特的对话\\n第五部分 我们终有一死\\n第26 章 弗朗索瓦·孚雷（1927—1997）\\n第27 章 阿莫斯·埃隆（1926—2009）\\n第28 章 莱谢克·科拉科夫斯基（1927—2009）\\n注释\\n历年发表的托尼·朱特文章与评论列表\\n索引","pages":"480","images":{"small":"https://img3.doubanio.com\\/spic\\/s29630035.jpg","large":"https://img3.doubanio.com\\/lpic\\/s29630035.jpg","medium":"https://img3.doubanio.com\\/mpic\\/s29630035.jpg"},"alt":"https:\\/\\/book.douban.com\\/subject\\/27008294\\/","id":"27008294","publisher":"中信出版集团股份有限公司","isbn10":"7508673786","isbn13":"9787508673783","title":"事实改变之后","url":"https:\\/\\/api.douban.com\\/v2\\/book\\/27008294","alt_title":"When the Facts Change","author_intro":"【作者简介】\\n托尼·朱特（Tony Judt）\\n著名历史学家，以其对欧洲问题和欧洲思想的深入研究而闻名于世。1948年出生于英国伦敦，毕业于剑桥大学国王学院和巴黎高等师范学校，先后执教于剑桥大学、牛津大学、加州大学伯克利分校和纽约大学。\\n1995年，他创办雷马克研究所，专事欧洲问题研究；1996年，当选美国文理科学院院士；2007年，当选英国社会科学院院士，并获汉娜·阿伦特奖；2008年，入选美国《外交政策》评选的“全球百大思想家”；2009年，以其卓越的“智慧、洞察力和非凡的勇气”获得奥威尔终身成就奖。\\n托尼·朱特长期为《新共和》《纽约时报》《纽约书评》等欧美主流媒体撰稿，并以尖锐的自由主义批评立场成为备受尊重的知识分子，拥有“知识分子中的知识分子”之美誉。其主要著作有《战后欧洲史》《沉疴遍地》《重估价值》《责任的重负》《未竟的往昔》《记忆小屋》《重估价值》《思虑20世纪》等。其中，《战后欧洲史》被誉为“短时间内无法超越的伟大著作”。\\n···\\n【译者简介】\\n陶小路，安徽合肥人士，出生于1985年；译者，《东方历史评论》编辑；关注领域：政治哲学、20世纪东欧以及苏联历史。","summary":"◆“全球百大思想家”、奥威尔终身成就奖得主托尼·朱特最后一本文集，由其遗孀珍妮弗·霍曼斯整理出版；\\n◆收录了朱特对他持续关注的话题的最终看法。事实改变之后，朱特不畏惧修正自己，亦不畏惧站在潮流的反面；\\n◆一本关于我们时代痛点的书，深入讨论了中东危机、伊拉克战争、“9·1 1”事件、世界新秩序等问题；\\n◆交付“真诚之心”的公共知识分子写作，关注公正、历史、国家、公共领域、记忆与遗忘的深层意义。\\n···\\n【内容简介】\\n本书是由托尼·朱特的遗孀珍妮弗·霍曼斯整理并作序出版的朱特的最后一本文集，收录了朱特作为一位公共知识分子所写作的诸多重要文章。这些文章记录了他思想的改变轨迹，也代表了他对公共生活持续的、充满热情的介入。无论是谈论巴以冲突中人类所面临的道德困境，还是“二战”中对自己国家犹太人的遭遇选择性失明的法国人，抑或他所崇敬的加缪和奥威尔，朱特都带着一种公正的视角、清晰的道德判断和绝佳的智识标准。他提醒我们这个时代潜藏的危机，让我们在走进21世纪时不忘回顾20世纪的历史，亦使我们更加接近当下世界的真相。\\n···\\n【媒体及名人推荐】\\n在这些文章中，你会看到托尼既是一个头脑清晰，相信事实、事件、数据的现实主义者，也是一个追求过上一种良善生活，不只为自己也为社会而生活的理想主义者。\\n——珍妮弗·霍曼斯（历史学家、本书编者）\\n·\\n在一个越来越反智的时代，托尼·朱特的文章提醒我们，当紧紧持守高贵的道德和智力标准的时候，我们将得到什么，而让它们溜走的时候，我们将失去什么。\\n——马克·马佐尔（《谁将主宰世界》作者）\\n·\\n托尼·朱特常被视为爱德华·萨义德之后美国最优秀的公共知识分子之一……朱特一生中学术方向不止一次发生变化，但对专制暴力之恶的憎恨、对人权道德价值的肯定却是一以贯之。今天，在史学的成就之外，人们记得他，是因为他曾经致力于用公共写作来防止民主因自身的堕落而被毁掉。\\n——徐贲\\n·\\n朱特这样写加缪：“加缪是一个道德主义者，他在对善恶的区分上毫不犹豫，但他不去谴责人性的弱点。”这句话作为朱特自己的墓志铭也很恰当，他的充满智慧、人道主义和勇气的学识被很好地记录在了这本书中。\\n——《纽约书评》乔纳森·弗里兰德（Jonathan Freedland）\\n·\\n托尼·朱特对我们永远是一种鼓舞：一个智识上的巨人，一个勇猛的战士，一个才华横溢的发声者，一个充满魅力的公共知识分子。……但他从来无意主动获取以上的任何一种褒奖。他只想讲述他认为必须被讲述的，一直到人们注意到他所讲述的问题。\\n——《观察家》","series":{"id":"19264","title":"托尼·朱特作品"},"price":"68"}');
        this.book = this.formatBookInfo(book);

        let article = JSON.parse('{"id":66}');
        this.article = this.formatBookInfo(article);
//         getDoubanBookInfo({
//           id: 27008294,
//           type: 'book'
//         }).then((response) => {
//           console.log('success');
//           this.book = this.formatBookInfo(response.data);
//         }).catch(function (error) {
//           console.log('error');
//           console.log(error);
//         });
      },
      formatBookInfo(book) {
        let bookInfo = {};
        bookInfo.title = book.title;
        bookInfo.images = book.images;
        bookInfo.author = book.author;
        bookInfo.author_intro = book.author_intro;
        bookInfo.publisher = book.publisher;
        bookInfo.publish_date = book.pubdate;
        bookInfo.pages = book.pages;
        bookInfo.summary = book.summary;
        bookInfo.tags = book.tags;
        bookInfo.rating = book.rating;
        return bookInfo;
      },
      formatContent(content) {
        return content.replace(/\n/g, '<br />');
      }
    },
    components: {
      'vue-tabs': VueTabs,
      'v-tab': VTab,
      'book-catalog': BookCatalog,
      'social-section': SocialSection,
      'recommend': Recommend
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";
  @import "../../common/stylus/article.styl";

  .book-overview-content
    .book-base-info
      > a
        display flex
        margin-bottom 20px
        .img
          position relative
          flex 0 0 140px
          width 140px
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
            font-size 14px
            font-weight 100
            line-height 20px
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
        p.summary, p.author
          font-size 14px
          font-weight 200
          line-height 23px
          text-align justify
        .nav-tabs-navigation
          margin-bottom 20px
        .nav-tabs > li
          margin-bottom 1px

</style>
