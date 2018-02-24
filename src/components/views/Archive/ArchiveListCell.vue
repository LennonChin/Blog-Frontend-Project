<template>
  <div class="archive-list-cell">
    <p>
      <a @click="gotoPostDetail(post)">
        <iv-tag>{{ post.add_time | formatDate}}</iv-tag>
        <span class="title">
          <iv-tool-tip placement="right" :content="routerInfos(post).message" v-if="post.browse_password_encrypt">
            <iv-icon type="android-lock" color="#FA5555" v-if="post.browse_password_encrypt"></iv-icon>
          </iv-tool-tip>
          {{ post.title }}
        </span>
      </a>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import {checkPostAuth} from '@/common/js/utils';

  const POST_TYPE_ARTICLE = 'article';
  const POST_TYPE_ALBUM = 'album';
  const POST_TYPE_MOVIE = 'movie';

  export default {
    props: {
      post: {
        Type: Object
      }
    },
    methods: {
      gotoPostDetail(post) {
        let routerInfos = this.routerInfos(post);
        checkPostAuth.call(this, post, '提示', routerInfos.message, () => {
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
      routerInfos(post) {
        let router = {};
        switch (post.post_type) {
          case 'article':
            router.message = '该文章已图集，您需要输入阅读密码';
            break;
          case 'album':
            router.message = '该图集已加密，您需要输入阅读密码';
            break;
          case 'movie':
            router.message = '该文章已图集，您需要输入阅读密码';
            break;
          default:
            router.message = '该文章已图集，您需要输入阅读密码';
        }
        return router;
      }
    },
    computed: {
      typeTag() {
        switch (this.post.postType) {
          case POST_TYPE_ARTICLE:
            return '';
          case POST_TYPE_ALBUM:
            return '';
          case POST_TYPE_MOVIE:
            return '';
        }
      }
    },
    filters: {
      formatDate: function (date) {
        var formatedDate = new Date(date);
        return formatedDate.getFullYear() + '-' + (formatedDate.getMonth() + 1) + '-' + formatedDate.getDate();
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl"

  .archive-list-cell
    position relative
    padding 5px 0
    &::after
      content ''
      position absolute
      min-height 25px
      top 0
      bottom 0
      left 17px
      width 4px
      background-color: $color-main-primary
    p
      font-size 17px
      line-height 25px
      margin-left 45px
      @media only screen and (max-width: 720px)
        font-size 13px
      a
        color $color-typegraphy-title
        &:hover
          color $color-typegraphy-title-hover
        .title
          margin-left 5px
          font-weight 100
</style>
