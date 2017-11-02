<template>
  <div class="main-wrapper">
    <router-view name="header"></router-view>
    <router-view name="content" class="main-content"></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .main-wrapper
    background-color #fff
    width 100%
    margin 0 auto
    .main-content
      width auto
      @media only screen and (max-width: 576px)
        margin 5px 5px 0 5px
      @media screen and (min-width: 576px)
        margin 10px 10px 0 10px
      @media screen and (min-width: 900px)
        margin 15px 35px 0 35px
      @media screen and (min-width: 1140px)
        width 1140px


</style>
