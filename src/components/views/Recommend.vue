<template>
  <div class="recommend" v-if="recommends.length > 0">
    <panel :title="'推荐阅读'">
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
              <i-tag :color="tag.color" type="border" v-for="tag in articleSlice(0, 1)[0].tags" :key="tag.id" class="border-tag">{{
                tag.name }}
              </i-tag>
            </div>
            <p class="info">
              <span class="time"><a>{{ articleSlice(0, 1)[0].add_time | socialDate }}</a></span>
              <span class="likes"><a @click="likePost(articleSlice(0, 1)[0])"><i-icon
                type="heart"></i-icon> {{ articleSlice(0, 1)[0].like_num }} </a></span>
              <span class="comments"><a><i-icon type="compose"></i-icon> {{ articleSlice(0, 1)[0].comment_num }} </a></span>
              <span class="readings"><a><i-icon type="eye"></i-icon> {{ articleSlice(0, 1)[0].click_num }} </a></span>
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
  import {
    mapState,
    mapActions
  } from 'vuex';
  import Panel from '@/components/views/Panel';
  import API from 'API';
  import {checkPostAuth} from '@/common/js/utils';

  export default {
    name: 'recommend',
    asyncData({store}) {
      return Promise.all([
        store.dispatch('common/GET_RECOMMENDS')
      ]);
    },
    mounted() {
      if (!this.$store.state.common.recommends || this.$store.state.common.recommends.length === 0) {
        console.log('recommend');
        this['common/GET_RECOMMENDS']();
      }
    },
    computed: {
      ...mapState({
        recommends: state => state.common.recommends
      })
    },
    methods: {
      ...mapActions(['common/GET_RECOMMENDS']),
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
        return this.recommends.slice(start, end);
      }
    },
    components: {
      'panel': Panel
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  .recommend
    background $default-background-color
    .content
      padding 5px 20px
      border-left 1px solid $default-border-color
    .top, .others
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
          color $default-link-color
          &:hover
            text-decoration underline
            color $default-link-hover-color
      .info
        margin 5px 0 0
        span
          font-size 13px
          line-height 18px
          font-weight 100
          color $default-info-color
          + span
            float right
            margin-left 10px
        a
          display inline-block
          color: #777
          cursor pointer
          &:hover
            color $default-link-hover-color
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
        color $default-desc-color
        font-size 13px
        line-height 20px
        margin 5px 0 0
      &:hover
        img
          transition: All 0.4s ease-in-out
          transform: scale(1.05)
          zoom: 1.05
    .others
      li
        margin-top 10px
        padding-top 10px
        border-top 1px solid $default-border-color

</style>
