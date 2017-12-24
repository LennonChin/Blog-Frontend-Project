<template>
  <div class="timeline-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu @selectCategory="selectCategory" :defaultCategory="16"></classify-menu>
          <section-title :mainTitle="'存档时光'"
                         :subTitle="'Timeline'"
                         :menus="menus"
                         :withRefresh="true"
                         :withTimeSelect="true"
                         :datePickerOptions="datePickerOptions"
                         @refresh="refresh"
                         @menusControl="menusControl"
                         @comfirmDateSelect="dateSelect"
                         @clearDateSelect="dateSelectClear">
          </section-title>
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
          <hot style="margin-top: 15px;"></hot>
          <tag-wall style="margin-top: 15px;"></tag-wall>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import SectionTitle from '@/components/views/SectionTitle/SectionTitle';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import ArchiveListCell from '@/components/views/Archive/ArchiveListCell';
  import ArchiveListTimeTitle from '@/components/views/Archive/ArchiveListTimeTitle';
  import Recommend from '@/components/views/Recommend';
  import Hot from '@/components/views/Hot/Hot';
  import TagWall from '@/components/views/TagWall';
  import BrowseMore from '@/components/views/BrowseMore';

  // API
  import {getPostBaseInfo} from '@/api/api';

  const DEFAULT_LIMIT_SIZE = 10;
  const MAX_LIMIT_SIZE = 100;

  export default {
    data() {
      return {
        posts: {},
        // 排序
        timeSorted: false,
        mostComment: undefined,
        recommend: undefined,
        limit_size: DEFAULT_LIMIT_SIZE,
        page: 0,
        totalCount: 0,
        noMoreData: false,
        menus: [
          {title: '顺序', selectedTitle: '逆序', selected: true, method: 'timeSorted'},
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        datePickerOptions: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          },
          shortcuts: [
            {
              text: '近一周',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '近一个月',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '近三个月',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            },
            {
              text: '近一年',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                return [start, end];
              }
            }
          ]
        },
        selectedDateRange: []
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
          // 排序条件
          let orderings = [];
          if (this.timeSorted) {
            orderings.push('add_time');
          } else {
            orderings.push('-add_time');
          }
          if (this.mostComment !== undefined) {
            if (this.mostComment) {
              orderings.push('comment_num');
            } else {
              orderings.push('-comment_num');
            }
          }
          getPostBaseInfo({
            params: {
              ordering: orderings.toString(),
              is_recommend: this.recommend,
              time_min: this.selectedDateRange[0],
              time_max: this.selectedDateRange[1],
              limit: this.limit_size,
              offset: this.page * this.limit_size
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
            that.posts[addYear]['count'] = 0;
          }
          if (!that.posts[addYear]['months'].hasOwnProperty(addMonth + 1)) {
            that.posts[addYear]['months'][addMonth + 1] = [];
          }
          that.posts[addYear]['months'][addMonth + 1].push(post);
          that.posts[addYear]['count'] += 1;
        });
        this.posts = Object.assign({}, this.posts);
        // 停止浏览更多动画
        this.$refs.browseMore.stopLoading(this.noMoreData);
      },
      sortedYearKeys(years) {
        let that = this;
        return Object.keys(years).sort(function (year1, year2) {
          return that.timeSorted ? year1 - year2 : year2 - year1;
        });
      },
      sortedMonthKeys(months) {
        let that = this;
        return Object.keys(months).sort(function (month1, month2) {
          return that.timeSorted ? month1 - month2 : month2 - month1;
        });
      },
      selectCategory(categoryId) {
        console.log(categoryId);
      },
      refresh() {
        this.timeSorted = false;
        this.mostComment = undefined;
        this.recommend = undefined;
        this.page = 0;
        this.posts = {};
        this.totalCount = 0;
        this.noMoreData = false;
        this.selectedDateRange = [];
        this.getDatas();
      },
      menusControl(params) {
        switch (params[0]) {
          case 'timeSorted':
            this.timeSorted = !params[1];
            break;
          case 'mostComment':
            this.mostComment = params[1];
            break;
          case 'recommend':
            this.recommend = params[1];
            break;
        }
        // 清空原数据
        this.page = 0;
        this.posts = {};
        this.totalCount = 0;
        this.noMoreData = false;
        this.getDatas();
      },
      dateSelect(dateRange) {
        console.log(dateRange);
        this.selectedDateRange = dateRange;
        this.page = 0;
        this.limit_size = MAX_LIMIT_SIZE;
        this.posts = {};
        this.totalCount = 0;
        this.noMoreData = false;
        this.getDatas();
      },
      dateSelectClear() {
        this.selectedDateRange = [];
        this.page = 0;
        this.limit_size = DEFAULT_LIMIT_SIZE;
        this.posts = {};
        this.totalCount = 0;
        this.noMoreData = false;
        this.getDatas();
      }
    },
    components: {
      'section-title': SectionTitle,
      'classify-menu': ClassifyMenu,
      'archive-list-time-title': ArchiveListTimeTitle,
      'archive-list-cell': ArchiveListCell,
      'recommend': Recommend,
      'hot': Hot,
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
