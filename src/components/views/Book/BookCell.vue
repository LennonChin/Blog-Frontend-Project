<template>
  <div class="book-cell">
    <a>
      <i-row type="flex">
        <i-col :xs="24" :sm="24" :md="textSpan" :lg="textSpan" :order="textOrderType"
                style="padding-left: 0;padding-right: 0;">
          <div class="text-wrapper">
            <h4 class="title">
              <i-tool-tip placement="right" content="该文章已图集，您需要输入阅读密码" v-if="book.browse_password_encrypt">
                <i-icon type="android-lock" color="#FA5555" v-if="book.browse_password_encrypt"></i-icon>
              </i-tool-tip>
              <a @click="gotoPostDetail(book)">{{book.title}}</a>
            </h4>
            <div class="tags">
              <i-tag :color="tag.color" type="border" v-for="tag in book.tags" :key="tag.id">{{ tag.name }}</i-tag>
            </div>
            <p class="desc">{{book.desc | textLineBreak(70) }}
              <a @click="gotoPostDetail(book)"> View More
                <i-icon type="arrow-right-b"></i-icon>
              </a>
            </p>
            <p class="operate_info">
              <span class="publish-time"><a>{{ book.add_time | socialDate }}</a></span>
              <span class="readings"><a><i-icon type="eye"></i-icon> {{book.click_num}} 阅</a></span>
              <span class="comments"><a><i-icon type="compose"></i-icon> {{book.comment_num}} 评</a></span>
              <span class="likes"><a @click="likePost(book)"><i-icon type="heart"></i-icon> {{book.like_num}} 赞</a></span>
            </p>
          </div>
        </i-col>
        <i-col :xs="0" :sm="0" :md="imgSpan" :lg="imgSpan" :order="imgOrderType"
                style="padding-left: 0;padding-right: 0">
          <div class="img-wrapper" :class="themeClass">
            <img :src="book.front_image" alt="">
          </div>
        </i-col>
      </i-row>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@/api/client-api';
  import {checkPostAuth} from '@/common/js/utils';

  const ARTICLE_TYPE_NO_IMAGE = 0;
  const ARTICLE_TYPE_NORMAL_IMAGE = 1;
  const ARTICLE_TYPE_BIG_IMAGE = 2;

  export default {
    name: 'book-cell',
    props: {
      book: {
        Type: Object
      }
    },
    computed: {
      textOrderType: function () {
        return parseInt(this.book.front_image_type) === ARTICLE_TYPE_BIG_IMAGE ? 2 : 1;
      },
      imgOrderType: function () {
        return parseInt(this.book.front_image_type) === ARTICLE_TYPE_BIG_IMAGE ? 1 : 2;
      },
      textSpan: function () {
        switch (parseInt(this.book.front_image_type)) {
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
        switch (parseInt(this.book.front_image_type)) {
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
        if (parseInt(this.book.front_image_type) === ARTICLE_TYPE_BIG_IMAGE) {
          return 'big-image';
        } else {
          return '';
        }
      }
    },
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该文章已加密，您需要输入阅读密码', () => {
          this.$router.push({name: post.post_type, params: {id: post.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: post.post_type,
            params: {id: post.id},
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, () => {
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
  @import "../../../common/stylus/base.styl";
  @import "../../../common/stylus/index.styl";

  .book-cell
    margin-bottom 15px
    background-color white
    > a
      display block
      cursor default
      border 1px solid $color-border
      img
        width 100%
        transition: All 0.4s ease-in-out
        transform: scale(1.0)
        zoom: 1.0
      &:hover
        border 1px solid $color-border-hover
        box-shadow 1px 1px 1px $color-border
        img
          transform: scale(1.05)
          zoom: 1.02
      .text-wrapper
        padding 20px 20px 0 20px
        text-align left
        @media only screen and (max-width: 768px)
          padding 10px 10px 0 10px
        .title
          font-size 23px
          font-weight 100
          line-height 27px
          word-wrap break-word
          @media only screen and (max-width: 768px)
            font-size 18px
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
        .tags
          margin: 8px 0
        .desc
          color $color-typegraphy-subtitle
          font-size 14px
          line-height 20px
          font-weight 200
          @media only screen and (max-width: 768px)
            font-size 12px
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
              color $color-typegraphy-subtitle
              cursor pointer
              &:hover
                color $color-main-primary
      .img-wrapper
        padding-bottom: 85%
        width: 100%
        height: 0
        overflow hidden
        &.big-image
          padding-bottom 26%
</style>
