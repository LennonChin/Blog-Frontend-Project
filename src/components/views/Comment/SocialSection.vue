<template>
  <div class="social-section">
    <el-tabs>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-star-on"></i> {{recommends}} 人觉得很赞</span>
        <div class="content">
          <div class="likes">
            <a href=""><img src="../../../assets/avatar.jpeg" alt=""></a>
            <a href=""><img src="../../../assets/avatar.jpeg" alt=""></a>
            <a href=""><img src="../../../assets/avatar.jpeg" alt=""></a>
            <a href=""><img src="../../../assets/avatar.jpeg" alt=""></a>
            <a href=""><img src="../../../assets/avatar.jpeg" alt=""></a>
          </div>
          <div class="operate">
            <a><i class="el-icon-star-off"></i> 赞这篇文章</a>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-share"></i> 分享<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置管理"></el-tab-pane>
    </el-tabs>
    <div class="comment-area">
      <div class="editor" :class="{spread: spreadEditor}">
        <mavon-editor @valueChanged="valueChanged"></mavon-editor>
      </div>
      <p class="comment-tip"><a href="https://guides.github.com/features/mastering-markdown/" target="_blank"><i
              class="el-icon-info"></i> 可以使用MarkDown语法</a></p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MavonEditor from '@/components/views/MavonEditor';

  export default {
    props: {
      recommends: {
        default: 1
      }
    },
    data() {
      return {
        spreadEditor: false
      };
    },
    components: {
      'mavon-editor': MavonEditor
    },
    methods: {
      valueChanged(flag) {
        console.log(flag);
        this.spreadEditor = flag;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../.././../common/stylus/theme.styl";

  .social-section
    .content
      .likes
        a
          display inline-block
          margin-right 10px
          img
            border-radius $border-radius
            width 50px
            height 50px
      .operate
        margin 15px 0
        a, .el-dropdown-link
          display inline-block
          margin-right 15px
          font-size 15px
          color $color-main-primary
          &:hover
            cursor pointer
    .comment-area
      margin-bottom 100px
      .editor
        margin 15px 0 15px
        height 70px
        transition height 0.7s
        &.spread
          height 350px
      p.comment-tip
        a
          font-size 14px
          &:hover
            color $color-main-primary

</style>
