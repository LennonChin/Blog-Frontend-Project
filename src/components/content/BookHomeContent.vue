<template>
  <div class="book-home-content layout-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <book-reading-cell></book-reading-cell>
          <classify-menu :categorys="categorys"
                         :defaultCategory="1"></classify-menu>
          <iv-affix style="position: relative;z-index: 12;">
            <section-title :mainTitle="'图书列表'"
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
          </iv-affix>
          <book-list-cell v-for="book in books" :book="book" :key="book.id"></book-list-cell>
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
  import BookReadingCell from '@/components/views/Book/BookReadingCell';
  import BookListCell from '@/components/views/Book/BookListCell';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import SectionTitle from '@/components/views/SectionTitle';

  // API
  import {getBookBaseInfo, getCategorys} from '@/api/api';

  const DEFAULT_LIMIT_SIZE = 20;
  const MAX_LIMIT_SIZE = 100;

  export default {
    data() {
      return {
        books: [],
        readingBook: [],
        categorys: undefined,
        top_category: 1,
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
      this.getCategorys();
      this.getBookBaseInfo();
    },
    methods: {
      browseMore() {
        this.page++;
        this.getArticleBaseInfo();
      },
      selectCategory(categoryId) {
        this.top_category = categoryId;
        this.books = [];
        this.readingBook = [];
        this.noMoreData = false;
        this.getBookBaseInfo();
      },
      getCategorys() {
        getCategorys({
          params: {
            'level_min': 1,
            'level_max': 1,
            'id': 1
          }
        }).then((response) => {
          this.categorys = response.data.results;
        }).catch((error) => {
          console.log(error);
        });
      },
      getBookBaseInfo() {
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
          getBookBaseInfo({
            params: {
              top_category: this.top_category,
              ordering: orderings.toString(),
              is_recommend: this.recommend,
              time_min: this.selectedDateRange[0],
              time_max: this.selectedDateRange[1],
              is_banner: false,
              limit: this.limit_size,
              offset: this.page * this.limit_size
            }
          }).then((response) => {
            this.totalCount += response.data.results.length;
            this.noMoreData = this.totalCount >= response.data.count;
            this.books = this.books.concat(response.data.results);
            this.$nextTick(() => {
              this.$refs.browseMore.stopLoading(this.noMoreData);
            });
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
        this.books = [];
        this.readingBook = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.selectedDateRange = [];
        this.getBookBaseInfo();
      },
      menusControl(params) {
        switch (params[0]) {
          case 'timeSorted':
            this.timeSorted = !params[1];
            break;
          case 'mostComment':
            this.mostComment = params[1] ? true : undefined;
            break;
          case 'recommend':
            this.recommend = params[1] ? true : undefined;
            break;
        }
        // 清空原数据
        this.page = 0;
        this.books = [];
        this.readingBook = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.getBookBaseInfo();
      },
      dateSelect(dateRange) {
        this.selectedDateRange = dateRange;
        this.page = 0;
        this.limit_size = MAX_LIMIT_SIZE;
        this.books = [];
        this.readingBook = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.getBookBaseInfo();
      },
      dateSelectClear() {
        this.selectedDateRange = [];
        this.page = 0;
        this.limit_size = DEFAULT_LIMIT_SIZE;
        this.books = [];
        this.bannerArticles = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.getBookBaseInfo();
      }
    },
    components: {
      'book-reading-cell': BookReadingCell,
      'book-list-cell': BookListCell,
      'section-title': SectionTitle,
      'recommend': Recommend,
      'classify-menu': ClassifyMenu,
      'tag-wall': TagWall
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
