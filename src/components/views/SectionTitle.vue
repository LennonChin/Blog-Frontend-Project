<template>
  <div class="section-title">
    <span class="square"></span>
    <span class="main-title">{{mainTitle}}</span>
    <span class="vertical-line"></span>
    <span class="sub-title">{{subTitle}}</span>
    <span class="view-more"><a href="">{{tipText}} <i class="el-icon-caret-right"></i></a></span>
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
    padding 20px 0
    height 50px
    line-height 50px
    text-align left
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
        color main-color
        font-weight 500
        cursor pointer
        &:hover
          text-decoration underline
</style>
