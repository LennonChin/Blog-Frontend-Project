<template>
  <div class="movie-home-content">
    <movie-recomend-list-cell :movies="recommendMovies"></movie-recomend-list-cell>
    <movie-recent-list-cell :movies="hotMovies" style="margin-top: 20px;"></movie-recent-list-cell>
    <movie-list-cell v-if="otherMovies.length > 0" :movies="otherMovies" style="margin-top: 20px;"></movie-list-cell>
  </div>
</template>

<script type="text/ecmascript-6">
  import MovieRecomendListCell from '@/components/views/Movie/MovieRecomendListCell';
  import MovieRecentListCell from '@/components/views/Movie/MovieRecentListCell';
  import MovieListCell from '@/components/views/Movie/MovieListCell';

  // API
  import { getMovieBaseInfo } from '@/api/api';

  export default {
    data() {
      return {
        movies: undefined,
        recommendMovies: [],
        hotMovies: [],
        otherMovies: []
      };
    },
    created() {
      this.getDatas();
    },
    methods: {
      getDatas() {
        getMovieBaseInfo({
          params: {
            limit: 20
          }
        }).then((response) => {
          this.movies = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    watch: {
      movies: function (newMovies) {
        this.$nextTick(() => {
          let that = this;
          newMovies.map(movie => {
            if (movie.is_recommend && that.recommendMovies.length < 5) {
              that.recommendMovies.push(movie);
            } else if (movie.is_hot && that.hotMovies.length < 4) {
              that.hotMovies.push(movie);
            } else {
              that.otherMovies.push(movie);
            }
          });
        });
      }
    },
    components: {
      'movie-recomend-list-cell': MovieRecomendListCell,
      'movie-recent-list-cell': MovieRecentListCell,
      'movie-list-cell': MovieListCell
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .movie-home-content
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
</style>
