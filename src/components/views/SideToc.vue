<template>
  <div class="side-toc">
    <panel :title="'目录'">
      <div class="list" slot="content" ref="list" id="side-toc">
        <div class="active-indicator"></div>
      </div>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import Panel from '@/components/utils/Panel';

  export default {
    methods: {
      recalcActive() {
        // 先计算list相对于页面的顶部距离
        var listScrollTop = this.$refs.list.getBoundingClientRect().top + document.documentElement.scrollTop;
        // 再计算active相对于页面的顶部距离
        var activeAnode = this.$refs.list.querySelector('.active');
        if (activeAnode === null) {
          return;
        }
        var activeANodeScrollTop = activeAnode.getBoundingClientRect().top + document.documentElement.scrollTop;
        var activeIndicator = this.$refs.list.querySelector('.active-indicator');
        activeIndicator.style.top = activeANodeScrollTop - listScrollTop + 'px';
        activeIndicator.style.height = activeAnode.clientHeight + 'px';
      },
      beActive(event) {
        var activeANode = this.$refs.list.querySelector('.active');
        if (activeANode !== null) {
          activeANode.classList.remove('active');
        }
        event.target.classList.add('active');
        this.$nextTick(() => {
          this.recalcActive();
        });
      }
    },
    mounted: function () {
      this.recalcActive();
    },
    updated: function () {
      this.recalcActive();
    },
    components: {
      'panel': Panel
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";
  @import "../../common/stylus/toc.styl";

  .side-toc
    position relative
    background #fff
    h4
      font-size 18px
      padding 13px 13px 0
      line-height 18px
      text-align left
    .list
      position relative
      padding 0 25px 15px
      .active-indicator
        position absolute
        left -1px
        right 0
        background-color $color-gradually-gray-101
        border-left 2px solid $color-main-primary
        z-index 1
        transition all 0.2s ease-out

</style>
