<template>
  <div class="topic-card" v-if="album != undefined">
    <a>
      <div class="top-area">
        <a>
          <img :src="album.front_image" alt="">
        </a>
      </div>
      <div class="bottom-area">
        <h4 class="title">
          <i-tool-tip placement="right" :content="$t('album.authTip')" v-if="album.need_auth">
            <i-icon type="android-lock" color="#FA5555" v-if="album.need_auth"></i-icon>
          </i-tool-tip>
          <a :title="album.title" @click.prevent="gotoPostDetail(album)" :href="`${album.post_type}/${album.id}`">{{ album.title | textLineBreak(11) }}</a>
        </h4>
        <p class="info"><span class="author"><a>By / {{ album.author }}</a></span></p>
        <p class="info"><span class="publish-time"><a>At time / {{ album.add_time | socialDate }}</a></span></p>
        <p class="operate_info">
          <span class="readings"><a> {{ album.click_num }} {{ $t('album.read') }}</a></span> |
          <span class="comments"><a> {{ album.comment_num }} {{ $t('album.comments') }}</a></span> |
          <span class="likes"><a @click="likePost(album)"> {{ album.like_num }} {{ $t('album.likes') }}</a></span></p>
      </div>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from 'API';
  import {checkPostAuth, mixin} from '@/common/js/utils';

  export default {
    name: 'topic-card',
    mixins: [mixin],
    props: {
      album: {
        Type: Object
      }
    },
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该图集已加密，您需要输入访问密码', () => {
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

  .topic-card
    margin-bottom 10px
    background-color white
    > a
      cursor default
      display block
      border 1px solid $default-border-color
      &:hover
        border 1px solid $default-border-hover-color
        box-shadow 1px 1px 1px $default-box-shadow-color
      .top-area
        padding-bottom: 100%
        width: 100%
        height: 0
        overflow hidden
        a
          cursor default
          display: block
          width: 100%
          img
            width 100%
            transition: All 0.4s ease-in-out
            transform: scale(1.0)
            zoom: 1.0
        &:hover
          img
            transition: All 0.4s ease-in-out
            transform: scale(1.05)
            zoom: 1.05
      .bottom-area
        text-align left
        padding 20px 18px 18px 20px
        .title
          font-size 18px
          margin-bottom 10px
          a
            color $default-title-color
            &:hover
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
