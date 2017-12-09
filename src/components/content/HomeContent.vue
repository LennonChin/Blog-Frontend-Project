<template>
  <div class="home-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
        <div class="layout-left">
          <photo-wall></photo-wall>
          <section-title :mainTitle="'文章'" :subTitle="'Articles'">
            <title-menu-filter slot="menu"></title-menu-filter>
          </section-title>
          <article-list-cell v-for="article in articles" :article="article" :key="article.id"></article-list-cell>
          <section-title :mainTitle="'主题'" :subTitle="'Topics'"></section-title>
          <div class="topic-cards">
            <iv-row :gutter="10">
              <iv-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <topic-card></topic-card>
              </iv-col>
              <iv-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <topic-card></topic-card>
              </iv-col>
              <iv-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <topic-card></topic-card>
              </iv-col>
              <iv-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <topic-card></topic-card>
              </iv-col>
            </iv-row>
          </div>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <about></about>
          <friend-links style="margin-top:15px;"></friend-links>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import PhotoWall from '@/components/views/PhotoWall';
  import ArticleListCell from '@/components/views/Article/ArticleListCell';
  import SectionTitle from '@/components/views/SectionTitle/SectionTitle';
  import TitleMenuFilter from '@/components/views/SectionTitle/TitleMenuFilter';
  import TopicCard from '@/components/views/TopicCard';
  import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader';
  import ArticlePageContent from '@/components/views/Article/ArticlePageContent';
  import ArchiveListTimeTitle from '@/components/views/Archive/ArchiveListTimeTitle';
  import ArchiveListCell from '@/components/views/Archive/ArchiveListCell';
  import About from '@/components/views/About';
  import FriendLinks from '@/components/views/FriendLinks';
  import SideToc from '@/components/views/SideToc';

  // API
  import { getArticles } from '@/api/api';

  export default {
    data() {
      return {
        articles: []
      };
    },
    created() {
      this.getArticles();
    },
    methods: {
      getArticles() {
        getArticles({
          params: {}
        }).then((response) => {
          this.articles = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    components: {
      'photo-wall': PhotoWall,
      'article-list-cell': ArticleListCell,
      'section-title': SectionTitle,
      'title-menu-filter': TitleMenuFilter,
      'topic-card': TopicCard,
      'article-page-header': ArticlePageHeader,
      'article-page-content': ArticlePageContent,
      'archive-list-time-title': ArchiveListTimeTitle,
      'archive-list-cell': ArchiveListCell,
      'about': About,
      'friend-links': FriendLinks,
      'side-toc': SideToc
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home-content
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
