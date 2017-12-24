<template>
  <div class="topic-card" v-if="album != undefined">
    <router-link :to="{ name: 'album/detail', params:{ albumId: album.id}}" target="_blank">
      <div class="top-area">
        <router-link :to="{ name: 'album/detail', params:{ albumId: album.id}}" target="_blank">
          <img :src="album.front_image" alt="">
        </router-link>
      </div>
      <div class="bottom-area">
        <h4 class="title"><a :title="album.title">{{ album.title | textLineBreak(11) }}</a></h4>
        <p class="info"><span class="author">By / <a>{{ album.author }}</a></span></p>
        <p class="info"><span class="publish-time">At time / <a href="">{{ album.add_time | socialDate }}</a></span></p>
        <p class="operate_info">
          <span class="readings"><a> {{ album.click_num }}次阅读</a></span> |
          <span class="comments"><a> {{ album.comment_num }}个评论</a></span> |
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
  @import "../../common/stylus/index.styl"

  .topic-card
    margin-bottom 10px
    > a
      display block
      cursor default
      border 1px solid $color-border
      &:hover
        border 1px solid $color-border-hover
        box-shadow 2px 2px 3px $color-border
      .top-area
        padding-bottom: 100%
        width: 100%
        height: 0
        overflow hidden
        a
          display: block
          width: 100%
          img
            width 100%
            transition: All 0.4s ease-in-out
            transform: scale(1.0)
            zoom: 1.0
        &:hover
          img
            transition: All 0.4s ease-in-out
            transform: scale(1.05)
            zoom: 1.05
      .bottom-area
        text-align left
        padding 20px 18px 18px 20px
        .title
          font-size 18px
          margin-bottom 10px
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
