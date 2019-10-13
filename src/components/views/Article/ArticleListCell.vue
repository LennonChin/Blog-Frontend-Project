<template>
  <div class="article-list-cell">
    <i-row type="flex">
      <i-col :xs="24" :sm="24" :md="textSpan" :lg="textSpan" :order="textOrderType"
             style="padding-left: 0;padding-right: 0;">
        <div class="text-wrapper">
          <h4 class="title">
            <i-tool-tip placement="right" :content="$t('article.authTip')" v-if="article.need_auth">
              <i-icon type="android-lock" color="#FA5555" v-if="article.need_auth"></i-icon>
            </i-tool-tip>
            <a @click.prevent="gotoPostDetail(article)" :href="`/${article.post_type}/${article.id}`"> {{article[resolveI18N('title')]}}</a>
            <span class="special" v-if="article.index > 0" :title="$t('others.stickyTip')">{{ $t('others.sticky') }}</span>
          </h4>
          <div class="tags">
            <i-tag :color="tag.color" type="border" v-for="tag in article.tags" :key="tag.id" class="border-tag">{{tag[resolveI18N('name')]}}</i-tag>
          </div>
          <p class="desc">{{article[resolveI18N('desc')] | textLineBreak(90) }}
            <a @click.prevent="gotoPostDetail(article)" :href="`/${article.post_type}/${article.id}`"> {{ $t('common.viewmore') }}
              <i-icon type="arrow-right-b"></i-icon>
            </a>
          </p>
          <p class="operate_info">
            <span class="publish-time"><a>{{ article.add_time | socialDate }}</a></span>
            <span class="readings"><a><i-icon type="eye"></i-icon> {{article.click_num}} {{ $t("article.read") }}</a></span>
            <span class="comments"><a><i-icon type="compose"></i-icon> {{article.comment_num}} {{ $t("article.comments") }}</a></span>
            <span class="likes"><a @click="likePost(article)"><i-icon type="heart"></i-icon> {{article.like_num}} {{ $t("article.likes") }}</a></span>
          </p>
        </div>
      </i-col>
      <i-col :xs="0" :sm="0" :md="imgSpan" :lg="imgSpan" :order="imgOrderType"
             style="padding-left: 0;padding-right: 0;">
        <div class="img-wrapper" :class="themeClass">
          <img :src="article.front_image" alt="">
        </div>
      </i-col>
    </i-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from 'API';
  import {checkPostAuth, mixin} from '@/common/js/utils';

  const ARTICLE_TYPE_NO_IMAGE = 0;
  const ARTICLE_TYPE_NORMAL_IMAGE = 1;
  const ARTICLE_TYPE_BIG_IMAGE = 2;

  export default {
    name: 'article-list-cell',
    props: {
      article: {
        Type: Object
      }
    },
    mixins: [mixin],
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
    },
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该文章已加密，您需要输入访问密码', () => {
          this.$router.push({name: post.post_type, params: {id: post.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: post.post_type,
            params: {id: post.id},
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, (error) => {
          console.log(error);
          this.$Notice.error({
            title: '密码错误'
          });
        });
      },
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

  .article-list-cell
    margin-bottom 10px
    background-color $default-cell-background-color
    border 1px solid $default-border-color
    img
      width 100%
      transition: All 0.4s ease-in-out
      transform: scale(1.0)
      zoom: 1.0
    &:hover
      border 1px solid $default-border-hover-color
      img
        transform: scale(1.05)
        zoom: 1.02
    .text-wrapper
      padding 20px 20px 0 20px
      text-align left
      @media only screen and (max-width: 768px)
        padding 10px 10px 0 10px
      .title
        font-size 20px
        font-weight 100
        line-height 24px
        @media only screen and (max-width: 768px)
          font-size 17px
          line-height 23px
        word-wrap break-word
        a
          color $default-title-color
          cursor pointer
          &:hover
            color $default-title-hover-color
            text-decoration underline
        span.special
          border-radius $border-radius
          font-size 12px
          font-weight 100
          padding 3px 5px
          margin-left 1px
          vertical-align top
          color $default-background-color
          background $iview-secondary-warning-color
          cursor pointer
      .tags
        margin 8px 0
      .desc
        font-size 14px
        line-height 20px
        font-weight 200
        color $default-desc-color
        @media only screen and (max-width: 768px)
          font-size 13px
        a
          font-weight 500
          color $default-desc-hover-color
          cursor pointer
          &:hover
            text-decoration underline
      .operate_info
        font-size 14px
        margin 15px 0 20px
        span
          margin-right 8px
          a
            color $default-info-color
            cursor pointer
            &:hover
              color $default-info-hover-color
          + span
            margin-left 8px
        @media only screen and (max-width: 768px)
          font-size 13px
          margin 10px 0
          span
            margin-right 4px
            + span
              margin-left 4px
    .img-wrapper
      padding-bottom: 85%
      width 100%
      height 0
      overflow hidden
      &.big-image
        padding-bottom 26%
        box-shadow 1px 1px 1px $default-border-color

</style>
