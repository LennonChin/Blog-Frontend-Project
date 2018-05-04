<template>
  <div class="main-wrapper">
    <router-view name="header" keep-alive></router-view>
    <router-view name="content" :key="$route.fullPath"></router-view>
    <router-view name="footer" keep-alive></router-view>
  </div>
</template>

<script>
  export default {
    name: 'index'
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">

  .main-wrapper
    background-color #fafafa
    width 100%
    min-height 100vh
    margin 0 auto
</style>
