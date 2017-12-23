<template>
  <div class="timeline-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <timeline-header @titleControl="titleControl"></timeline-header>
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
  import TimeLineHeader from '@/components/views/TimeLine/TimeLineHeader';
  import ArchiveListCell from '@/components/views/Archive/ArchiveListCell';
  import ArchiveListTimeTitle from '@/components/views/Archive/ArchiveListTimeTitle';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';
  import BrowseMore from '@/components/views/BrowseMore';

  // API
  import { getPostBaseInfo } from '@/api/api';

  export default {
    data() {
      return {
        posts: {},
        // 排序
        sorted: false,
        page_size: 10,
        page: 1,
        totalCount: 0,
        noMoreData: false
      };
    },
    created() {
      this.getDatas();
    },
    methods: {
      browseMore() {
        console.log('browseMore');
        this.page++;
        this.getDatas();
      },
      getDatas() {
        // 文章
        if (!this.noMorePost) {
          getPostBaseInfo({
            params: {
              ordering: this.sorted ? 'add_time' : '-add_time',
              page_size: this.page_size,
              page: this.page
            }
          }).then((response) => {
            // 记录数量
            this.totalCount += response.data.results.length;
            this.noMoreData = this.totalCount >= response.data.count;
            this.reducePosts(response.data.results);
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
      reducePosts(posts) {
        var that = this;
        posts.map((post) => {
          // 按年月分批
          let addYear = new Date(post.add_time).getFullYear();
          let addMonth = new Date(post.add_time).getMonth();
          if (!that.posts.hasOwnProperty(addYear)) {
            that.posts[addYear] = {};
            that.posts[addYear]['months'] = {};
          }
          if (!that.posts[addYear]['months'].hasOwnProperty(addMonth + 1)) {
            that.posts[addYear]['months'][addMonth + 1] = [];
          }
          that.posts[addYear]['months'][addMonth + 1].push(post);
        });
        this.posts = Object.assign({}, this.posts);
        // 停止浏览更多动画
        this.$refs.browseMore.stopLoading(this.noMoreData);
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
      },
      titleControl(params) {
        console.log(params);
        if (params[0] === 'sorted') {
          this.sorted = !params[1];
        }
        this.getDatas();
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
