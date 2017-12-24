<template>
  <div class="thumb-card" v-if="album != undefined">
    <router-link :to="{ name: 'album/detail', params:{ albumId: album.id}}" target="_blank">
      <div class="top-area">
        <router-link :to="{ name: 'album/detail', params:{ albumId: album.id}}" target="_blank">
          <p class="desc">{{ album.desc }}</p>
          <div class="background"></div>
          <img :src="album.front_image" alt="">
          <img :src="album.front_image" alt="">
          <img :src="album.front_image" alt="">
        </router-link>
      </div>
      <div class="bottom-area">
        <h4 class="title">
          <router-link :to="{ name: 'album/detail', params:{ albumId: album.id }}" target="_blank">{{ album.title }}</router-link>
        </h4>
        <p class="info"><span class="author">By / <a>{{ album.author }}</a></span></p>
        <p class="info"><span class="publish-time">At time / <a href="">{{ album.add_time | socialDate}}</a></span></p>
        <p class="operate_info">
          <span class="readings"><a> {{ album.click_num}}次阅读</a></span> |
          <span class="comments"><a> {{ album.comment_num}}个评论</a></span> |
          <span class="likes"><a> {{ album.like_num }}个喜欢</a></span></p>
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      album: {
        Type: Object
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/index.styl";

  .thumb-card
    margin 0 20px 40px 20px
    > a
      display block
      cursor default
      .top-area
        padding-bottom: 110%
        width: 100%
        height: 0
        overflow hidden
        a
          position relative
          display: block
          width: 100%
          padding-bottom: 110%
          .desc, .background
            position absolute
            opacity 0.0
            transition: All 0.5s ease-in-out
          .desc
            width: 60%
            margin 0 20%
            text-align center
            font-size 22px
            font-weight 200
            line-height 35px
            color #fff
            padding-top: 42%
            z-index 11
          .background
            width: 100%
            border-radius 20px
            padding-top: 100%
            z-index 10
          img
            display block
            position absolute
            border-radius 20px
            box-shadow 0 10px 10px 0 rgba(0, 0, 0, 0.15)
            width 100%
            zoom: 1.0
            z-index 9
            + img
              margin-top 8%
              z-index 8
              transition: All 0.4s ease-in-out
              transform: scale(0.9) rotate(90deg)
              zoom: 0.9
              + img
                margin-top 16%
                box-shadow none
                z-index 7
                transition: All 0.4s ease-in-out
                transform: scale(0.8) rotate(270deg)
                zoom: 0.8
        &:hover
          .background, .desc
            opacity 1.0
            transition: All 0.5s ease-in-out
          .background
            background-color rgba(33, 33, 33, 0.4)
          img
            transition: All 0.4s ease-in-out
            + img
              transform translate(0, 8px) scale(0.9) rotate(90deg)
              + img
                transform translate(0, 15px) scale(0.8) rotate(270deg)
      .bottom-area
        position relative
        text-align center
        padding 15px 18px 18px 20px
        z-index 6
        .title
          vertical-align middle
          font-size 18px
          line-height 25px
          height 60px
          a
            color $color-typegraphy-title
            &:hover
              text-decoration underline
              color $color-typegraphy-title-hover
        .info
          margin-bottom 10px
          font-size 14px
          font-weight 200
          a
            color: #777
            cursor pointer
            &:hover
              color $color-main-primary
              text-decoration underline
        .operate_info
          font-size 14px
          margin-top 15px
          span
            margin-right 5px
            + span
              margin-left 5px
            a
              cursor pointer
              &:hover
                color $color-main-primary
                text-decoration underline
</style>
