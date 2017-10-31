<template>
  <div class="content">
    <div class="photowall-wrapper">
      <photo-wall></photo-wall>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import PhotoWall from '@/components/views/PhotoWall';

  export default {
    components: {
      'photo-wall': PhotoWall
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    height 1000px
    .photowall-wrapper
      margin-top 20px
      @media only screen and (max-width: 1140px)
        margin-top 15px
      @media only screen and (max-width: 576px)
        margin-top 5px
</style>
