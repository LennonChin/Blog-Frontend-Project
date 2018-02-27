<template>
  <div class="book-note-cell">
    <a>
      <iv-row type="flex">
        <iv-col :xs="24" :sm="24" :md="textSpan" :lg="textSpan" :order="textOrderType"
                style="padding-left: 0;padding-right: 0;">
          <div class="text-wrapper">
            <h4 class="title">
              <iv-tool-tip placement="right" content="该文章已图集，您需要输入阅读密码" v-if="bookNote.browse_password_encrypt">
                <iv-icon type="android-lock" color="#FA5555" v-if="bookNote.browse_password_encrypt"></iv-icon>
              </iv-tool-tip>
              <a @click="gotoPostDetail(bookNote)"> {{bookNote.title}}</a>
            </h4>
            <p class="book-info">
              &nbsp;<iv-icon type="ios-book"></iv-icon>&nbsp;Book：《{{bookNote.book.book_name }}》 &nbsp;&nbsp;&nbsp;
              <iv-icon type="document-text"></iv-icon>&nbsp;Chapter：{{bookNote.abstract | textLineBreak(70) }}</p>
            <div class="tags">
              <iv-tag :color="tag.color" type="border" v-for="tag in bookNote.tags" :key="tag.id">{{ tag.name }}</iv-tag>
            </div>
            <p class="desc">{{bookNote.abstract | textLineBreak(70) }}
              <a @click="gotoPostDetail(bookNote)"> View More
                <iv-icon type="arrow-right-b"></iv-icon>
              </a>
            </p>
            <p class="operate_info">
              <span class="publish-time"><a>{{ bookNote.add_time | socialDate }}</a></span>
              <span class="readings"><a><iv-icon type="eye"></iv-icon> {{bookNote.click_num}} 阅</a></span>
              <span class="comments"><a><iv-icon type="compose"></iv-icon> {{bookNote.comment_num}} 评</a></span>
              <span class="likes"><a @click="likePost(book)"><iv-icon type="heart"></iv-icon> {{bookNote.like_num}} 赞</a></span>
            </p>
          </div>
        </iv-col>
        <iv-col :xs="0" :sm="0" :md="imgSpan" :lg="imgSpan" :order="imgOrderType"
                style="padding-left: 0px;padding-right: 0px"
                v-if="responsiveRender(false, false, imgSpan !== 0, imgSpan !== 0)">
          <div class="img-wrapper" :class="themeClass">
            <img :src="bookNote.front_image" alt="">
          </div>
        </iv-col>
      </iv-row>
      <a class="toggle-arrow" @click="toggleBookInfo" :class="{show: showBookInfo}">
        {{ this.showBookInfo ? '隐藏书籍信息' : '查看书籍信息' }}：《{{ bookNote.book.book_name }}》 &nbsp;<iv-icon type="chevron-up" :class="{show: showBookInfo}"></iv-icon>
      </a>
      <a class="book-infos" :class="{show: showBookInfo}" @click="gotoPostDetail(bookNote.book)">
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
            <iv-tool-tip placement="right" content="该文章已加密，您需要输入阅读密码" v-if="false">
              <iv-icon type="android-lock" color="#FA5555" v-if="false"></iv-icon>
            </iv-tool-tip>
            {{ bookNote.book.book_name }}
          </p>
          <p class="desc"><span>作者：</span>{{ bookNote.book.book_author }}</p>
          <iv-progress :percent="20" :stroke-width="6">
            <iv-icon type="checkmark-circled"></iv-icon>
            <span>20%</span>
          </iv-progress>
          <p class="desc">{{ bookNote.book.desc | textLineBreak(140) }}</p>
          <iv-tag type="border" v-for="tag in bookTags" :key="tag.name">{{ tag.name }}</iv-tag>
        </div>
      </a>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addPostLike} from '@/api/api';
  import {checkPostAuth} from '@/common/js/utils';

  const ARTICLE_TYPE_NO_IMAGE = 0;
  const ARTICLE_TYPE_NORMAL_IMAGE = 1;
  const ARTICLE_TYPE_BIG_IMAGE = 2;

  export default {
    props: {
      bookNote: {
        Type: Object
      }
    },
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
        }, () => {
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
        addPostLike({
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

  .book-note-cell
    margin-bottom 15px
    background-color white
    > a
      display block
      cursor default
      border 1px solid $color-border
      &:hover
        border 1px solid $color-border-hover
        box-shadow 1px 1px 1px $color-border
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
        .book-info
          font-size 14px
          font-weight 300
          margin-top 8px
          color $color-typegraphy-subtitle
          word-wrap break-word
          > i
            font-size 14px
        .tags
          margin 8px 0
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
        img
          width 100%
      .toggle-arrow
        display block
        text-align center
        background-color rgba(240, 240, 240, 0.3)
        padding 5px 0
        > i
          transition: All 0.4s ease-in-out
          transform rotateZ(180deg)
          &.show
            transform rotateZ(0deg)
      .book-infos
        display flex
        padding 0 20px
        overflow hidden
        max-height 0
        transition All 0.5s ease-in-out
        &.show
          max-height 250px
        .img
          position relative
          flex 0 0 140px
          width 140px
          overflow hidden
          margin 20px 30px 20px 0
          border 1px solid $color-border-hover
          box-shadow 1px 1px 1px $color-border
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
          padding-top 20px
          .title
            font-size 20px
            line-height 28px
            font-weight 500
            color $color-typegraphy-title
            margin-bottom 5px
            text-align justify
          .desc
            font-size 13px
            font-weight 100
            line-height 20px
            color $color-gradually-gray-61
            text-align justify
            margin 10px 0 5px
            > span
              color $color-gradually-gray-41
              font-weight 300
</style>
