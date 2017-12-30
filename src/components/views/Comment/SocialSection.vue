<template>
  <div class="social-section" v-if="article != undefined">
    <iv-menu :active-name="'1'" :class="theme" mode="horizontal" style="z-index: 19;">
      <iv-menu-item name="1" style="padding-left: 0;">
        <iv-icon type="heart"></iv-icon>
        {{ article.like_num }} 人觉得很赞
      </iv-menu-item>
      <iv-menu-item name="2" style="padding-left: 0;">
        <iv-icon type="heart"></iv-icon>
        赞这篇文章
      </iv-menu-item>
      <iv-submenu name="3" style="padding-left: 0;">
        <template slot="title">
          <iv-icon type="android-share-alt"></iv-icon>
          分享
        </template>
        <iv-menu-item name="3-1">菜单</iv-menu-item>
        <iv-menu-item name="3-2">菜单</iv-menu-item>
        <iv-menu-item name="3-3">菜单</iv-menu-item>
        <iv-menu-item name="3-2">菜单</iv-menu-item>
        <iv-menu-item name="3-3">菜单</iv-menu-item>
        <iv-menu-item name="3-2">菜单</iv-menu-item>
        <iv-menu-item name="3-3">菜单</iv-menu-item>
      </iv-submenu>
    </iv-menu>
    <div class="content">
      <div class="likes">
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
        <a href=""><img src="../../../assets/avatar.png" alt=""></a>
      </div>
    </div>

    <div class="comment-area">
      <div class="editor" :class="{spread: spreadEditor}">
        <mavon-editor :post="article" :theme="theme" @valueChanged="valueChanged"></mavon-editor>
      </div>
    </div>

    <div class="comment-list">
      <div v-for="comment_level1 in comments" :key="comment_level1.id">
        <comment-cell-list :theme="theme"
                           :post="article"
                           :commentLevel="comment_level1.comment_level"
                           :comment="comment_level1"></comment-cell-list>
        <comment-cell-list :theme="theme"
                           :post="article"
                           :commentLevel="comment_level2.comment_level"
                           :comment="comment_level2"
                           :key="comment_level2.id"
                           v-for="comment_level2 in comment_level1.sub_comment"></comment-cell-list>
      </div>
    </div>
    <browse-more></browse-more>
  </div>
</template>

<script type="text/ecmascript-6">
  import MavonEditor from '@/components/views/MavonEditor';
  import CommentListCell from '@/components/views/Comment/CommentListCell';
  import BrowseMore from '@/components/views/BrowseMore';
  // API
  import {getCommentInfo} from '@/api/api';

  export default {
    props: {
      article: {
        Type: Object,
        default: undefined
      },
      theme: {
        Type: String,
        default: ''
      }
    },
    data() {
      return {
        comments: [],
        spreadEditor: false,
        name: '',
        select: 'email',
        email: '',
        mobile: ''
      };
    },
    created() {
      this.getCommentInfo();
    },
    methods: {
      getCommentInfo() {
        getCommentInfo({
          params: {
            post_id: this.article.id,
            comment_level: 0
          }
        }).then((response) => {
          this.comments = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });
      },
      valueChanged(flag) {
        console.log(flag);
        this.spreadEditor = flag;
      }
    },
    components: {
      'mavon-editor': MavonEditor,
      'comment-cell-list': CommentListCell,
      'browse-more': BrowseMore
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../.././../common/stylus/theme.styl";
  // #mavon-editor .operate .iv-dropdown-link
  .social-section
    .dark-theme
      background #000
      &::after
        display none
      .ivu-menu-item
        &:hover
          color $color-secondary-warning
          border-bottom 2px solid $color-secondary-warning
      .ivu-menu-item-active
        color $color-secondary-warning
        border-bottom 2px solid $color-secondary-warning
      .ivu-menu-submenu
        &:hover
          color $color-secondary-warning
          border-bottom 2px solid $color-secondary-warning
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
    .comment-area
      .editor
        margin 15px 0 10px
        height 200px
        transition height 0.7s
        &.spread
          height 450px

</style>
