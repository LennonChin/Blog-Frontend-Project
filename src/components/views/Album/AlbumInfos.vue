<template>
  <div class="album-infos">
    <p class="operate_info">
      <span class="readings"><a><i-icon type="eye"></i-icon> {{ album.click_num }} 阅读</a></span>
      <span class="comments"><a><i-icon type="compose"></i-icon> {{ album.comment_num }} 评论</a></span>
      <span class="likes"><a @click="likePost(album)"><i-icon type="heart"></i-icon> {{ album.like_num }} 喜欢</a></span>
    </p>
    <div class="author">
      <a href="">
        <img src="../../../assets/logo-small.png" alt="">
        <div class="right">
          <p class="name">{{ album.author }}</p>
          <p class="time">{{ album.add_time | socialDate }}</p>
        </div>
      </a>
    </div>
    <div class="infos">
      <p class="title">{{ album.title }}</p>
      <p class="desc">{{ album.desc }}</p>
      <p class="tags">
        <span class="tag" v-for="tag in album.tags" :key="tag.id"><a href=""><span :class="tag.color"># </span>{{ tag.name }}</a></span>
      </p>
    </div>
    <div class="picture" v-if="currentPicture != undefined">
      <p class="title">{{ currentPicture.title }}</p>
      <p class="desc">{{ currentPicture.desc }}</p>
      <p class="device">{{ currentPicture.camera.device }}</p>
      <p class="version">{{ currentPicture.camera.version }}</p>
      <p class="environment">{{ currentPicture.camera.environment }}</p>
    </div>
    <div class="social">
      <social-section :theme="'dark-theme'" :article="album"></social-section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import LicenseTag from '@/components/views/LicenseTag';
  import SocialSection from '@/components/views/Comment/SocialSection';
  import API from 'API';
  // mixin
  import {mixin} from '@/common/js/utils';

  export default {
    name: 'album-infos',
    props: {
      album: {
        Type: Object,
        default: undefined
      }
    },
    mixins: [mixin],
    data() {
      return {
        currentPicture: undefined
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      selectPicture(index) {
        if (index < this.album.pictures.length) {
          this.currentPicture = this.album.pictures[index];
        }
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
    },
    components: {
      'license-tag': LicenseTag,
      'social-section': SocialSection
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .album-infos
    width 100%
    @media only screen and (max-width: 768px)
      height inherit
      overflow-y visible
      border-left none
    @media screen and (min-width: 768px)
      height inherit
      overflow-y visible
      border-left none
    @media screen and (min-width: 992px)
      height 100vh
      overflow-y auto
      border-left 1px solid $color-gradually-gray-21
    @media screen and (min-width: 1200px)
      height 100vh
      overflow-y auto
      border-left 1px solid $color-gradually-gray-21
    .operate_info
      height 60px
      line-height 60px
      font-size 15px
      span
        display inline-block
        width 32%
        text-align center
        a
          color $color-gradually-gray-91
          &:hover
            color $iview-secondary-warning-color
    .author
      padding 10px 20px 20px
      border-bottom 1px solid $color-gradually-gray-21
      a
        display flex
        &:hover
          .link
            color $dark
        img
          flex 0 0 50px
          width 50px
          height 50px
          margin 5px 0
        .right
          display flex
          flex-direction column
          padding-left 12px
          height 60px
          line-height 60px
          p
            flex 1
            text-align left
            color $color-gradually-gray-91
            &.name
              height 35px
              line-height 42px
              font-size 17px
            &.time
              height 15px
              line-height 20px
              font-weight 100
    .infos
      padding 20px 20px 20px
      border-bottom 1px solid $color-gradually-gray-21
      .title
        font-size 20px
        line-height 25px
        font-weight 700
        margin-bottom 10px
        color $color-gradually-gray-91
      .desc
        font-size 16px
        line-height 23px
        font-weight 500
        margin-bottom 10px
        color $color-gradually-gray-91
      .tags
        line-height 25px
        span
          font-size 14px
          font-weight 100
          &.tag
            margin-right 8px
            a
              color $color-gradually-gray-91
              &:hover
                color $iview-secondary-warning-color
          &.yellow
            color $iview-secondary-warning-color
    .picture
      padding 20px
      border-bottom 1px solid $color-gradually-gray-21
      .title
        font-size 18px
        line-height 22px
        font-weight 700
        margin-bottom 10px
        color $color-gradually-gray-71
      .desc
        font-size 14px
        line-height 20px
        font-weight 500
        margin-bottom 10px
        color $color-gradually-gray-71
      .device
        font-size 15px
        line-height 22px
        color $color-gradually-gray-81
      .version, .environment
        font-size 14px
        line-height 22px
        color $color-gradually-gray-61

    .social
      padding 0 20px 20px
      @media only screen and (max-width: 768px)
        padding 0 5px 20px
      @media screen and (min-width: 768px)
        padding 0 10px 20px
      @media screen and (min-width: 992px)
        padding 0 15px 20px
      @media screen and (min-width: 1200px)
        padding 0 20px 20px
</style>
