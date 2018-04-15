<template>
  <div class="article-page-header" v-if="article !== undefined">
    <div class="tags">
      <i-tag color="blue" v-for="tag in article.tags" :key="tag.id">{{ tag.name }}</i-tag>
    </div>
    <p class="title">{{ article.title }}</p>
    <i-row>
      <i-col :xs="24" :sm="10" :md="10" :lg="10" style="padding-left: 0;padding-right: 0;">
        <p class="info"><span class="author">By / <a href="">{{article.author}}</a></span><span
                class="publish-time">  At time / <a href="">{{ article.add_time | socialDate }}</a></span></p>
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
  import API from '@/api/client-api';

  export default {
    props: {
      article: {
        Type: Object,
        default: undefined
      }
    },
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
  @import "../../../common/stylus/index.styl";

  .article-page-header
    text-align left
    margin-bottom 30px
    border-bottom 1px solid $color-border
    @media only screen and (max-width: 768px)
      padding 10px 0 10px
    @media screen and (min-width: 768px)
      padding 10px 0 10px
    @media screen and (min-width: 992px)
      padding 25px 0 10px
    .tags
      margin-bottom 18px
    .title
      font-size 27px
      line-height 35px
      font-weight 500
      color $color-typegraphy-title
    .info
      margin-top 10px
      font-size 14px
      line-height 18px
      font-weight 200
      a
        color: #777
        cursor pointer
        &:hover
          color $color-main-primary
          text-decoration underline
      .publish-time
        margin-left 20px
    .operate_info
      text-align right
      font-size 14px
      margin 15px 0
      @media only screen and (max-width: 768px)
        text-align left
      span
        margin-right 10px
        + span
          margin-left 10px
        a
          cursor pointer
          &:hover
            color $color-main-primary
            text-decoration underline
    .abstract
      font-size 16px
      line-height 28px
      background $color-border
      @media only screen and (max-width: 768px)
        padding 10px
        margin 5px 0
      @media screen and (min-width: 768px)
        padding 15px
        margin 8px 0
      @media screen and (min-width: 992px)
        padding 20px
        margin 10px 0

</style>
