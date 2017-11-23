<template>
  <div class="album-preview">
    <album-carousel></album-carousel>
  </div>
</template>

<script type="text/ecmascript-6">
  import AlbumCarousel from '@/components/views/AlbumPreview/AlbumCarousel';

  export default {
    components: {
      'album-carousel': AlbumCarousel
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .album-preview
    width 100%
    height 100vmin
</style>
