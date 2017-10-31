<template>
  <div class="main-wrapper">
    <router-view name="header"></router-view>
    <router-view name="content"></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .main-wrapper
    background-color #fff
    width 1140px
    margin 0 auto
    @media only screen and (max-width: 1140px)
      margin 0 35px
      width auto
    @media only screen and (max-width: 576px)
      margin 0 5px
      width auto

</style>
