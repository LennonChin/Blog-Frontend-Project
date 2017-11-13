<template>
  <div class="social-section">
    <el-menu :default-active="'1'" class="el-menu-demo" :active-text-color="'#409EFF'" mode="horizontal">
      <el-menu-item index="1" style="padding-left: 0;">
        <i class="el-icon-star-on"></i>{{recommends}} 人觉得很赞
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">登录以评论</template>
        <el-menu-item index="2-1">Google+</el-menu-item>
        <el-menu-item index="2-2">Github</el-menu-item>
        <el-menu-item index="2-3">Facebook</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" style="padding: 0;width: 200px;">
        <el-input v-model="email" placeholder="或输入您的联系邮箱以评论" size="small"></el-input>
      </el-menu-item>
      <el-menu-item index="4" style="float: right;"><a href="https://www.ele.me" target="_blank">菜单</a></el-menu-item>
    </el-menu>
    <div class="content">
      <div class="likes">
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
      </div>
      <div class="operate">
        <a><i class="el-icon-star-off"></i> 赞这篇文章</a>
        <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-share"></i> 分享<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>菜单</el-dropdown-item>
            <el-dropdown-item>菜单</el-dropdown-item>
            <el-dropdown-item>菜单</el-dropdown-item>
            <el-dropdown-item disabled>菜单</el-dropdown-item>
            <el-dropdown-item divided>菜单</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="comment-area">
      <div class="editor" :class="{spread: spreadEditor}">
        <mavon-editor @valueChanged="valueChanged"></mavon-editor>
      </div>
    </div>

    <div class="comment-list">
      <comment-cell-list :commentLevel="0"></comment-cell-list>
      <comment-cell-list :commentLevel="1"></comment-cell-list>
      <comment-cell-list :commentLevel="1"></comment-cell-list>
      <comment-cell-list :commentLevel="0"></comment-cell-list>
      <comment-cell-list :commentLevel="0"></comment-cell-list>
      <comment-cell-list :commentLevel="1"></comment-cell-list>
      <comment-cell-list :commentLevel="1"></comment-cell-list>
      <comment-cell-list :commentLevel="1"></comment-cell-list>
      <comment-cell-list :commentLevel="2"></comment-cell-list>
      <comment-cell-list :commentLevel="3"></comment-cell-list>
      <comment-cell-list :commentLevel="1"></comment-cell-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MavonEditor from '@/components/views/MavonEditor';
  import CommentListCell from '@/components/views/Comment/CommentListCell';

  export default {
    props: {
      recommends: {
        default: 1
      }
    },
    data() {
      return {
        spreadEditor: false,
        email: ''
      };
    },
    components: {
      'mavon-editor': MavonEditor,
      'comment-cell-list': CommentListCell
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
      margin 15px 0
      .likes
        margin-bottom 20px
        a
          display inline-block
          margin-right 10px
          img
            border-radius $border-radius
            width 40px
            height 40px
      .operate
        margin 20px 0
        a, .el-dropdown-link
          display inline-block
          margin-right 15px
          font-size 15px
          color $color-main-primary
          &:hover
            cursor pointer
    .comment-area
      .editor
        margin 15px 0 10px
        height 150px
        transition height 0.7s
        &.spread
          height 350px

</style>
