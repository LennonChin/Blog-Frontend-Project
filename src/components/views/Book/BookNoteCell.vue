<template>
  <div class="book-note-cell">
    <i-row type="flex">
      <i-col :xs="24" :sm="24" :md="textSpan" :lg="textSpan" :order="textOrderType"
             style="padding-left: 0;padding-right: 0;">
        <div class="text-wrapper">
          <h4 class="title">
            <i-tool-tip placement="right" :content="$t('bookNote.authTip')" v-if="bookNote.need_auth">
              <i-icon type="android-lock" color="#FA5555" v-if="bookNote.need_auth"></i-icon>
            </i-tool-tip>
            <a @click.prevent="gotoPostDetail(bookNote)" :href="`${bookNote.post_type}/${bookNote.id}`"> {{bookNote[resolveI18N('title')]}}</a>
            <span class="special" v-if="bookNote.index > 0" :title="$t('others.stickyTip')">{{ $t('others.sticky') }}</span>
          </h4>
          <p class="book-info">
            <i-icon type="ios-book"></i-icon>&nbsp;&nbsp;{{bookNote.book[resolveI18N('title')]}}&nbsp;
            <i-icon type="paintbrush"></i-icon>&nbsp;&nbsp;{{bookNote.book.book_author }}
          </p>
          <p class="book-info">
            <i-icon type="document-text"></i-icon>&nbsp;&nbsp;Chapter：{{bookNote.chapter | textLineBreak(70) }}
          </p>
          <div class="tags">
            <i-tag :color="tag.color" type="border" v-for="tag in bookNote.tags" :key="tag.id" class="border-tag">{{ tag.name }}</i-tag>
          </div>
          <p class="desc">{{ bookNote[resolveI18N('desc')] | textLineBreak(70) }}
            <a @click.prevent="gotoPostDetail(bookNote)" :href="`${bookNote.post_type}/${bookNote.id}`"> View More
              <i-icon type="arrow-right-b"></i-icon>
            </a>
          </p>
          <p class="operate_info">
            <span class="publish-time"><a>{{ bookNote.add_time | socialDate }}</a></span>
            <span class="readings"><a><i-icon type="eye"></i-icon> {{bookNote.click_num}} {{ $t('bookNote.read') }}</a></span>
            <span class="comments"><a><i-icon type="compose"></i-icon> {{bookNote.comment_num}} {{ $t('bookNote.comments') }}</a></span>
            <span class="likes"><a @click="likePost(book)"><i-icon type="heart"></i-icon> {{bookNote.like_num}} {{ $t('bookNote.likes') }}</a></span>
          </p>
        </div>
      </i-col>
      <i-col :xs="0" :sm="0" :md="imgSpan" :lg="imgSpan" :order="imgOrderType"
             style="padding-left: 0px;padding-right: 0px">
        <div class="img-wrapper" :class="themeClass">
          <img :src="bookNote.front_image" alt="">
        </div>
      </i-col>
    </i-row>
    <a class="toggle-arrow" @click="toggleBookInfo" :class="{show: showBookInfo}">
      {{ this.showBookInfo ? $t('bookNote.HideBookInfo', {'0': bookNote.book.book_name}) : $t('bookNote.showBookInfo', {'0': bookNote.book.book_name}) }} &nbsp;<i-icon type="chevron-up" :class="{show: showBookInfo}"></i-icon>
    </a>
    <div class="book-infos" :class="{show: showBookInfo}" @click.prevent="gotoPostDetail(bookNote.book)" :href="`${bookNote.book.post_type}/${bookNote.book.id}`">
      <div class="book-infos-wrapper">
        <div class="img">
          <div class="container">
            <div class="bracket"></div>
            <div class="target">
              <img :src="bookNote.book.book_image" alt="">
            </div>
          </div>
        </div>
        <div class="book-info">
          <p class="title">
            <i-tool-tip placement="right" :content="$t('book.authTip')" v-if="false">
              <i-icon type="android-lock" color="#FA5555" v-if="false"></i-icon>
            </i-tool-tip>
            《{{ bookNote.book[resolveI18N('title')] }}》
          </p>
          <p class="desc"><span>{{ $t('book.author') }}：</span>{{ bookNote.book.book_author }}</p>
          <i-progress :percent="bookNote.book.read_precentage" :stroke-width="6">
            <i-icon type="checkmark-circled"></i-icon>
            <span class="progress">{{bookNote.book.read_precentage}}%</span>
          </i-progress>
          <p class="desc">{{ bookNote.book[resolveI18N('desc')] | textLineBreak(140) }}</p>
          <i-tag type="border" v-for="tag in bookTags" :key="tag.name" class="border-tag">{{ tag.name }}</i-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from 'API';
  import {checkPostAuth, mixin} from '@/common/js/utils';

  const ARTICLE_TYPE_NO_IMAGE = 0;
  const ARTICLE_TYPE_NORMAL_IMAGE = 1;
  const ARTICLE_TYPE_BIG_IMAGE = 2;

  export default {
    name: 'book-note-cell',
    props: {
      bookNote: {
        Type: Object
      }
    },
    mixins: [mixin],
    data() {
      return {
        showBookInfo: false
      };
    },
    computed: {
      textOrderType: function () {
        return parseInt(this.bookNote.front_image_type) === ARTICLE_TYPE_BIG_IMAGE ? 2 : 1;
      },
      imgOrderType: function () {
        return parseInt(this.bookNote.front_image_type) === ARTICLE_TYPE_BIG_IMAGE ? 1 : 2;
      },
      textSpan: function () {
        switch (parseInt(this.bookNote.front_image_type)) {
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
        switch (parseInt(this.bookNote.front_image_type)) {
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
        if (parseInt(this.bookNote.front_image_type) === ARTICLE_TYPE_BIG_IMAGE) {
          return 'big-image';
        } else {
          return '';
        }
      },
      bookTags: function () {
        return this.bookNote.book.book_tags.split('，').map((tagName) => { return {name: tagName}; });
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
        }, (error) => {
          console.log(error);
          this.$Notice.error({
            title: '密码错误'
          });
        });
      },
      toggleBookInfo() {
        this.showBookInfo = !this.showBookInfo;
        console.log(this.showBookInfo);
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

  .book-note-cell
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
        font-size 23px
        font-weight 100
        line-height 27px
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
      .book-info
        font-size 14px
        font-weight 300
        margin-top 8px
        color $default-info-color
        word-wrap break-word
        > i
          font-size 14px
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
    .toggle-arrow
      display block
      text-align center
      padding 10px 0
      background-color $default-cell-toggle-background-color
      &:hover
        color $default-info-hover-color
      > i
        transition: All 0.4s ease-in-out
        transform rotateX(180deg)
        &.show
          transform rotateX(0deg)
    .book-infos
      max-height 0
      transition All 0.5s ease-in-out
      overflow hidden
      cursor pointer
      &.show
        max-height 350px
      .book-infos-wrapper
        display flex
        padding 20px
        @media only screen and (max-width: 768px)
          padding 10px
        .img
          position relative
          display block
          flex 0 0 140px
          width 140px
          overflow hidden
          margin-right 20px
          border 1px solid $default-border-color
          box-shadow 1px 1px 1px $default-border-color
          @media only screen and (max-width: 768px)
            display none
            flex 0 0 0
            width 0
          .container
            width 100%
            position relative
            overflow hidden
            .bracket
              margin-top 135%
            .target
              position absolute
              top 0
              bottom 0
              left 0
              right 0
              > img
                width 100%
                height 100%
                transition: All 0.4s ease-in-out
                transform: scale(1.0)
                zoom: 1.0
        .book-info
          flex-grow 1
          .title
            font-size 20px
            line-height 28px
            font-weight 500
            color $default-title-color
            margin-bottom 5px
            text-align justify
          .desc
            font-size 13px
            font-weight 100
            line-height 20px
            color $default-desc-color
            text-align justify
            margin 10px 0 5px
</style>
