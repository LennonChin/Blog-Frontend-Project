<template>
  <div class="movie-recent-list-cell">
    <h4>{{ $t('movie.recent') }}</h4>
    <i-row>
      <i-col :xs="24" :sm="24" :md="16" :lg="16" v-if="movies.length > 0">
        <ul class="recent">
          <li v-for="movie in movies.slice(0, 3)">
            <a @click.prevent="gotoPostDetail(movie)" :href="`/${movie.post_type}/${movie.id}`">
              <i-row>
                <i-col :xs="24" :sm="24" :md="7" :lg="6">
                  <div class="img">
                    <img :src="movie.front_image" alt="">
                  </div>
                </i-col>
                <i-col :xs="24" :sm="24" :md="17" :lg="18">
                  <div class="info">
                    <p class="title">
                      <i-tool-tip placement="top" :content="$t('movie.authTip')" v-if="movie.need_auth">
                        <i-icon type="android-lock" color="#FA5555" v-if="movie.need_auth"></i-icon>
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
          <h4>{{ $t('movie.recommend') }}</h4>
          <a @click.prevent="gotoPostDetail(movies[3])" :href="`/${movies[3].post_type}/${movies[3].id}`">
            <p class="title">
              <i-tool-tip placement="top" :content="$t('movie.authTip')" v-if="movies[3].need_auth">
                <i-icon type="android-lock" color="#FA5555" v-if="movies[3].need_auth"></i-icon>
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
  import API from 'API';
  import {checkPostAuth, mixin} from '@/common/js/utils';

  export default {
    name: 'movie-recent-list-cell',
    props: {
      movies: {
        Type: Array
      }
    },
    mixins: [mixin],
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该文章已加密，您需要输入访问密码', () => {
          this.$router.push({name: post.post_type, params: {id: post.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: post.post_type,
            params: {id: post.id},
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, (error) => {
          console.log(error);
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
    border 1px solid $default-border-color
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
              color $default-title-color
              &.title
                line-height 40px
                font-size 24px
                font-weight 300
                color $default-title-color
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
              color $default-link-hover-color
            p.link
              color $default-link-hover-color
            p.content
              color $default-link-hover-color
    .recommend
      margin 20px 0 10px 20px
      padding 0 25px 20px 20px
      border-left 1px solid $default-border-color
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
        border-left 1px solid $default-border-color
      @media screen and (min-width: 1200px)
        padding 0 25px 20px 20px
        border-left 1px solid $default-border-color
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
          color $default-title-color
          font-size 16px
          line-height 23px
          margin-bottom 5px
        .info
          margin 5px 0 0px
          span
            font-size 13px
            line-height 18px
            font-weight 100
            color $default-info-color
            + span
              float right
              margin-left 10px
          a
            display inline-block
            color: #777
            cursor pointer
            &:hover
              color $default-desc-hover-color
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
          color $default-desc-color
          font-size 13px
          line-height 20px
          margin 5px 0 0
        &:hover
          .title
            color $default-link-hover-color
          img
            transition: All 0.4s ease-in-out
            transform: scale(1.05)
            zoom: 1.05
</style>
