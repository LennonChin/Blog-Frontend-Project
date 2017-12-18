<template>
  <div class="recommend" v-if="articles.length > 0">
    <panel :title="'推荐阅读'">
      <div slot="content" class="content">
        <div class="top">
          <router-link :to="{ name: 'article/detail', params:{ articleId: articleSlice(0, 1)[0].detail}}" target="_blank">
            <p class="title">{{ articleSlice(0, 1)[0].title }}</p>
            <div class="tags">
              <iv-tag color="blue" v-for="tag in articleSlice(0, 1)[0].tags" :key="tag.id">{{ tag.name }}</iv-tag>
            </div>
            <p class="info">
              <span class="time">{{ articleSlice(0, 1)[0].add_time }}</span>
              <span class="likes"><a href=""><iv-icon type="heart"></iv-icon> {{ articleSlice(0, 1)[0].like_num }} </a></span>
              <span class="comments"><a href=""><iv-icon type="compose"></iv-icon> {{ articleSlice(0, 1)[0].comment_num }} </a></span>
              <span class="readings"><a href=""><iv-icon type="eye"></iv-icon> {{ articleSlice(0, 1)[0].click_num }} </a></span>
            </p>
            <div class="img">
              <img :src="articleSlice(0, 1)[0].front_image" :alt="articleSlice(0, 1)[0].title">
            </div>
            <p class="desc">{{ articleSlice(0, 1)[0].desc }}</p>
          </router-link>
        </div>
        <ul class="others">
          <li v-for="article in articleSlice(1)">
            <router-link :to="{ name: 'article/detail', params:{ articleId: article.detail}}" target="_blank">
              <p class="title">{{ article.title }}</p>
              <p class="info">
                <span class="time">{{ article.add_time }}</span>
                <span class="likes"><a href=""><iv-icon type="heart"></iv-icon> {{ article.like_num}} </a></span>
                <span class="comments"><a href=""><iv-icon type="compose"></iv-icon> {{ article.comment_num}} </a></span>
                <span class="readings"><a href=""><iv-icon type="eye"></iv-icon> {{ article.click_num}} </a></span>
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import Panel from '@/components/utils/Panel';
  import { getArticleBaseInfo } from '@/api/api';

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
        getArticleBaseInfo({
          params: {
            is_recommend: true,
            page_size: 5
          }
        }).then((response) => {
          this.articles = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });
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

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/index.styl";

  .recommend
    .content
      padding 5px 20px
    .top, .others
      a
        display block
        overflow hidden
        .tags
          margin-bottom 10px
        .title
          text-align justify
          color $color-gradually-gray-41
          font-size 16px
          line-height 23px
          margin-bottom 5px
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
