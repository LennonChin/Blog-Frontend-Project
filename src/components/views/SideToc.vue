<template>
  <div class="side-toc hide-scrollbar">
    <panel :title="'目录'">
      <div class="list" slot="content" ref="list" id="side-toc">
      </div>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import Panel from '@/components/views/Panel';

  export default {
    name: 'side-toc',
    components: {
      'panel': Panel
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";
  @import "../../common/stylus/toc.styl";

  .side-toc
    position relative
    background #fff
    max-height 90vh
    overflow scroll
    h4
      font-size 18px
      line-height 18px
      text-align left
    .list
      position relative

</style>
