<template>
  <div class="book-info" v-if="bookDoubanInfo !== undefined">
    <panel :title="'图书信息'" :titleAlign="'center'">
      <div slot="content" class="content">
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
          <p class="desc">
            <iv-tag type="border" v-for="tag in bookDoubanInfo.tags" :key="tag.name">{{ tag.name }}</iv-tag>
          </p>
        </div>
        <div class="rating"></div>
      </div>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import Panel from '@/components/utils/Panel';
  import {getDoubanInfo} from '@/api/api';

  export default {
    props: {
      book: {
        Type: Object,
        default: undefined
      }
    },
    data() {
      return {
        bookDoubanInfo: undefined
      };
    },
    created() {
      this.getDoubanInfo(this.book.douban_type, this.book.douban_id);
    },
    methods: {
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
        bookInfo.author_intro = this.formatContent(book.author_intro);
        bookInfo.publisher = book.publisher;
        bookInfo.publish_date = book.pubdate;
        bookInfo.pages = book.pages;
        bookInfo.summary = this.formatContent(book.summary);
        bookInfo.catalog = this.formatContent(book.catalog);
        bookInfo.tags = book.tags;
        bookInfo.rating = book.rating;
        return bookInfo;
      },
      formatContent(content) {
        return content.replace(/\n/g, '<br />');
      }
    },
    components: {
      'panel': Panel
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .book-info
    .content
      padding 15px 20px
      border-left 1px solid $color-border
      border-right 1px solid $color-border
      border-bottom 1px solid $color-border
    .img
      position relative
      margin 0 auto
      width 120px
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
      padding 15px
      .title
        font-size 20px
        line-height 28px
        font-weight 500
        color $color-typegraphy-title
        margin-bottom 5px
        text-align center
      .desc
        font-size 14px
        font-weight 100
        line-height 20px
        color $color-gradually-gray-61
        text-align center
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
</style>
