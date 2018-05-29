<template>
  <div class="thumb-card" v-if="album != undefined">
    <a>
      <div class="top-area">
        <a>
          <p class="desc">{{ album.desc }}</p>
          <div class="background"></div>
          <img :src="album.front_image" alt="">
          <img :src="album.front_image" alt="">
          <img :src="album.front_image" alt="">
        </a>
      </div>
      <div class="bottom-area">
        <h4 class="title">
          <i-tool-tip placement="right" content="该图集已图集，您需要输入阅读密码" v-if="album.browse_password_encrypt">
            <i-icon type="android-lock" color="#FA5555" v-if="album.browse_password_encrypt"></i-icon>
          </i-tool-tip>
          <a @click.prevent="gotoPostDetail(album)" :href="`${album.post_type}/${album.id}`">
            {{ album.title }}
          </a>
        </h4>
        <p class="info"><span class="author"><a>By / {{ album.author }}</a></span></p>
        <p class="info"><span class="publish-time"><a>At time / {{ album.add_time | socialDate}}</a></span></p>
        <p class="operate_info">
          <span class="readings"><a> {{ album.click_num}}次阅读</a></span> |
          <span class="comments"><a> {{ album.comment_num}}个评论</a></span> |
          <span class="likes"><a @click="likePost(album)"> {{ album.like_num }}个喜欢</a></span></p>
      </div>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from 'API';
  import {checkPostAuth, mixin} from '@/common/js/utils';

  export default {
    name: 'thumb-card',
    mixins: [mixin],
    props: {
      album: {
        Type: Object
      }
    },
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该图集已加密，您需要输入阅读密码', () => {
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

  .thumb-card
    margin 0 20px 40px 20px
    background-color white
    > a
      display block
      cursor default
      .top-area
        padding-bottom: 110%
        width: 100%
        height: 0
        overflow hidden
        a
          position relative
          display: block
          width: 100%
          padding-bottom: 110%
          cursor default
          .desc, .background
            position absolute
            opacity 0.0
            transition: All 0.5s ease-in-out
          .desc
            width: 60%
            margin 0 20%
            text-align center
            font-size 22px
            font-weight 200
            line-height 35px
            color #fff
            padding-top: 42%
            z-index 11
          .background
            width: 100%
            border-radius 20px
            padding-top: 100%
            z-index 10
          img
            display block
            position absolute
            border-radius 20px
            box-shadow 0 10px 10px 0 rgba(0, 0, 0, 0.15)
            width 100%
            zoom: 1.0
            z-index 9
            + img
              margin-top 8%
              z-index 8
              transition: All 0.4s ease-in-out
              transform: scale(0.9) rotate(90deg)
              zoom: 0.9
              + img
                margin-top 16%
                box-shadow none
                z-index 7
                transition: All 0.4s ease-in-out
                transform: scale(0.8) rotate(270deg)
                zoom: 0.8
        &:hover
          .background, .desc
            opacity 1.0
            transition: All 0.5s ease-in-out
          .background
            background-color rgba(33, 33, 33, 0.4)
          img
            transition: All 0.4s ease-in-out
            + img
              transform translate(0, 8px) scale(0.9) rotate(90deg)
              + img
                transform translate(0, 15px) scale(0.8) rotate(270deg)
      .bottom-area
        position relative
        text-align center
        padding 15px 18px 18px 20px
        z-index 6
        .title
          vertical-align middle
          font-size 18px
          line-height 25px
          height 60px
          a
            color $default-title-color
            &:hover
              text-decoration underline
              color $default-title-hover-color
        .info
          margin-bottom 10px
          font-size 14px
          font-weight 200
          a
            color $default-info-color
            cursor pointer
            &:hover
              color $default-info-hover-color
        .operate_info
          font-size 14px
          margin-top 15px
          span
            margin-right 5px
            + span
              margin-left 5px
            a
              color $default-desc-color
              cursor pointer
              &:hover
                color $default-desc-hover-color
</style>
