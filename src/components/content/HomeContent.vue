<template>
  <div class="home-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
        <div class="layout-left">
          <photo-wall></photo-wall>
          <section-title v-if="this.specialCategory(1) !== 'undefined'"
                         :mainTitle="this.specialCategory(1).name"
                         :subTitle="this.specialCategory(1).code"
                         :menus="[{title: '最新', method: 'new'}, {title: '评论最多', method: 'mostComment'}, {title: '推荐', method: 'recommend'}]"
                         :withRefresh="true"
                         :withTimeSelect="true"
                         @titleControl="titleControl">
          </section-title>
          <article-list-cell v-for="article in articles" :article="article" :key="article.id"></article-list-cell>
          <section-title v-if="this.specialCategory(1) !== 'undefined'"
                         :mainTitle="this.specialCategory(1).name"
                         :subTitle="this.specialCategory(1).code"
                         :menus="[{title: '最新', method: 'new'}, {title: '评论最多', method: 'mostComment'}, {title: '推荐', method: 'recommend'}]"
                         :withRefresh="true"
                         :withTimeSelect="true"
                         @titleControl="titleControl">
          </section-title>
          <div class="topic-cards">
            <iv-row :gutter="10">
              <iv-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="album in albums" :key="album.id">
                <topic-card :album="album"></topic-card>
              </iv-col>
            </iv-row>
          </div>
          <section-title v-if="this.specialCategory(1) !== 'undefined'"
                         :mainTitle="this.specialCategory(1).name"
                         :subTitle="this.specialCategory(1).code"
                         :menus="[{title: '最新', method: 'new'}, {title: '评论最多', method: 'mostComment'}, {title: '推荐', method: 'recommend'}]"
                         :withRefresh="true"
                         :withTimeSelect="true"
                         @titleControl="titleControl">
          </section-title>
          <div class="movies">
            <iv-row :gutter="10">
              <iv-col :xs="12" :sm="12" :md="8" :lg="8" v-for="movie in movies" :key="movie.id"
                      style="margin-bottom: 10px;">
                <movie-list-item :movie="movie"></movie-list-item>
              </iv-col>
            </iv-row>
          </div>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <about></about>
          <recommend style="margin-top:15px;"></recommend>
          <hot style="margin-top:15px;"></hot>
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
  import TopicCard from '@/components/views/TopicCard';
  import MovieListItem from '@/components/views/Movie/MovieListItem';
  import About from '@/components/views/About';
  import Recommend from '@/components/views/Recommend';
  import Hot from '@/components/views/Hot/Hot';
  import FriendLinks from '@/components/views/FriendLinks';
  import SideToc from '@/components/views/SideToc';

  // API
  import {getCategory, getPostBaseInfo} from '@/api/api';

  export default {
    data() {
      return {
        categorys: [],
        articles: [],
        albums: [],
        movies: []
      };
    },
    created() {
      this.getDatas();
    },
    methods: {
      getDatas() {
        // 分类
        getCategory({
          params: {
            level_min: 1,
            level_max: 3
          }
        }).then((response) => {
          this.categorys = response.data;
        }).catch(function (error) {
          console.log(error);
        });

        // 文章
        getPostBaseInfo({
          params: {
            is_recommend: false,
            limit: 5,
            offset: 0,
            post_type: 'article'
          }
        }).then((response) => {
          this.articles = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });

        // 图集
        getPostBaseInfo({
          params: {
            is_recommend: false,
            limit: 6,
            offset: 0,
            post_type: 'album'
          }
        }).then((response) => {
          this.albums = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });

        // 电影
        getPostBaseInfo({
          params: {
            is_recommend: false,
            limit: 6,
            offset: 0,
            post_type: 'movie'
          }
        }).then((response) => {
          this.movies = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });
      },
      specialCategory(id) {
        if (this.categorys.length === 0) return 'undefined';
        return this.categorys.filter((category) => {
          return category.id === id;
        })[0];
      },
      titleControl(params) {
        console.log(params);
      }
    },
    components: {
      'photo-wall': PhotoWall,
      'article-list-cell': ArticleListCell,
      'section-title': SectionTitle,
      'topic-card': TopicCard,
      'movie-list-item': MovieListItem,
      'about': About,
      'recommend': Recommend,
      'hot': Hot,
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
