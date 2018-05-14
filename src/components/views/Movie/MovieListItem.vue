<template>
  <div class="movie-list-item" v-if="movie != undefined" @click="gotoPostDetail(movie)">
    <img :src="movie.front_image" alt="">
    <div class="movie-info">
      <p class="title">
        <i-tool-tip placement="right" content="该文章已加密，您需要输入阅读密码" v-if="movie.browse_password_encrypt">
          <i-icon type="android-lock" color="#FA5555" v-if="movie.browse_password_encrypt"></i-icon>
        </i-tool-tip>
        {{ movie.title }}
      </p>
      <p class="desc">
        {{ movie.desc | textLineBreak(50) }}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {checkPostAuth, mixin} from '@/common/js/utils';

  export default {
    name: 'movie-list-item',
    props: {
      movie: {
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

  .movie-list-item
    position relative
    display block
    padding-bottom 135%
    width: 100%
    height 0
    overflow hidden
    border 1px solid $default-border-color
    img
      width 100%
      transition All 0.4s ease-in-out
      transform scale(1.0)
      zoom 1.0
    .movie-info
      position absolute
      bottom 0
      left 0
      width 100%
      height 28%
      padding 10px
      background rgba($color-secondary-warning, 0.9)
      transition All 0.4s ease-in-out
      opacity 1.0
      .title
        font-size 20px
        line-height 24px
        color $default-title-color
        margin-bottom 7px
      .desc
        font-size 14px
        line-height 18px
        color $default-desc-color
    &:hover
      img
        transition All 0.4s ease-in-out
        transform scale(1.05)
        zoom 1.05
      .movie-info
        height 30%
        background rgba($default-background-hover-color, 1.0)
</style>
