<template>
  <div class="movie-page-header" v-if="Object.keys(movie).length > 0">
    <p class="title">{{ movie.title }}<span>（{{ movie.subtitle }}）</span></p>
    <p class="desc">{{ movie.desc | textLineBreak(150) }}</p>
    <div class="infos">
      <div class="img">
        <img :src="resolveImageUrl(movie.front_image)" alt="">
      </div>
      <div class="info">
        <p class="director"><span>导演：</span>{{ movie.director }}</p>
        <p class="director"><span>主演：</span>{{ movie.actors }}</p>
        <p class="director"><span>类型：</span>{{ movie.category.name }}</p>
        <p class="director"><span>制片国家/地区：</span>{{ movie.region }}</p>
        <p class="director"><span>语言：</span>{{ movie.language }}</p>
        <p class="director"><span>片长：</span>{{ movie.length }}分钟</p>
        <p class="director"><span>剧情介绍：</span>{{ movie.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'movie-page-header',
    props: {
      movie: {
        Type: Object,
        default: undefined
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .movie-page-header
    position relative
    width auto
    z-index 10
    @media only screen and (max-width: 768px)
      margin 0 5px 0 5px
      padding-top 5px
    @media screen and (min-width: 768px)
      margin 0 10px 0 10px
      padding-top 10px
    @media screen and (min-width: 992px)
      margin 0 35px 0 35px
      padding-top 15px
    @media screen and (min-width: 1200px)
      width 1200px
      margin 0 auto
      padding-top 20px
    .title
      color $color-gradually-gray-91
      font-size 22px
      font-weight 700
      line-height 25px
      margin-bottom 5px
    .desc
      color $color-gradually-gray-91
      font-size 15px
      line-height 20px
      padding-bottom 10px
      border-bottom 1px solid rgba(222, 222, 222, 0.3)
    .infos
      padding 10px 0 10px
      .img
        float left
        margin-bottom 10px
        height: 0
        overflow hidden
        @media only screen and (max-width: 768px)
          width: 30%
          padding 0 10px 39% 0
          margin-bottom 5px
        @media screen and (min-width: 768px)
          width: 25%
          padding 0 10px 33% 0
          margin-bottom 5px
        @media screen and (min-width: 992px)
          width: 28%
          padding 0 15px 39% 0
        @media screen and (min-width: 1200px)
          width: 25%
          padding 0 15px 35% 0
        img
          width 100%
      .info
        p
          color $color-gradually-gray-91
          font-size 15px
          line-height 22px
          margin-bottom 8px
          font-weight 100
          span
            font-weight 700

</style>
