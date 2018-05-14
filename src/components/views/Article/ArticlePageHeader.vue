<template>
  <div class="article-page-header" v-if="article !== undefined">
    <div class="tags">
      <i-tag color="blue" v-for="tag in article.tags" :key="tag.id" class="dot-tag">{{ tag.name }}</i-tag>
    </div>
    <p class="title">{{ article.title }}</p>
    <i-row>
      <i-col :xs="24" :sm="10" :md="10" :lg="10" style="padding-left: 0;padding-right: 0;">
        <p class="info">
          <span class="author">By / <a href="">{{article.author}}</a></span>
          <span class="publish-time">  At time / <a href="">{{ article.add_time | socialDate }}</a></span>
        </p>
      </i-col>
      <i-col :xs="24" :sm="14" :md="14" :lg="14" style="padding-left: 0;padding-right: 0;">
        <p class="operate_info">
          <span class="readings"><a><i-icon type="eye"></i-icon> {{article.click_num}} 阅读</a></span> |
          <span class="comments"><a><i-icon type="compose"></i-icon> {{article.comment_num}} 评论</a></span> |
          <span class="likes"><a @click="likePost(article)"><i-icon type="heart"></i-icon> {{article.like_num}} 觉得赞</a></span>
        </p>
      </i-col>
    </i-row>
    <p class="abstract" v-if="article.abstract">
      摘要：{{ article.abstract }}
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from 'API';
  // mixin
  import {mixin} from '@/common/js/utils';

  export default {
    name: 'article-page-header',
    props: {
      article: {
        Type: Object,
        default: undefined
      }
    },
    mixins: [mixin],
    methods: {
      likePost(post) {
        API.addPostLike({
          post_id: post.id
        }).then((response) => {
          post.like_num += 1;
          this.$Message.success('点赞成功');
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .article-page-header
    text-align left
    @media screen and (min-width: 768px)
      padding 10px 0 10px
    @media screen and (min-width: 992px)
      padding 15px 0 10px
    .tags
      margin-bottom 10px
    .title
      font-size 27px
      line-height 35px
      font-weight 500
      color $default-title-color
      @media only screen and (max-width: 768px)
        font-size 20px
        line-height 23px
    .info, .operate_info
      margin-top 10px
      font-size 14px
      font-weight 200
      line-height 18px
      color $default-desc-color
      @media only screen and (max-width: 768px)
        margin-top 7px
        font-size 12px
        line-height 15px
      a
        color: $default-link-color
        cursor pointer
        &:hover
          color $default-link-hover-color
      .publish-time
        margin-left 20px
    .operate_info
      text-align right
      @media only screen and (max-width: 768px)
        text-align left
      span
        margin-right 10px
        + span
          margin-left 10px
        a
          cursor pointer
          &:hover
            color $default-link-hover-color
    .abstract
      font-size 16px
      line-height 28px
      color $default-desc-color
      border 1px dashed $default-border-color
      background $default-border-color
      @media only screen and (max-width: 768px)
        padding 10px
        margin-top 8px
      @media screen and (min-width: 768px)
        padding 15px
        margin-top 8px
      @media screen and (min-width: 992px)
        padding 20px
        margin-top 15px

</style>
