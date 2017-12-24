<template>
  <div class="movie-recent-list-cell">
    <h4>最近观影<a href="">查看更多</a></h4>
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="16" :lg="16" v-if="movies.length > 0">
        <ul class="recent">
          <li v-for="movie in movies.slice(0, 3)">
            <router-link :to="{ name: 'movie/detail', params:{ movieId: movie.detail}}" target="_blank">
              <iv-row>
                <iv-col :xs="24" :sm="24" :md="7" :lg="6">
                  <div class="img">
                    <img :src="movie.front_image" alt="">
                  </div>
                </iv-col>
                <iv-col :xs="24" :sm="24" :md="17" :lg="18">
                  <div class="info">
                    <p class="title">{{ movie.title }}</p>
                    <p class="link">{{ movie.add_time | socialDate }}</p>
                    <p class="content">{{ movie.desc.slice(0, 60) + '...' }}</p>
                  </div>
                </iv-col>
              </iv-row>
            </router-link>
          </li>
        </ul>
      </iv-col>
      <iv-col :xs="24" :sm="24" :md="8" :lg="8" v-if="movies[3] != undefined">
        <div class="recommend">
          <h4>推荐观影</h4>
          <router-link :to="{ name: 'movie/detail', params:{ movieId: movies[3].detail}}" target="_blank">
            <p class="title">{{ movies[3].title }}</p>
            <div class="tags">
              <iv-tag :color="tag.color" v-for="tag in movies[3].tags" :key="tag.id">{{ tag.name }}</iv-tag>
            </div>
            <p class="info">
              <span class="time">2017-11-17 09:19</span>
              <span class="likes"><a href=""><iv-icon type="heart"></iv-icon> {{ movies[3].like_num }} </a></span>
              <span class="comments"><a href=""><iv-icon type="compose"></iv-icon> {{ movies[3].comment_click }} </a></span>
              <span class="readings"><a href=""><iv-icon type="eye"></iv-icon> {{ movies[3].click_num }} </a></span>
            </p>
            <div class="img">
              <img :src="movies[3].front_image" alt="">
            </div>
            <p class="desc">{{ movies[3].desc }}</p>
          </router-link>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      movies: {
        Type: Array
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .movie-recent-list-cell
    border 1px solid $color-border
    h4
      font-size 26px
      line-height 30px
      padding 20px 20px 0 20px
      a
        font-size 16px
        float right
    .recent
      padding 20px 20px 0 20px
      li
        margin-bottom 10px
        a
          .img
            width 100%
            height 0
            padding-bottom 65%
            margin-bottom 10px
            overflow hidden
            img
              transition: All 0.4s ease-in-out
              width 100%
          .info
            @media only screen and (max-width: 768px)
              padding-bottom 10px
            @media screen and (min-width: 768px)
              padding-bottom 10px
            @media screen and (min-width: 992px)
              padding 0 0 10px 12px
            @media screen and (min-width: 1200px)
              padding 0 0 10px 12px
            p
              text-align left
              font-weight 100
              color $color-gradually-gray-61
              &.title
                line-height 40px
                font-size 24px
                font-weight 300
                color $color-typegraphy-title
              &.link
                font-size 18px
                line-height 23px
                font-weight 100
              &.content
                margin-top 5px
                font-size 17px
                font-weight 100
                line-height 22px
          &:hover
            img
              transform: scale(1.05)
              zoom: 1.05
            p.title
              font-weight 500
              color $color-secondary-warning
            p.link
              color $color-gradually-gray-61
            p.content
              color $color-gradually-gray-61
    .recommend
      margin 20px 0 10px 20px
      padding 0 25px 20px 20px
      border-left 1px solid $color-border
      @media only screen and (max-width: 768px)
        margin 0 0 20px 0
        padding 0 20px
        border-left none
      @media screen and (min-width: 768px)
        margin 0 0 20px 0
        padding 0 20px
        border-left none
      @media screen and (min-width: 992px)
        padding 0 25px 20px 20px
        border-left 1px solid $color-border
      @media screen and (min-width: 1200px)
        padding 0 25px 20px 20px
        border-left 1px solid $color-border
      h4
        font-size 20px
        padding 0 0 10px 0
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
</style>
