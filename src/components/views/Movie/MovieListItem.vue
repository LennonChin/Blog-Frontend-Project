<template>
  <div class="movie-list-item" v-if="movie != undefined">
    <a @click="gotoPostDetail(movie)">
      <img :src="movie.front_image" alt="">
      <div class="movie-info">
        <p class="title">
          <iv-tool-tip placement="top" content="该文章为加密文章" v-if="movie.browse_password_encrypt">
            <iv-icon type="android-lock" color="#FA5555" v-if="movie.browse_password_encrypt"></iv-icon>
          </iv-tool-tip>
          {{ movie.title }}
        </p>
        <p class="desc">
          {{ movie.desc | textLineBreak(50) }}</p>
      </div>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  import {checkPostAuth} from '@/common/js/utils';

  export default {
    props: {
      movie: {
        Type: Object,
        default: undefined
      }
    },
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该文章为加密文章，您需要输入阅读密码', () => {
          this.$router.push({name: 'movie/detail', params: {movieId: post.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: 'movie/detail',
            params: {movieId: post.id},
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

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .movie-list-item
    > a
      position relative
      display block
      padding-bottom: 135%
      width: 100%
      height: 0
      overflow hidden
      img
        width 100%
        transition: All 0.4s ease-in-out
        transform: scale(1.0)
        zoom: 1.0
      .movie-info
        position absolute
        bottom 0
        left 0
        width 100%
        height 28%
        padding 10px
        background rgba($color-secondary-warning, 0.9)
        transition: All 0.4s ease-in-out
        opacity 1.0
        .title
          font-size 20px
          line-height 24px
          color $color-typegraphy-title
          margin-bottom 7px
        .desc
          font-size 14px
          line-height 18px
          color $color-gradually-gray-31
      &:hover
        img
          transition: All 0.4s ease-in-out
          transform: scale(1.05)
          zoom: 1.05
        .movie-info
          height 30%
          background rgba($color-gradually-gray-101, 1.0)
          .title
            color $color-gradually-gray-11
          .desc
            color $color-gradually-gray-11
</style>
