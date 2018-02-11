<template>
  <div class="panel">
    <h4 :class="titleAlign">{{title}}</h4>
    <slot name="content"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        default: ''
      },
      titleAlign: {
        default: 'left'
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  .panel
    position relative
    background #fff
    h4
      font-size 18px
      padding 13px 20px 13px
      line-height 18px
      text-align left
      border-left 5px solid $color-main-primary
      &.center
        text-align center
        border 1px solid $color-border
      &.left
        text-align left
        border-left 5px solid $color-main-primary
        border-right none
      &.right
        text-align right
        border-right 5px solid $color-main-primary
        border-left none
</style>
