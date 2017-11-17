<template>
  <div class="panel">
    <h4>{{title}}</h4>
    <slot name="content" class="content"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        default: ''
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  .panel
    position relative
    border 1px solid $color-border
    h4
      font-size 18px
      padding 13px 0
      line-height 28px
      text-align center
      border-bottom 1px solid $color-border
    .content
      margin-top 10px
</style>
