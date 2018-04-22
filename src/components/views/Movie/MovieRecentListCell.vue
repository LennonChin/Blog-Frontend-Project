<template>
  <div class="movie-recent-list-cell">
    <h4>最近观影</h4>
    <i-row>
      <i-col :xs="24" :sm="24" :md="16" :lg="16" v-if="movies.length > 0">
        <ul class="recent">
          <li v-for="movie in movies.slice(0, 3)">
            <a @click="gotoPostDetail(movie)">
              <i-row>
                <i-col :xs="24" :sm="24" :md="7" :lg="6">
                  <div class="img">
                    <img :src="movie.front_image" alt="">
                  </div>
                </i-col>
                <i-col :xs="24" :sm="24" :md="17" :lg="18">
                  <div class="info">
                    <p class="title">
                      <i-tool-tip placement="top" content="该文章已加密，您需要输入阅读密码" v-if="movie.browse_password_encrypt">
                        <i-icon type="android-lock" color="#FA5555" v-if="movie.browse_password_encrypt"></i-icon>
                      </i-tool-tip>
                      {{ movie.title }}
                    </p>
                    <p class="link">{{ movie.add_time | socialDate }}</p>
                    <p class="content">{{ movie.desc | textLineBreak(60) }}</p>
                  </div>
                </i-col>
              </i-row>
            </a>
          </li>
        </ul>
      </i-col>
      <i-col :xs="24" :sm="24" :md="8" :lg="8" v-if="movies[3] != undefined">
        <div class="recommend">
          <h4>推荐观影</h4>
          <a @click="gotoPostDetail(movies[3])">
            <p class="title">
              <i-tool-tip placement="top" content="该文章已加密，您需要输入阅读密码" v-if="movies[3].browse_password_encrypt">
                <i-icon type="android-lock" color="#FA5555" v-if="movies[3].browse_password_encrypt"></i-icon>
              </i-tool-tip>
              {{ movies[3].title }}
            </p>
            <div class="tags">
              <i-tag :color="tag.color" v-for="tag in movies[3].tags" :key="tag.id">{{ tag.name }}</i-tag>
            </div>
            <p class="info">
              <span class="time">{{ movies[3].add_time | socialDate }}</span>
              <span class="likes"><a @click="likePost(movies[3])"><i-icon type="heart"></i-icon> {{ movies[3].like_num }} </a></span>
              <span class="comments"><a><i-icon type="compose"></i-icon> {{ movies[3].comment_click }} </a></span>
              <span class="readings"><a><i-icon type="eye"></i-icon> {{ movies[3].click_num }} </a></span>
            </p>
            <div class="img">
              <img :src="movies[3].front_image" alt="">
            </div>
            <p class="desc">{{ movies[3].desc | textLineBreak(100) }}</p>
          </a>
        </div>
      </i-col>
    </i-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@/api/client-api';
  import {checkPostAuth} from '@/common/js/utils';

  export default {
    props: {
      movies: {
        Type: Array
      }
    },
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该文章已加密，您需要输入阅读密码', () => {
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
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
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
