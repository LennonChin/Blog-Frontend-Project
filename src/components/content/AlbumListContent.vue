<template>
  <div class="album-list-content layout-content">
    <i-row>
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu :categorys="categorys" @selectCategory="selectCategory" :defaultCategory="top_category"></classify-menu>
          <section-title :mainTitle="'图集列表'"
                         :subTitle="'Articles'"
                         :menus="menus"
                         :withRefresh="true"
                         :withTimeSelect="true"
                         :datePickerOptions="datePickerOptions"
                         @refresh="refresh"
                         @menusControl="menusControl"
                         @comfirmDateSelect="dateSelect"
                         @clearDateSelect="dateSelectClear">
          </section-title>
          <i-row>
            <i-col :xs="24" :sm="12" :md="12" :lg="12" v-for="album in albums" :key="album.tag">
              <thumb-card :album="album"></thumb-card>
            </i-col>
          </i-row>
          <browse-more @browseMore="browseMore" ref="browseMore"></browse-more>
        </div>
      </i-col>
      <i-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend></recommend>
          <tag-wall style="margin-top: 15px;"></tag-wall>
        </div>
      </i-col>
    </i-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import ThumbCard from '@/components/views/ThumbCard';
  import SectionTitle from '@/components/views/SectionTitle';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';
  import BrowseMore from '@/components/views/BrowseMore';

  // API
  import API from '@/api/client-api';

  const DEFAULT_LIMIT_SIZE = 6;
  const MAX_LIMIT_SIZE = 100;

  export default {
    name: 'album-list-content',
    data() {
      return {
        albums: [],
        categorys: undefined,
        top_category: undefined,
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
      this.top_category = parseInt(this.$route.params.id);
      this.getDatas();
      this.getCategorys();
    },
    methods: {
      browseMore() {
        console.log('browseMore');
        this.page++;
        this.getAlbumBaseInfo();
      },
      selectCategory(categoryId) {
        this.top_category = categoryId;
        this.noMoreData = false;
        this.getAlbumBaseInfo();
      },
      getDatas() {
        this.getAlbumBaseInfo();
      },
      getCategorys() {
        API.getCategorys({
          params: {
            'level_min': 1,
            'level_max': 1,
            'id': 55
          }
        }).then((response) => {
          this.categorys = response.data.results;
        }).catch((error) => {
          console.log(error);
        });
      },
      getAlbumBaseInfo() {
        if (!this.noMoreData) {
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
          API.getAlbumBaseInfo({
            params: {
              top_category: this.top_category,
              ordering: orderings.toString(),
              is_recommend: false,
              time_min: this.selectedDateRange[0],
              time_max: this.selectedDateRange[1],
              limit: this.limit_size,
              offset: this.page * this.limit_size
            }
          }).then((response) => {
            this.albums = response.data.results;
            this.totalCount += response.data.results.length;
            this.noMoreData = this.totalCount >= response.data.count;
            this.$refs.browseMore.stopLoading(this.noMoreData);
          }).catch((error) => {
            console.log(error);
          });
        }
      },
      refresh() {
        this.top_category = undefined;
        this.timeSorted = false;
        this.mostComment = undefined;
        this.recommend = undefined;
        this.page = 0;
        this.albums = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.selectedDateRange = [];
        this.getAlbumBaseInfo();
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
        this.albums = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.getAlbumBaseInfo();
      },
      dateSelect(dateRange) {
        this.selectedDateRange = dateRange;
        this.page = 0;
        this.limit_size = MAX_LIMIT_SIZE;
        this.albums = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.getAlbumBaseInfo();
      },
      dateSelectClear() {
        this.selectedDateRange = [];
        this.page = 0;
        this.limit_size = DEFAULT_LIMIT_SIZE;
        this.albums = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.getAlbumBaseInfo();
      }
    },
    watch: {
      selectedCategory: function () {
        this.getDatas();
      }
    },
    components: {
      'section-title': SectionTitle,
      'classify-menu': ClassifyMenu,
      'thumb-card': ThumbCard,
      'recommend': Recommend,
      'tag-wall': TagWall,
      'browse-more': BrowseMore
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
</style>
