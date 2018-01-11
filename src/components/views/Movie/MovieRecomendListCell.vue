<template>
  <div class="movie-recommend-list-cell" v-if="movies.length > 0">
    <h4>推荐影评</h4>
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="6" :lg="8">
        <div class="left">
          <movie-list-item :movie="movies[0]"></movie-list-item>
        </div>
      </iv-col>
      <iv-col :xs="24" :sm="24" :md="18" :lg="16">
        <iv-row>
          <iv-col :xs="24" :sm="24" :md="12" :lg="12" v-for="movie in movies.slice(1, 5)" :key="movie.id">
            <div class="right">
              <a @click="gotoPostDetail(movie)">
                <div class="img">
                  <div class="container">
                    <div class="bracket"></div>
                    <div class="target">
                      <img :src="movie.front_image" alt="">
                    </div>
                  </div>
                </div>
                <div class="info">
                  <p class="title">{{ movie.title }}</p>
                  <p class="desc"><span>导演：</span>{{ movie.director }}</p>
                  <p class="desc"><span>主演：</span>{{ movie.actors | textLineBreak(20) }}</p>
                  <p class="desc"><span>类型：</span>{{ movie.category.name }}</p>
                  <p class="desc"><span>剧情介绍：</span>{{ movie.desc  | textLineBreak(30) }}</p>
                </div>
              </a>
            </div>
          </iv-col>
        </iv-row>
        <iv-row>
          <iv-col :xs="24" :sm="24" :md="12" :lg="12">
            <div class="comment">
              <a href="">
                <img src="../../../assets/avatar.png" alt="">
                <div class="user">
                  <p class="title">东方快车谋杀案</p>
                  <p class="time">2017-11-21 12:00:09</p>
                </div>
                <p class="content">终于赶上告别版的盗3了，可惜看不到末场的演出了！可惜看不到末场的演出了！</p>
              </a>
            </div>
          </iv-col>
          <iv-col :xs="24" :sm="24" :md="12" :lg="12">
            <div class="comment">
              <a href="">
                <img src="../../../assets/avatar.png" alt="">
                <div class="user">
                  <p class="title">东方快车谋杀案</p>
                  <p class="time">2017-11-21 12:00:09</p>
                </div>
                <p class="content">终于赶上告别版的盗3了，可惜看不到末场的演出了！可惜看不到末场的演出了！</p>
              </a>
            </div>
          </iv-col>
        </iv-row>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import MovieListItem from '@/components/views/Movie/MovieListItem';
  import {checkPostAuth} from '@/common/js/utils';

  export default {
    props: {
      movies: {
        Type: Array,
        default: []
      }
    },
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该文章为加密文章，您需要输入阅读密码', () => {
          this.$router.push({name: 'movie/detail', params: {movieId: post.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: 'movie/detail',
            params: {movieId: post.id},
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, () => {
          this.$Notice.error({
            title: '密码错误'
          });
        });
      }
    },
    components: {
      'movie-list-item': MovieListItem
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .movie-recommend-list-cell
    border 1px solid $color-border
    h4
      font-size 26px
      line-height 30px
      padding 20px 20px 0 20px
      a
        font-size 16px
        float right
    .left
      padding 20px
    .right
      padding 20px 20px 0
      a
        display flex
        .img
          position relative
          flex 0 0 130px
          width 130px
          overflow hidden
          .container
            width 100%
            position relative
            overflow hidden
            .bracket
              margin-top 135%
            .target
              position absolute
              top 0
              bottom 0
              left 0
              right 0
              > img
                width 100%
                height 100%
                transition: All 0.4s ease-in-out
                transform: scale(1.0)
                zoom: 1.0
        .info
          padding-left 15px
          .title
            font-size 20px
            line-height 26px
            font-weight 500
            color $color-typegraphy-title
            margin-bottom 10px
            text-align justify
          .desc
            font-size 15px
            font-weight 100
            line-height 19px
            color $color-gradually-gray-61
            text-align justify
            margin-bottom 3px
            > span
              color $color-gradually-gray-41
              font-weight 700
        &:hover
          img
            transition: All 0.4s ease-in-out
            transform: scale(1.05)
            zoom: 1.05
          .info
            .title
              color $color-secondary-warning
            .desc
              color $color-gradually-gray-11

    .comment
      margin 15px 20px 20px 20px
      padding 15px
      border 1px solid $color-border
      a
        display flex
        flex-wrap: wrap;
        transform: translate(0, 0)
        transition: all 0.2s ease-in
        img
          flex 0 0 45px
          width 45px
          height 45px
          margin 5px 0
        .user
          display flex
          flex-direction column
          padding-left 12px
          height 55px
          p
            flex 1
            text-align left
            &.title
              height 32px
              line-height 40px
              font-size 16px
              color $color-secondary-warning
            &.time
              height 14px
              line-height 15px
              font-weight 100
        p.content
          width: 100%;
          flex-grow: 4;
          margin-top 5px
          font-size 16px
          line-height 22px
        &:hover
          p.time, p.content
            color $color-secondary-warning

</style>
