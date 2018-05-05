<template>
  <div class="hot" v-if="articles.length > 0">
    <panel :title="'热门阅读'">
      <div slot="content" class="content">
        <div class="top">
          <a>
            <p class="title">
              <i-tool-tip placement="right" :content="routerInfos(articleSlice(0, 1)[0]).message" v-if="articleSlice(0, 1)[0].browse_password_encrypt">
                <i-icon type="android-lock" color="#FA5555" v-if="articleSlice(0, 1)[0].browse_password_encrypt"></i-icon>
              </i-tool-tip>
              <a @click="gotoPostDetail(articleSlice(0, 1)[0])">
                {{ articleSlice(0, 1)[0].title }}
              </a>
            </p>
            <div class="tags">
              <i-tag :color="tag.color" type="border" v-for="tag in articleSlice(0, 1)[0].tags" :key="tag.id">
                {{ tag.name }}
              </i-tag>
            </div>
            <p class="info">
              <span class="time">{{ articleSlice(0, 1)[0].add_time | socialDate}}</span>
              <span class="likes"><a @click="likePost(articleSlice(0, 1)[0])"><i-icon
                type="heart"></i-icon> {{ articleSlice(0, 1)[0].like_num }} </a></span>
              <span class="comments"><a><i-icon type="compose"></i-icon> {{ articleSlice(0, 1)[0].comment_num }} </a></span>
              <span class="readings"><a><i-icon type="eye"></i-icon> {{ articleSlice(0, 1)[0].click_num }} </a></span>
            </p>
            <div class="img" v-if="articleSlice(0, 1)[0].front_image">
              <img :src="articleSlice(0, 1)[0].front_image" :alt="articleSlice(0, 1)[0].title" v-if="articleSlice(0, 1)[0].front_image_type !== 0">
            </div>
            <p class="desc" v-if="articleSlice(0, 1)[0].desc">{{ articleSlice(0, 1)[0].desc | textLineBreak(60) }}</p>
          </a>
        </div>
        <ul class="others">
          <li v-for="article in articleSlice(1)">
            <a>
              <p class="title">
                <i-tool-tip placement="right" :content="routerInfos(article).message" v-if="article.browse_password_encrypt">
                  <i-icon type="android-lock" color="#FA5555" v-if="article.browse_password_encrypt"></i-icon>
                </i-tool-tip>
                <a @click="gotoPostDetail(article)">{{ article.title }}</a>
              </p>
              <p class="info">
                <span class="time">{{ article.add_time | socialDate }}</span>
                <span class="likes"><a @click="likePost(article)"><i-icon type="heart"></i-icon> {{ article.like_num}} </a></span>
                <span class="comments"><a><i-icon type="compose"></i-icon> {{ article.comment_num}} </a></span>
                <span class="readings"><a><i-icon type="eye"></i-icon> {{ article.click_num}} </a></span>
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
  import API from 'API';
  import {checkPostAuth} from '@/common/js/utils';

  export default {
    name: 'hot',
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
        API.getPostBaseInfo({
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
      },
      routerInfos(post) {
        let router = {};
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
          padding-bottom: 30%
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
