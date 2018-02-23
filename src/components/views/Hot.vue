<template>
  <div class="hot" v-if="articles.length > 0">
    <panel :title="'热门阅读'">
      <div slot="content" class="content">
        <div class="top">
          <a>
            <p class="title">
              <iv-tool-tip placement="right" :content="routerInfos(articleSlice(0, 1)[0]).message" v-if="articleSlice(0, 1)[0].browse_password_encrypt">
                <iv-icon type="android-lock" color="#FA5555" v-if="articleSlice(0, 1)[0].browse_password_encrypt"></iv-icon>
              </iv-tool-tip>
              <a @click="gotoPostDetail(articleSlice(0, 1)[0])">
                {{ articleSlice(0, 1)[0].title }}
              </a>
            </p>
            <div class="tags">
              <iv-tag :color="tag.color" type="border" v-for="tag in articleSlice(0, 1)[0].tags" :key="tag.id">
                {{ tag.name }}
              </iv-tag>
            </div>
            <p class="info">
              <span class="time">{{ articleSlice(0, 1)[0].add_time | socialDate}}</span>
              <span class="likes"><a @click="likePost(articleSlice(0, 1)[0])"><iv-icon
                type="heart"></iv-icon> {{ articleSlice(0, 1)[0].like_num }} </a></span>
              <span class="comments"><a><iv-icon type="compose"></iv-icon> {{ articleSlice(0, 1)[0].comment_num }} </a></span>
              <span class="readings"><a><iv-icon type="eye"></iv-icon> {{ articleSlice(0, 1)[0].click_num }} </a></span>
            </p>
            <div class="img" v-if="articleSlice(0, 1)[0].front_image">
              <img :src="articleSlice(0, 1)[0].front_image" :alt="articleSlice(0, 1)[0].title">
            </div>
            <p class="desc" v-if="articleSlice(0, 1)[0].desc">{{ articleSlice(0, 1)[0].desc | textLineBreak(60) }}</p>
          </a>
        </div>
        <ul class="others">
          <li v-for="article in articleSlice(1)">
            <a>
              <p class="title">
                <iv-tool-tip placement="right" :content="routerInfos(article).message" v-if="article.browse_password_encrypt">
                  <iv-icon type="android-lock" color="#FA5555" v-if="article.browse_password_encrypt"></iv-icon>
                </iv-tool-tip>
                <a @click="gotoPostDetail(article)">{{ article.title }}</a>
              </p>
              <p class="info">
                <span class="time">{{ article.add_time | socialDate }}</span>
                <span class="likes"><a @click="likePost(article)"><iv-icon type="heart"></iv-icon> {{ article.like_num}} </a></span>
                <span class="comments"><a><iv-icon type="compose"></iv-icon> {{ article.comment_num}} </a></span>
                <span class="readings"><a><iv-icon type="eye"></iv-icon> {{ article.click_num}} </a></span>
              </p>
            </a>
          </li>
        </ul>
      </div>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import Panel from '@/components/views/Panel';
  import {getPostBaseInfo, addPostLike} from '@/api/api';
  import {checkPostAuth} from '@/common/js/utils';

  export default {
    data() {
      return {
        articles: []
      };
    },
    created() {
      this.getDatas();
    },
    methods: {
      getDatas() {
        getPostBaseInfo({
          params: {
            is_hot: true,
            limit: 5,
            offset: 0
          }
        }).then((response) => {
          this.articles = response.data.results;
        }).catch((error) => {
          console.log(error);
        });
      },
      gotoPostDetail(post) {
        let routerInfos = this.routerInfos(post);
        checkPostAuth.call(this, post, '提示', routerInfos.message, () => {
          this.$router.push({name: routerInfos.name, params: routerInfos.params});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: routerInfos.name,
            params: routerInfos.params,
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, () => {
          this.$Notice.error({
            title: '密码错误'
          });
        });
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
      },
      routerInfos(post) {
        let router = {};
        router.name = post.post_type + '/detail';
        switch (post.post_type) {
          case 'article':
            router.message = '该文章为加密文章，您需要输入阅读密码';
            break;
          case 'album':
            router.message = '该图集为加密文章，您需要输入阅读密码';
            break;
          case 'movie':
            router.message = '该文章为加密文章，您需要输入阅读密码';
            break;
          default:
            router.message = '该文章为加密文章，您需要输入阅读密码';
        }
        router.params = {};
        router.params['id'] = post.id;
        return router;
      },
      articleSlice(start, end) {
        return this.articles.slice(start, end);
      }
    },
    components: {
      'panel': Panel
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl";

  .hot
    .content
      padding 5px 20px
      border-left 1px solid $color-border
    .top, .others
      a
        display block
        overflow hidden
        .tags
          margin-bottom 10px
        .title
          text-align justify
          font-size 16px
          line-height 23px
          margin-bottom 5px
          > a
            display inline
            color $color-gradually-gray-41
            &:hover
              text-decoration underline
              color $color-main-primary
        .info
          margin 5px 0 0px
          span
            font-size 13px
            line-height 18px
            font-weight 100
            color $color-secondary-info
            + span
              float right
              margin-left 10px
          a
            display inline-block
            color: #777
            cursor pointer
            &:hover
              color $color-main-primary
              text-decoration underline
        .img
          padding-bottom: 40%
          width: 100%
          height: 0
          margin 5px 0
          overflow hidden
          img
            width 100%
            transition: All 0.4s ease-in-out
            transform: scale(1.0)
            zoom: 1.0
        .desc
          text-align justify
          color $color-secondary-info
          font-size 13px
          line-height 20px
          margin 5px 0 0
        &:hover
          .title
            color $color-main-primary
          img
            transition: All 0.4s ease-in-out
            transform: scale(1.05)
            zoom: 1.05
    .others
      li
        margin-top 10px
        padding-top 10px
        border-top 1px solid $color-border

</style>
