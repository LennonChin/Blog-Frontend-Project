<template>
  <div class="social-section">
    <iv-menu :active-name="'1'" class="iv-menu-demo" :active-text-color="'#409EFF'" mode="horizontal">
      <iv-menu-item name="1" style="padding-left: 0;">
        <iv-icon type="heart"></iv-icon>
        {{recommends}} 人觉得很赞
      </iv-menu-item>
      <iv-submenu name="2">
        <template slot="title">
          <iv-icon type="log-in"></iv-icon>
          登录以评论
        </template>
        <iv-menu-item name="2-1">Google+</iv-menu-item>
        <iv-menu-item name="2-2">Github</iv-menu-item>
        <iv-menu-item name="2-3">Facebook</iv-menu-item>
      </iv-submenu>
      <iv-menu-item name="3" style="padding: 0;width: 200px;">
        <iv-input v-model="email" placeholder="或输入您的联系邮箱以评论" size="default"></iv-input>
      </iv-menu-item>
      <iv-menu-item name="4" style="float: right;"><a href="https://www.ele.me" target="_blank">菜单</a></iv-menu-item>
    </iv-menu>
    <div class="content">
      <div class="likes">
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
      </div>
      <div class="operate">
        <a><iv-icon type="heart-outline"></iv-icon> 赞这篇文章</a>
        <iv-dropdown>
          <span class="iv-dropdown-link">
            <iv-icon type="android-share-alt"></iv-icon> 分享 <iv-icon type="arrow-down-b"></iv-icon>
          </span>
          <iv-dropdown-menu slot="list">
            <iv-dropdown-item>菜单</iv-dropdown-item>
            <iv-dropdown-item>菜单</iv-dropdown-item>
            <iv-dropdown-item>菜单</iv-dropdown-item>
            <iv-dropdown-item disabled>菜单</iv-dropdown-item>
            <iv-dropdown-item divided>菜单</iv-dropdown-item>
          </iv-dropdown-menu>
        </iv-dropdown>
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
    <browse-more></browse-more>
  </div>
</template>

<script type="text/ecmascript-6">
  import MavonEditor from '@/components/views/MavonEditor';
  import CommentListCell from '@/components/views/Comment/CommentListCell';
  import BrowseMore from '@/components/views/BrowseMore';

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
      'comment-cell-list': CommentListCell,
      'browse-more': BrowseMore
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
        a, .iv-dropdown-link
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
