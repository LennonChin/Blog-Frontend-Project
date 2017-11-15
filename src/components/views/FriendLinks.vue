<template>
  <div class="friend-links">
    <h4>友情链接</h4>
    <ul class="link-list">
      <li>
        <a href="">
          <img src="../../assets/logo.png" alt="">
          <div class="right">
            <p class="title">百度的个人博客</p>
            <p class="link">www.baidu.com</p>
          </div>
        </a>
      </li>
      <li>
        <a href="">
          <img src="../../assets/logo.png" alt="">
          <div class="right">
            <p class="title">百度的个人博客</p>
            <p class="link">www.baidu.com</p>
          </div>
        </a>
      </li>
      <li>
        <a href="">
          <img src="../../assets/logo.png" alt="">
          <div class="right">
            <p class="title">百度的个人博客</p>
            <p class="link">www.baidu.com</p>
          </div>
        </a>
      </li>
      <li>
        <a href="">
          <img src="../../assets/logo.png" alt="">
          <div class="right">
            <p class="title">百度的个人博客</p>
            <p class="link">www.baidu.com</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  .friend-links
    position relative
    margin-top 20px
    text-align center
    border 1px solid $color-border
    padding-bottom 20px
    h4
      font-size 18px
      padding 13px 0
      line-height 28px
      border-bottom 1px solid $color-border
    ul.link-list
      margin-top 10px
      li
        padding 2px 25px
        a
          display flex
          transform: translate(0, 0)
          transition: all 0.2s ease-in
          &:hover
            transform: translate(30px, 0)
            transition: all 0.2s ease-in-out
            .link
              color $dark
          img
            flex 0 0 50px
            width 50px
            height 50px
            padding 5px 0
          .right
            display flex
            flex-direction column
            padding-left 12px
            height 60px
            line-height 60px
            p
              flex 1
              text-align left
              &.title
                height 35px
                line-height 45px
                font-size 17px
                color $color-main-primary
              &.link
                height 15px
                line-height 15px
                font-weight 100

</style>
