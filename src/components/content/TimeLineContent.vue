<template>
  <div class="timeline-content layout-content">
    <i-row>
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu :categorys="allCategorysInfo" @selectCategory="selectCategory"
                         :defaultCategory="top_category"></classify-menu>
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
          <div v-for="year in sortedYearKeys(timeline)" v-if="Object.keys(timeline).length > 0">
            <archive-list-time-title :date="year + '年'" :count="timeline[year].count"></archive-list-time-title>
            <div v-for="month in sortedMonthKeys(timeline[year].months)">
              <archive-list-time-title :date="month + '月'" :count="timeline[year].months[month].length"
                                       :dateType="'month'"></archive-list-time-title>
              <archive-list-cell v-for="post in timeline[year].months[month]" :post="post"
                                 :key="post.id"></archive-list-cell>
            </div>
          </div>
          <browse-more @browseMore="browseMore" :noMoreData="noMoreData" ref="browseMore"></browse-more>
        </div>
      </i-col>
      <i-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend></recommend>
          <hot style="margin-top: 15px;"></hot>
          <tag-wall style="margin-top: 15px;"></tag-wall>
        </div>
      </i-col>
    </i-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex';
  import SectionTitle from '@/components/views/SectionTitle';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import ArchiveListCell from '@/components/views/Archive/ArchiveListCell';
  import ArchiveListTimeTitle from '@/components/views/Archive/ArchiveListTimeTitle';
  import Recommend from '@/components/views/Recommend';
  import Hot from '@/components/views/Hot';
  import TagWall from '@/components/views/TagWall';
  import BrowseMore from '@/components/views/BrowseMore';

  const DEFAULT_LIMIT_SIZE = 20;
  const MAX_LIMIT_SIZE = 100;

  export default {
    name: 'read-list-content',
    data() {
      return {
        top_category: undefined,
        // 排序
        timeSorted: false,
        mostComment: undefined,
        recommend: undefined,
        limit_size: DEFAULT_LIMIT_SIZE,
        page: 0,
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
    asyncData({store}) {
      return Promise.all([
        store.dispatch('timeline/GET_TIMELINE_INFO', {
          params: {
            params: {
              ordering: '-add_time',
              limit: DEFAULT_LIMIT_SIZE
            }
          }
        })
      ]);
    },
    mounted() {
      if (Object.keys(this.$store.state.timeline.timeline).length === 0) {
        console.log('non ssr');
        // 未SSR的情况
        this.updateTimeLineInfo({
          params: {
            params: {
              ordering: '-add_time',
              limit: DEFAULT_LIMIT_SIZE
            }
          }
        }, false);
      }
    },
    computed: {
      ...mapState({
        timeline: state => state.timeline.timeline,
        noMoreData: state => state.timeline.noMoreData,
        allCategorysInfo: state => state.base.allCategorysInfo
      }),
      ...mapGetters({
        documentMeta: 'DOCUMENT_META'
      })
    },
    methods: {
      ...mapMutations({
        clearTimelineInfo: 'timeline/CLAER_TIMELINE_INFO'
      }),
      ...mapActions({
        getTimelineInfo: 'timeline/GET_TIMELINE_INFO'
      }),
      browseMore() {
        this.page++;
        this.updateTimeLineInfo();
      },
      updateTimeLineInfo(reset) {
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
        this.getTimelineInfo({
          params: {
            params: {
              top_category: this.top_category,
              ordering: orderings.toString(),
              is_recommend: this.recommend,
              time_min: this.selectedDateRange[0],
              time_max: this.selectedDateRange[1],
              limit: this.limit_size,
              offset: this.page * this.limit_size
            }
          },
          reset
        }).then(response => {
          this.$refs.browseMore.stopLoading();
        }).catch(error => {
          this.$refs.browseMore.stopLoading();
          console.log(error);
        });
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
        this.top_category = categoryId;
        this.page = 0;
        this.updateTimeLineInfo(true);
      },
      refresh() {
        this.top_category = undefined;
        this.timeSorted = false;
        this.mostComment = undefined;
        this.recommend = undefined;
        this.page = 0;
        this.selectedDateRange = [];
        this.updateTimeLineInfo(true);
      },
      menusControl(params) {
        switch (params[0]) {
          case 'timeSorted':
            this.timeSorted = !params[1];
            break;
          case 'mostComment':
            this.mostComment = params[1] ? params[1] : undefined;
            break;
          case 'recommend':
            this.recommend = params[1] ? params[1] : undefined;
            break;
        }
        // 清空原数据
        this.page = 0;
        this.updateTimeLineInfo(true);
      },
      dateSelect(dateRange) {
        this.selectedDateRange = dateRange;
        this.page = 0;
        this.limit_size = MAX_LIMIT_SIZE;
        this.updateTimeLineInfo(true);
      },
      dateSelectClear() {
        this.selectedDateRange = [];
        this.page = 0;
        this.limit_size = DEFAULT_LIMIT_SIZE;
        this.updateTimeLineInfo(true);
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

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
</style>
