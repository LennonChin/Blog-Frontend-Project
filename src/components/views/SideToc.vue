<template>
  <div class="side-toc">
    <h4>目录</h4>
    <div class="list" ref="list">
      <div class="active-indicator"></div>
      <ul class="menu-root">
        <li><a class="nav-link" href="http://localhost:8090/article#tip0">Action</a>
          <ul>
            <li><a class="nav-link" href="http://localhost:8090/article#tip1">分发 Action</a></li>
            <li class="active"><a class="nav-link" href="http://localhost:8090/article#tip2">在组件中分发 Action在组件中分发 Action在组件中分发 Action在组件中分发 Action在组件中分发 Action</a></li>
            <li><a class="nav-link" href="http://localhost:8090/article#tip3">组合 Action</a>
              <ul>
                <li><a class="nav-link" href="http://localhost:8090/article#tip4">现在你可以</a>
                  <ul>
                    <li><a class="nav-link" href="http://localhost:8090/article#tip5">另外一个</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a class="nav-link" href="http://localhost:8090/article#tip6">后记</a></li>
            <li><a class="nav-link" href="http://localhost:8090/article#tip1">分发 Action</a></li>
            <li><a class="nav-link" href="http://localhost:8090/article#tip2">在组件中分发 Action在组件中分发 Action在组件中分发 Action在组件中分发 Action在组件中分发 Action</a></li>
            <li><a class="nav-link" href="http://localhost:8090/article#tip3">组合 Action</a>
              <ul>
                <li><a class="nav-link" href="http://localhost:8090/article#tip4">现在你可以</a>
                  <ul>
                    <li><a class="nav-link" href="http://localhost:8090/article#tip5">另外一个</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      recalcActive() {
        // 先计算list相对于页面的顶部距离
        var listScrollTop = this.$refs.list.getBoundingClientRect().top + document.documentElement.scrollTop;
        console.log(this.$refs.list);
        // 再计算active相对于页面的顶部距离
        var activeLiNode = this.$refs.list.querySelector('.active');
        var activeLiNodeScrollTop = activeLiNode.getBoundingClientRect().top + document.documentElement.scrollTop;
        var activeIndicator = this.$refs.list.querySelector('.active-indicator');
        activeIndicator.style.top = activeLiNodeScrollTop - listScrollTop + 'px';
        activeIndicator.style.height = activeLiNode.clientHeight + 'px';
      }
    },
    mounted: function () {
      this.recalcActive();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/theme.styl";

  .side-toc
    position relative
    margin-top 20px
    border 1px solid $color-border
    padding-bottom 20px
    h4
      font-size 18px
      padding 13px 0
      line-height 28px
      text-align center
      border-bottom 1px solid $color-border
    .list
      position relative
      padding 20px 25px 10px
      .active-indicator
        position absolute
        left -1px
        right 0
        background-color $color-gradually-gray-101
        border-left 2px solid $color-main-primary
        z-index 1
      ul
        position relative
        padding-left: 1em
        z-index 2
        > li
          list-style-type: square
          line-height 2.2em
          &.active
            > a
              color $color-main-primary
          > a
            font-size 16px
            color $color-gradually-gray-21
          > ul > li > a
            font-size 16px
            color $color-gradually-gray-51

</style>
