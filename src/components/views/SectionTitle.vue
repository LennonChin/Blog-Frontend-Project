<template>
  <div class="section-title">
    <div class="title">
      <span class="square"></span>
      <span class="main-title">{{mainTitle}}</span>
      <span class="vertical-line"></span>
      <span class="sub-title">{{subTitle}}</span>
      <span class="view-more"><a href="">{{tipText}} <iv-icon type="arrow-right-b"></iv-icon></a></span>
    </div>
    <ul class="sort">
      <li><a class="active" href="">最新</a></li>
      <li><a href="">点赞最多</a></li>
      <li><a href="">评论最多</a></li>
      <li><a href="">推荐</a></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      mainTitle: '',
      subTitle: '',
      tipText: {
        default: 'View More'
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl"

  .section-title
    display flex
    justify-content space-between
    padding 20px 0
    line-height 50px
    text-align left
    box-sizing border-box
    @media only screen and (max-width: 720px)
      padding 10px 0
    .title
      .square
        display inline-block
        height 30px
        width 30px
        background #000000
        vertical-align middle
      .main-title
        display inline-block
        vertical-align middle
        font-size 22px
        padding 0 10px
      .vertical-line
        display inline-block
        height 20px
        width 1px
        background-color #333
        vertical-align middle
      .sub-title
        display inline-block
        vertical-align middle
        font-size 18px
        padding-left 10px
      .view-more
        display inline-block
        vertical-align middle
        font-size 14px
        padding-left 10px
        a
          color $color-main-primary
          font-weight 500
          cursor pointer
          &:hover
            text-decoration underline
    .sort
      float right
      li
        float left
        margin 0 10px
        a
          padding 6px 0
          &:hover, &.active
            color $color-main-primary
            border-bottom 2px solid $color-main-primary
</style>
