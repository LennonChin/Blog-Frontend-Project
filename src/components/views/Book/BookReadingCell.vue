<template>
  <div class="book-reading-cell">
    <h4>正在阅读</h4>
    <a>
      <div class="img">
        <div class="container">
          <div class="bracket"></div>
          <div class="target">
            <img src="https://easyreadfs.nosdn.127.net/2Z3S4knwlEXvlfHKaZIsGw==/8796093023534719439" alt="">
          </div>
        </div>
      </div>
      <div class="book-info">
        <p class="title">
          <iv-tool-tip placement="right" content="该文章已加密，您需要输入阅读密码" v-if="false">
            <iv-icon type="android-lock" color="#FA5555" v-if="false"></iv-icon>
          </iv-tool-tip>
          领导力
        </p>
        <p class="desc"><span>作者：</span>【英】亚历克斯·弗格森</p>
        <iv-progress :percent="20" :stroke-width="6">
          <iv-icon type="checkmark-circled"></iv-icon>
          <span>20%</span>
        </iv-progress>
        <p class="desc">《领导力》是曼联功勋教练弗格森和红杉资本主席莫里茨联手之作，全面解析弗格森38年的领导心得——如何打造并管理一支永葆战斗力的队伍。我们（曼联）正处在欧冠比赛的关键时期，但是我父亲在伦敦生病了，情况很糟糕。</p>
        <iv-tag type="border">标签一</iv-tag>
        <iv-tag type="border">标签一</iv-tag>
        <iv-tag type="border">标签一</iv-tag>
        <iv-tag type="border">标签一</iv-tag>
      </div>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
        .title
          font-size 20px
          line-height 28px
          font-weight 500
          color $color-typegraphy-title
          margin-bottom 5px
          text-align justify
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
