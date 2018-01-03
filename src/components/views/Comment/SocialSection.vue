<template>
  <div class="social-section" v-if="article != undefined">
    <iv-menu :active-name="'1'" :class="theme" mode="horizontal">
      <iv-menu-item name="1" style="padding-left: 0;" @click.native="likePost(article)">
        <iv-icon type="heart"></iv-icon>
        {{ article.like_num }} 人觉得很赞
      </iv-menu-item>
      <!--<iv-submenu name="3" style="padding-left: 0;">-->
        <!--<template slot="title">-->
          <!--<iv-icon type="android-share-alt"></iv-icon>-->
          <!--分享-->
        <!--</template>-->
        <!--<iv-menu-item name="3-1">菜单</iv-menu-item>-->
        <!--<iv-menu-item name="3-2">菜单</iv-menu-item>-->
        <!--<iv-menu-item name="3-3">菜单</iv-menu-item>-->
        <!--<iv-menu-item name="3-2">菜单</iv-menu-item>-->
        <!--<iv-menu-item name="3-3">菜单</iv-menu-item>-->
        <!--<iv-menu-item name="3-2">菜单</iv-menu-item>-->
        <!--<iv-menu-item name="3-3">菜单</iv-menu-item>-->
      <!--</iv-submenu>-->
    </iv-menu>
    <!--<div class="content">-->
      <!--<div class="likes">-->
        <!--<a href=""><img src="../../../assets/avatar.png" alt=""></a>-->
        <!--<a href=""><img src="../../../assets/avatar.png" alt=""></a>-->
        <!--<a href=""><img src="../../../assets/avatar.png" alt=""></a>-->
        <!--<a href=""><img src="../../../assets/avatar.png" alt=""></a>-->
        <!--<a href=""><img src="../../../assets/avatar.png" alt=""></a>-->
      <!--</div>-->
    <!--</div>-->

    <div class="comment-area">
      <div class="editor" :class="{spread: spreadEditor}">
        <mavon-editor :post="article"
                      :theme="theme"
                      @valueChanged="valueChanged"
                      @publishedComment="publishedComment"></mavon-editor>
      </div>
    </div>

    <div class="comment-list" v-if="comments.length > 0">
      <div v-for="comment_level1 in comments" :key="comment_level1.id">
        <comment-cell-list :theme="theme"
                           :post="article"
                           :commentLevel="comment_level1.comment_level"
                           :comment="comment_level1"
                           @publishedComment="publishedComment"></comment-cell-list>
        <comment-cell-list v-for="comment_level2 in comment_level1.sub_comment"
                           :key="comment_level2.id"
                           :theme="theme"
                           :post="article"
                           :commentLevel="comment_level2.comment_level"
                           :comment="comment_level2"
                           @publishedComment="publishedComment"></comment-cell-list>
      </div>
      <browse-more></browse-more>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MavonEditor from '@/components/views/MavonEditor';
  import CommentListCell from '@/components/views/Comment/CommentListCell';
  import BrowseMore from '@/components/views/BrowseMore';
  // API
  import {getCommentInfo, addPostLike} from '@/api/api';

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
            comment_level: 0,
            limit: 10,
            offset: 0
          }
        }).then((response) => {
          this.comments = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });
      },
      likePost(post) {
        addPostLike({
          post_id: post.id
        }).then((response) => {
          post.like_num += 1;
          this.$Message.success('点赞成功');
        }).catch(function (error) {
          console.log(error);
        });
      },
      valueChanged(flag) {
        console.log(flag);
        this.spreadEditor = flag;
      },
      publishedComment(comment) {
        console.log(comment);
        if (comment.parent_comment === null) {
          // 根评论为空,表示是一级评论
          this.comments.unshift(comment);
        } else {
          // 否则是子级评论
          let parentComment = this.getParentComment(comment.parent_comment);
          if (parentComment !== null) {
            if (parentComment.sub_comment === null || parentComment.sub_comment === undefined) {
              parentComment.sub_comment = [];
            }
            parentComment.sub_comment.push(comment);
          }
        }
      },
      getParentComment(parentCommentId) {
        let recursiveComments = [];
        let recursiveCommentyIds = [];
        var recursiveComment = function (comments, parentCommentId) {
          if (parentCommentId === null || parentCommentId === undefined) return null;
          for (let index = 0; index < comments.length; index++) {
            let comment = comments[index];
            if (comment.id === parentCommentId) {
              recursiveComments.push(comment);
              recursiveCommentyIds.push(comment.id);
              return comment;
            } else if (comment.sub_comment && comment.sub_comment.length > 0) {
              let result = recursiveComment(comment.sub_comment, parentCommentId);
              if (result) {
                recursiveComments.push(comment);
                recursiveCommentyIds.push(comment.id);
                return result;
              }
            }
          }
        };
        let parentComment = recursiveComment(this.comments, parentCommentId);
        recursiveComments = recursiveComments.reverse();
        recursiveCommentyIds = recursiveCommentyIds.reverse();
        return parentComment;
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
