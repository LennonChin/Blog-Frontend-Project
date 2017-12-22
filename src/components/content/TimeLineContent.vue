<template>
  <div class="timeline-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <timeline-header></timeline-header>
          <div v-for="year in sortedYearKeys(posts)">
            <archive-list-time-title :date="year + '年'" :count="posts[year].count"></archive-list-time-title>
            <div v-for="month in sortedMonthKeys(posts[year].months)">
              <archive-list-time-title :date="month + '月'" :count="posts[year].months[month].length"
                                       :dateType="'month'"></archive-list-time-title>
              <archive-list-cell v-for="post in posts[year].months[month]" :post="post"
                                 :key="post.title"></archive-list-cell>
            </div>
          </div>
          <browse-more @browseMore="browseMore" ref="browseMore"></browse-more>
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
  import Vue from 'vue';
  import TimeLineHeader from '@/components/views/TimeLine/TimeLineHeader';
  import ArchiveListCell from '@/components/views/Archive/ArchiveListCell';
  import ArchiveListTimeTitle from '@/components/views/Archive/ArchiveListTimeTitle';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';
  import BrowseMore from '@/components/views/BrowseMore';

  // API
  import {getArticleBaseInfo, getAlbumBaseInfo, getMovieBaseInfo} from '@/api/api';

  const POST_TYPE_ARTICLE = 'article';
  const POST_TYPE_ALBUM = 'album';
  const POST_TYPE_MOVIE = 'movie';

  export default {
    data() {
      return {
        posts: {},
        timelines: {},
        // 排序
        sorted: false,
        page_size: 10,
        articlePage: 1,
        articleCount: 0,
        noMoreArticle: false,
        albumPage: 1,
        albumCount: 0,
        noMoreAlbum: false,
        moviePage: 1,
        movieCount: 0,
        noMoreMovie: false,
        dataReady: [false, false, false]
      };
    },
    created() {
      this.getDatas();
    },
    methods: {
      browseMore() {
        console.log('browseMore');
        this.articlePage++;
        this.albumPage++;
        this.moviePage++;
        this.getDatas();
      },
      getDatas() {
        // 文章
        if (!this.noMoreArticle) {
          getArticleBaseInfo({
            params: {
              ordering: this.sorted ? 'add_time' : '-add_time',
              page_size: this.page_size,
              page: this.articlePage
            }
          }).then((response) => {
            // 记录数量
            this.articleCount += response.data.results.length;
            this.noMoreArticle = this.articleCount >= response.data.count;
            this.reducePosts(response.data.results, POST_TYPE_ARTICLE);
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          Vue.set(this.dataReady, 0, true);
        }

        // 图集
        if (!this.noMoreAlbum) {
          getAlbumBaseInfo({
            params: {
              ordering: this.sorted ? 'add_time' : '-add_time',
              page_size: this.page_size,
              page: this.albumPage
            }
          }).then((response) => {
            // 记录数量
            this.albumCount += response.data.results.length;
            this.noMoreAlbum = this.albumCount >= response.data.count;
            this.reducePosts(response.data.results, POST_TYPE_ALBUM);
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          Vue.set(this.dataReady, 1, true);
        }

        // 电影
        if (!this.noMoreMovie) {
          getMovieBaseInfo({
            params: {
              ordering: this.sorted ? 'add_time' : '-add_time',
              page_size: this.page_size,
              page: this.moviePage
            }
          }).then((response) => {
            // 记录数量
            this.movieCount += response.data.results.length;
            this.noMoreMovie = this.movieCount >= response.data.count;
            this.reducePosts(response.data.results, POST_TYPE_MOVIE);
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          Vue.set(this.dataReady, 2, true);
        }
      },
      reducePosts(posts, type) {
        var that = this;
        posts.map((post) => {
          // 添加一个type用于标识文章类型
          post.postType = type;
          // 按年月分批
          let addYear = new Date(post.add_time).getFullYear();
          let addMonth = new Date(post.add_time).getMonth();
          if (!that.timelines.hasOwnProperty(addYear)) {
            that.timelines[addYear] = {};
            that.timelines[addYear]['months'] = {};
          }
          if (!that.timelines[addYear]['months'].hasOwnProperty(addMonth + 1)) {
            that.timelines[addYear]['months'][addMonth + 1] = [];
          }
          that.timelines[addYear]['months'][addMonth + 1].push(post);
        });
        switch (type) {
          case POST_TYPE_ARTICLE:
            Vue.set(this.dataReady, 0, true);
            break;
          case POST_TYPE_ALBUM:
            Vue.set(this.dataReady, 1, true);
            break;
          case POST_TYPE_MOVIE:
            Vue.set(this.dataReady, 2, true);
            break;
        }
      },
      sortedYearKeys(years) {
        let that = this;
        return Object.keys(years).sort(function (year1, year2) {
          return that.sorted ? year1 - year2 : year2 - year1;
        });
      },
      sortedMonthKeys(months) {
        let that = this;
        return Object.keys(months).sort(function (month1, month2) {
          return that.sorted ? month1 - month2 : month2 - month1;
        });
      }
    },
    watch: {
      dataReady: function (newDataReady) {
        if (newDataReady[0] && newDataReady[1] && newDataReady[2]) {
          // 表示数据已就绪
          for (let year in this.timelines) {
            let yearCount = 0;
            for (let month in this.timelines[year]['months']) {
              // 月份排序
              let posts = this.timelines[year]['months'][month];
              // 年度计数
              yearCount += posts.length;
              let that = this;
              posts.sort(function (post1, post2) {
                let timestamp1 = parseInt(Date.parse(new Date(post1.add_time)) / 1000);
                let timestamp2 = parseInt(Date.parse(new Date(post2.add_time)) / 1000);
                return that.sorted ? timestamp1 - timestamp2 : timestamp2 - timestamp1;
              });
            }
            this.timelines[year]['count'] = yearCount;
          }
          this.posts = Object.assign({}, this.timelines);
          console.log(this.posts);
          // 停止浏览更多动画
          this.$refs.browseMore.stopLoading();
          this.dataReady = [false, false, false];
        }
      }
    },
    components: {
      'timeline-header': TimeLineHeader,
      'archive-list-time-title': ArchiveListTimeTitle,
      'archive-list-cell': ArchiveListCell,
      'recommend': Recommend,
      'tag-wall': TagWall,
      'browse-more': BrowseMore
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .timeline-content
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
