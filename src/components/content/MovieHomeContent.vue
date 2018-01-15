<template>
  <div class="movie-home-content layout-content">
    <movie-recomend-list-cell v-if="recommendMovies.length > 0" :movies="recommendMovies"></movie-recomend-list-cell>
    <movie-recent-list-cell v-if="hotMovies.length > 0" :movies="hotMovies" style="margin-top: 20px;"></movie-recent-list-cell>
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

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
</style>
