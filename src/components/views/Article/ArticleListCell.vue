<template>
  <div class="article-list-cell">
    <router-link :to="{ name: 'article/detail', params:{ articleId: article.detail}}" target="_blank">
      <iv-row type="flex">
        <iv-col :xs="24" :sm="24" :md="textSpan" :lg="textSpan" :order="textOrderType"
                style="padding-left: 0;padding-right: 0;">
          <div class="text-wrapper">
            <h4 class="title">
              <router-link :to="{ name: 'article/detail', params:{ articleId: article.detail}}" target="_blank">{{article.title}}</router-link>
            </h4>
            <div class="tags">
              <iv-tag :color="tag.color" v-for="tag in article.tags" :key="tag.id">{{ tag.name }}</iv-tag>
            </div>
            <p class="desc">{{article.desc.substr(0, 70)}}
              <router-link :to="{ name: 'article/detail', params:{ articleId: article.detail}}" target="_blank"> View More
              <iv-icon type="arrow-right-b"></iv-icon>
            </router-link>
            </p>
            <p class="operate_info">
              <span class="publish-time">At time / <a>{{article.add_time}}</a></span>
              <span class="readings"><a><iv-icon type="eye"></iv-icon> {{article.click_num}} 阅读</a></span>
              <span class="comments"><a><iv-icon type="compose"></iv-icon> {{article.comment_num}} 评论</a></span>
              <span class="likes"><a><iv-icon type="heart"></iv-icon> {{article.like_num}} 喜欢</a></span>
            </p>
          </div>
        </iv-col>
        <iv-col :xs="0" :sm="0" :md="imgSpan" :lg="imgSpan" :order="imgOrderType"
                style="padding-left: 0px;padding-right: 0px">
          <div class="img-wrapper" :class="themeClass">
            <img :src="article.front_image" alt="">
          </div>
        </iv-col>
      </iv-row>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  const ARTICLE_TYPE_NO_IMAGE = 0;
  const ARTICLE_TYPE_NORMAL_IMAGE = 1;
  const ARTICLE_TYPE_BIG_IMAGE = 2;

  export default {
    props: {
      article: {
        Type: Object
      }
    },
    computed: {
      textOrderType: function () {
        return parseInt(this.article.front_image_type) === ARTICLE_TYPE_BIG_IMAGE ? 2 : 1;
      },
      imgOrderType: function () {
        return parseInt(this.article.front_image_type) === ARTICLE_TYPE_BIG_IMAGE ? 1 : 2;
      },
      textSpan: function () {
        switch (parseInt(this.article.front_image_type)) {
          case ARTICLE_TYPE_NO_IMAGE:
            return 24;
          case ARTICLE_TYPE_NORMAL_IMAGE:
            return 17;
          case ARTICLE_TYPE_BIG_IMAGE:
            return 24;
          default:
            return 24;
        }
      },
      imgSpan: function () {
        switch (parseInt(this.article.front_image_type)) {
          case ARTICLE_TYPE_NO_IMAGE:
            return 0;
          case ARTICLE_TYPE_NORMAL_IMAGE:
            return 7;
          case ARTICLE_TYPE_BIG_IMAGE:
            return 24;
          default:
            return 0;
        }
      },
      themeClass: function () {
        if (parseInt(this.article.front_image_type) === ARTICLE_TYPE_BIG_IMAGE) {
          return 'big-image';
        } else {
          return '';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/index.styl";

  .article-list-cell
    margin-bottom 15px
    > a
      display block
      cursor default
      border 1px solid $color-border
      &:hover
        border 1px solid $color-border-hover
        box-shadow 2px 2px 3px $color-border
      .text-wrapper
        padding 20px 20px 0 20px
        text-align left
        @media only screen and (max-width: 768px)
          padding 15px 15px 0 15px
        .title
          font-size 23px
          font-weight 100
          line-height 27px
          a
            color $color-typegraphy-title
            cursor pointer
            &:hover
              color $color-typegraphy-title-hover
              text-decoration underline
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
        .line
          width 50px
          margin-top 30px
          border-1px(rgba(7, 17, 27, 0.4))
          &::after
            margin-bottom 15px
        .tags
          margin: 8px 0
        .desc
          color #666
          font-size 14px
          line-height 20px
          font-weight 200
          a
            color $color-main-primary
            font-weight 500
            cursor pointer
            &:hover
              text-decoration underline
        .operate_info
          font-size 14px
          margin 15px 0 20px
          span
            margin-right 8px
            + span
              margin-left 8px
            a
              cursor pointer
              &:hover
                color $color-main-primary
                text-decoration underline
      .img-wrapper
        padding-bottom: 85%
        width: 100%
        height: 0
        overflow hidden
        &.big-image
          padding-bottom 26%
        img
          width 100%
</style>
