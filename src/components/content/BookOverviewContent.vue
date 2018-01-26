<template>
  <div class="book-overview-content layout-content" v-if="bookDoubanInfo != undefined">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <div class="book-base-info">
            <a>
              <div class="img">
                <div class="container">
                  <div class="bracket"></div>
                  <div class="target">
                    <img :src="bookDoubanInfo.images.large" alt="">
                  </div>
                </div>
              </div>
              <div class="info">
                <p class="title">{{ bookDoubanInfo.title }}</p>
                <p class="desc"><span>作者：</span>{{ bookDoubanInfo.author.join(' ') }}</p>
                <p class="desc"><span>出版社：</span>{{ bookDoubanInfo.publisher }}</p>
                <p class="desc"><span>出版日期：</span>{{ bookDoubanInfo.publish_date }}</p>
                <p class="desc"><span>页数：</span>{{ bookDoubanInfo.pages }}</p>
                <p class="desc"><span>评分：</span>
                  <iv-rate v-model="bookDoubanInfo.rating.average * 0.5" :allowHalf="true" :disabled="true"></iv-rate>
                </p>
                <iv-tag type="border" v-for="tag in bookDoubanInfo.tags" :key="tag.name">{{ tag.name }}</iv-tag>
              </div>
              <div class="rating"></div>
            </a>
            <vue-tabs class="infos">
              <v-tab title="目录">
                <book-catalog :book="book"></book-catalog>
              </v-tab>
              <v-tab title="整书读后感">
                <p class="summary" v-html="book.detail.formatted_content"></p>
              </v-tab>
              <v-tab title="简介">
                <p class="author" v-html="formatContent(bookDoubanInfo.author_intro)"></p>
                <p class="summary" v-html="formatContent(bookDoubanInfo.summary)"></p>
              </v-tab>
            </vue-tabs>
          </div>
          <social-section :article="book"></social-section>
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
  import {getBookDetailInfo, getDoubanInfo} from '@/api/api';

  export default {
    data() {
      return {
        bookId: undefined,
        book: undefined,
        bookDoubanInfo: undefined
      };
    },
    created() {
      this.bookId = this.$route.params.bookId;
      this.getBookDetailInfo();
    },
    methods: {
      getBookDetailInfo() {
        getBookDetailInfo({
          params: {
            browse_auth: this.browse_auth
          },
          id: this.bookId
        }).then((response) => {
          this.book = response.data;
          this.getDoubanInfo(this.book.douban_type, this.book.douban_id);
        }).catch(function (error) {
          console.log(error);
        });
      },
      getDoubanInfo(doubanType, doubanId) {
        getDoubanInfo({
          id: doubanId,
          type: doubanType
        }).then((response) => {
          this.bookDoubanInfo = this.formatBookInfo(response.data);
        }).catch(function (error) {
          console.log(error);
        });
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
