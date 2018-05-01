<template>
  <div class="common-footer">
    <i-backtop :height="500" :bottom="backTopBottom" :right="20"></i-backtop>
    <p class="copyright">
      <a href="http://www.miibeian.gov.cn/">{{ siteInfo.icp }}</a><span>|</span>
      {{ siteInfo.copyright }}<span>|</span>以商业目的使用本网站内容需获许可，非商业目的使用授权遵循
      <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a>。
    </p>
    <p class="copyright-english">All content is made available under the CC BY-NC 4.0 for non-commercial use. Commercial
      use of this content is prohibited without explicit permission.</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapState
  } from 'vuex';

  export default {
    name: 'common-footer',
    computed: {
      ...mapState({
        siteInfo: state => state.base.siteInfo
      }),
      backTopBottom() {
        return 120;
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  .common-footer
    background #fff
    border-top 1px solid $color-border
    padding 15px 5px
    margin-top 50px
    text-align center
    z-index 99
    .side-menu
      right 20px
    p
      margin 0 auto
      font-size 15px
      line-height 22px
      font-weight 100
      span
        padding 0 10px
    .copyright
      margin-top 10px
      color $color-gradually-gray-61
      a
        color $color-gradually-gray-61
        &:hover
          color $color-main-primary
    .copyright-english
      color $color-gradually-gray-41
</style>
