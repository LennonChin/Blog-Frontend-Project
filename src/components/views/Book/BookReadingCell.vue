<template>
  <div class="book-reading-cell">
    <h4>正在阅读</h4>
    <a @click="gotoPostDetail(book)">
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
          <a @click="gotoPostDetail(book)"> {{book.book_name}}</a>
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
  import {checkPostAuth} from '@/common/js/utils';

  export default {
    name: 'book-reading-cell',
    props: {
      book: {
        Type: Object,
        default: undefined
      }
    },
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
    border 1px solid $color-border
    padding 20px 20px
    h4
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
        border 1px solid $color-border-hover
        box-shadow 1px 1px 1px $color-border
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
        .title
          font-size 20px
          line-height 28px
          font-weight 500
          margin-bottom 5px
          text-align justify
          a
            color $color-typegraphy-title
            &:hover
              color $color-main-primary
        .desc
          font-size 13px
          font-weight 100
          line-height 20px
          color $color-gradually-gray-61
          text-align justify
          margin 10px 0 5px
          > span
            color $color-gradually-gray-41
            font-weight 300
</style>
