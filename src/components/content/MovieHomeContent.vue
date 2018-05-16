<template>
  <div class="movie-home-content layout-content">
    <movie-recomend-list-cell v-if="recommendMovies.length > 0" :movies="recommendMovies"></movie-recomend-list-cell>
    <movie-recent-list-cell v-if="hotMovies.length > 0" :movies="hotMovies" style="margin-top: 20px;"></movie-recent-list-cell>
    <movie-list-cell v-if="otherMovies.length > 0" :movies="otherMovies" style="margin-top: 20px;"></movie-list-cell>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';
  import MovieRecomendListCell from '@/components/views/Movie/MovieRecomendListCell';
  import MovieRecentListCell from '@/components/views/Movie/MovieRecentListCell';
  import MovieListCell from '@/components/views/Movie/MovieListCell';

  import {
    DefaultLimitSize
  } from '@/common/js/const';

  // mixin
  import {mixin} from '@/common/js/utils';

  export default {
    name: 'movie-home-content',
    data() {
      return {
        selected_category: undefined
      };
    },
    mixins: [mixin],
    asyncData({store}) {
      this.selected_category = 9;
      return Promise.all([
        store.dispatch('movieHome/GET_MOVIES_BASE_INFO', {
          params: {
            params: {
              top_category: this.selected_category,
              ordering: '-add_time',
              limit: DefaultLimitSize
            }
          }
        })
      ]);
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开时清空vuex中文章数据
      this.clearMoviesBaseInfo();
      next();
    },
    computed: {
      ...mapState({
        recommendMovies: state => state.movieHome.recommendMovies,
        hotMovies: state => state.movieHome.hotMovies,
        otherMovies: state => state.movieHome.otherMovies,
        noMoreData: state => state.movieHome.noMoreData
      }),
      categorysInfo: function () {
        return this.allCategorysInfo.filter((category) => {
          return category.category_type === 'movies';
        });
      }
    },
    mounted() {
      if (this.$store.state.movieHome.movies.length === 0) {
        console.log('non ssr');
        // 未SSR的情况
        this.getMoviesBaseInfo({
          params: {
            params: {
              top_category: this.selected_category,
              ordering: '-add_time',
              limit: DefaultLimitSize
            }
          },
          reset: true
        });
      }
    },
    methods: {
      ...mapMutations({
        clearMoviesBaseInfo: 'movieHome/CLAER_MOVIES_BASE_INFO'
      }),
      ...mapActions({
        getMoviesBaseInfo: 'movieHome/GET_MOVIES_BASE_INFO'
      })
    },
    components: {
      'movie-recomend-list-cell': MovieRecomendListCell,
      'movie-recent-list-cell': MovieRecentListCell,
      'movie-list-cell': MovieListCell
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
</style>
