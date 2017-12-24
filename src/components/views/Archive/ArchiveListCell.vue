<template>
  <div class="archive-list-cell">
    <p>
      <router-link :to="{ name: routerLink.name, params: routerLink.params }" target="_blank">
        <iv-tag>{{ post.add_time | formatDate}}</iv-tag>
        <span class="title">{{ post.title }}</span>
      </router-link>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  const POST_TYPE_ARTICLE = 'article';
  const POST_TYPE_ALBUM = 'album';
  const POST_TYPE_MOVIE = 'movie';

  export default {
    props: {
      post: {
        Type: Object
      }
    },
    computed: {
      routerLink() {
        let router = {};
        router.name = this.post.post_type + '/detail';
        router.params = {};
        router.params[this.post.post_type + 'Id'] = this.post.id;
        return router;
      },
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

<style lang="stylus" rel="stylesheet/stylus">
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
