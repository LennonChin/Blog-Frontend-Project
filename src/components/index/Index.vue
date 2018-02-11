<template>
  <div class="main-wrapper">
    <router-view name="header" keep-alive></router-view>
    <router-view name="content" keep-alive></router-view>
    <router-view name="footer" keep-alive></router-view>
  </div>
</template>

<script>
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/base.styl";

  .main-wrapper
    background-color #fefefe
    width 100%
    min-height 100vh
    margin 0 auto
</style>
