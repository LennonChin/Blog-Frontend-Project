<template>
  <div class="book-reading-cell">
    <h4>正在阅读</h4>
    <a @click.prevent="gotoPostDetail(book)" :href="`${book.post_type}/${book.id}`">
      <div class="img">
        <div class="container">
          <div class="bracket"></div>
          <div class="target">
            <img :src="book.book_image" alt="">
          </div>
        </div>
      </div>
      <div class="book-info">
        <p class="title">
          <i-tool-tip placement="right" content="该文章已加密，您需要输入阅读密码" v-if="book.browse_password_encrypt">
            <i-icon type="android-lock" color="#FA5555" v-if="book.browse_password_encrypt"></i-icon>
          </i-tool-tip>
          <a @click.prevent="gotoPostDetail(book)" :href="`${book.post_type}/${book.id}`"> {{book.book_name}}</a>
        </p>
        <p class="desc"><span>作者：</span>{{ book.book_author }}</p>
        <i-progress :percent="book.read_precentage" :stroke-width="6">
          <i-icon type="checkmark-circled"></i-icon>
          <span>{{ book.read_precentage }}%</span>
        </i-progress>
        <p class="desc">{{ book.desc | textLineBreak(140) }}</p>
        <i-tag type="border" v-for="tag in book.tags" :key="tag.id">{{ tag.name }}</i-tag>
      </div>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  import {checkPostAuth, mixin} from '@/common/js/utils';

  export default {
    name: 'book-reading-cell',
    props: {
      book: {
        Type: Object,
        default: undefined
      }
    },
    mixins: [mixin],
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该文章已加密，您需要输入阅读密码', () => {
          this.$router.push({name: post.post_type, params: {id: post.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: post.post_type,
            params: {id: post.id},
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, () => {
          this.$Notice.error({
            title: '密码错误'
          });
        });
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .book-reading-cell
    border 1px solid $default-border-color
    padding 20px
    background-color $default-background-color
    @media only screen and (max-width: $responsive-sm)
      padding 10px 10px 15px
    @media screen and (min-width: $responsive-sm)
      padding 14px
    @media screen and (min-width: $responsive-md)
      padding 16px
    @media screen and (min-width: $responsive-lg)
      padding 20px
    h4
      color $default-title-color
      @media only screen and (max-width: $responsive-sm)
        font-size 22px
        line-height 24px
        margin-bottom 10px
      @media screen and (min-width: $responsive-sm)
        font-size 23px
        line-height 30px
        margin-bottom 15px
      @media screen and (min-width: $responsive-md)
        font-size 23px
        line-height 30px
        margin-bottom 18px
      @media screen and (min-width: $responsive-lg)
        font-size 23px
        line-height 30px
        margin-bottom 20px
    > a
      display flex
      .img
        position relative
        flex 0 0 140px
        width 140px
        overflow hidden
        margin 0 30px 10px 0
        border 1px solid $default-border-hover-color
        box-shadow 1px 1px 1px $default-border-color
        @media only screen and (max-width: $responsive-sm)
          display none
        @media screen and (min-width: $responsive-sm)
          display none
        @media screen and (min-width: $responsive-lg)
          display block
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
      .book-info
        flex-grow 1
        margin-bottom 8px
        .title
          font-size 20px
          line-height 28px
          font-weight 500
          margin-bottom 5px
          text-align justify
          a
            color $default-title-color
            &:hover
              color $default-title-hover-color
        .desc
          font-size 13px
          font-weight 100
          line-height 20px
          color $default-desc-color
          text-align justify
          margin 10px 0 5px
          > span
            color $default-info-color
            font-weight 300
</style>
