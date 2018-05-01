<template>
  <div id="movie-page-content">
    <slot name="content"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'movie-page-content'
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/article.styl";
</style>
