<template>
  <div class="movie-list-cell" v-if="movie != undefined">
    <router-link :to="{ name: 'movie/detail', params:{ movieId: movie.detail}}" target="_blank">
      <img :src="movie.front_image" alt="">
      <div class="info">
        <p class="title"> {{ movie.title }}</p>
        <p class="desc">
          {{ movie.desc.slice(0, 80) + '...' }}</p>
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      movie: {
        Type: Object,
        default: undefined
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .movie-list-cell
    a
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
      .info
        position absolute
        bottom 0
        left 0
        width 100%
        height 25%
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
        .info
          height 30%
          background rgba($color-gradually-gray-101, 1.0)
          .title
            color $color-gradually-gray-11
          .desc
            color $color-gradually-gray-11
</style>
