<template>
  <div class="article-list-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <article-list-header @selectCategory="selectCategory"></article-list-header>
          <article-list-cell v-for="article in articles" :article="article" :key="article.title"></article-list-cell>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend></recommend>
          <tag-wall style="margin-top: 15px;"></tag-wall>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import ArticleListHeader from '@/components/views/Article/ArticleListHeader';
  import ArticlePageContent from '@/components/views/Article/ArticlePageContent';
  import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter';
  import ArticleListCell from '@/components/views/Article/ArticleListCell';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';

  // API
  import { getArticleBaseInfo } from '@/api/api';

  export default {
    data() {
      return {
        selectedCategory: undefined,
        articles: []
      };
    },
    created() {
      this.getDatas();
    },
    methods: {
      selectCategory(categoryId) {
        this.selectedCategory = categoryId;
      },
      getDatas() {
        getArticleBaseInfo({
          params: {
            top_category: this.selectedCategory,
            is_recommend: false
          }
        }).then((response) => {
          this.articles = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    watch: {
      selectedCategory: function () {
        this.getDatas();
      }
    },
    components: {
      'article-list-header': ArticleListHeader,
      'article-page-content': ArticlePageContent,
      'article-page-footer': ArticlePageFooter,
      'article-list-cell': ArticleListCell,
      'recommend': Recommend,
      'tag-wall': TagWall
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .article-list-content
    width auto
    @media only screen and (max-width: 768px)
      margin 5px 5px 0 5px
    @media screen and (min-width: 768px)
      margin 10px 10px 0 10px
    @media screen and (min-width: 992px)
      margin 15px 35px 0 35px
    @media screen and (min-width: 1200px)
      width 1200px
      margin 15px auto 0
      margin-bottom 200px
    .layout-left, .layout-right
      padding 0
      @media only screen and (max-width: 768px)
        padding 0
      @media screen and (min-width: 768px)
        padding 0
      @media screen and (min-width: 992px)
        padding 0 10px
      @media screen and (min-width: 1200px)
        padding 0 10px
</style>
