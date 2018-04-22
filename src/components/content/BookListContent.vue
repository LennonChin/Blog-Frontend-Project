<template>
  <div class="book-list-content layout-content">
    <i-row>
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu :categorys="categorys" @selectCategory="selectCategory"
                         :defaultCategory="top_category"></classify-menu>
          <i-affix style="position: relative;z-index: 12;">
            <section-title :mainTitle="'图书列表'"
                           :subTitle="'Books'"
                           :menus="booksMenus"
                           :withRefresh="true"
                           :withTimeSelect="true"
                           :datePickerOptions="booksDatePickerOptions"
                           @refresh="refreshBooks"
                           @menusControl="booksMenusControl"
                           @comfirmDateSelect="booksDateSelect"
                           @clearDateSelect="booksDateSelectClear">
            </section-title>
          </i-affix>
          <book-cell v-for="book in books" :book="book" :key="book.id"></book-cell>
          <browse-more @browseMore="browseMoreBooks" ref="browseMoreBooks"></browse-more>
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
  import BookCell from '@/components/views/Book/BookCell';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import SectionTitle from '@/components/views/SectionTitle';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';
  import BrowseMore from '@/components/views/BrowseMore';

  // API
  import API from '@/api/client-api';

  const DEFAULT_LIMIT_SIZE = 10;
//  const MAX_LIMIT_SIZE = 100;

  export default {
    data() {
      return {
        books: [],
        bookNotes: [],
        categorys: undefined,
        top_category: undefined,
        limit_size: DEFAULT_LIMIT_SIZE,
        // 图书相关
        booksTimeSorted: false,
        booksMostComment: undefined,
        booksRecommend: undefined,
        booksPage: 0,
        booksTotalCount: 0,
        noMoreBooksData: false,
        booksMenus: [
          {title: '顺序', selectedTitle: '逆序', selected: true, method: 'timeSorted'},
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        booksDatePickerOptions: {
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
        booksSelectedDateRange: []
      };
    },
    created() {
      this.top_category = parseInt(this.$route.params.id);
      this.getDatas();
    },
    methods: {
      selectCategory(categoryId) {
        this.top_category = categoryId;
        // 清空图书原数据
        this.booksTimeSorted = false;
        this.booksMostComment = undefined;
        this.booksRecommend = undefined;
        this.booksPage = 0;
        this.books = [];
        this.booksTotalCount = 0;
        this.noMoreBooksData = false;
        this.booksSelectedDateRange = [];
        this.getBookBaseInfo();
      },
      getDatas() {
        this.getCategorys();
        this.getBookBaseInfo();
      },
      getCategorys() {
        API.getCategorys({
          params: {
            'level_min': 1,
            'level_max': 1,
            'id': this.$Window.__category_info__.reading
          }
        }).then((response) => {
          this.categorys = response.data.results;
        }).catch((error) => {
          console.log(error);
        });
      },
      getBookBaseInfo() {
        if (!this.noMoreBooksData) {
          // 排序条件
          let orderings = [];
          if (this.booksTimeSorted) {
            orderings.push('add_time');
          } else {
            orderings.push('-add_time');
          }
          if (this.booksMostComment !== undefined) {
            if (this.booksMostComment) {
              orderings.push('comment_num');
            } else {
              orderings.push('-comment_num');
            }
          }
          API.getBookBaseInfo({
            params: {
              top_category: this.top_category,
              ordering: orderings.toString(),
              is_recommend: false,
              time_min: this.booksSelectedDateRange[0],
              time_max: this.booksSelectedDateRange[1],
              limit: this.limit_size,
              offset: this.booksPage * this.limit_size
            }
          }).then((response) => {
            this.books = this.books.concat(response.data.results);
            this.booksTotalCount += response.data.results.length;
            this.noMoreBooksData = this.booksTotalCount >= response.data.count;
            this.$refs.browseMoreBooks.stopLoading(this.noMoreBooksData);
          }).catch((error) => {
            console.log(error);
          });
        }
      },
      browseMoreBooks() {
        console.log('browseMoreBooks');
        this.booksPage++;
        this.getBookBaseInfo();
      },
      refreshBooks() {
        this.top_category = parseInt(this.$route.params.id);
        this.booksTimeSorted = false;
        this.booksMostComment = undefined;
        this.booksRecommend = undefined;
        this.booksPage = 0;
        this.books = [];
        this.booksTotalCount = 0;
        this.noMoreBooksData = false;
        this.booksSelectedDateRange = [];
        this.getCategorys();
        this.getBookBaseInfo();
      },
      booksMenusControl(params) {
        switch (params[0]) {
          case 'timeSorted':
            this.booksTimeSorted = !params[1];
            break;
          case 'mostComment':
            this.booksMostComment = params[1];
            break;
          case 'recommend':
            this.booksRecommend = params[1];
            break;
        }
        // 清空原数据
        this.booksPage = 0;
        this.books = [];
        this.booksTotalCount = 0;
        this.noMoreBooksData = false;
        this.getBookBaseInfo();
      },
      booksDateSelect(dateRange) {
        this.booksSelectedDateRange = dateRange;
        this.booksPage = 0;
        this.limit_size = DEFAULT_LIMIT_SIZE;
        this.books = [];
        this.booksTotalCount = 0;
        this.noMoreBooksData = false;
        this.getBookBaseInfo();
      },
      booksDateSelectClear() {
        this.booksSelectedDateRange = [];
        this.booksPage = 0;
        this.limit_size = DEFAULT_LIMIT_SIZE;
        this.books = [];
        this.booksTotalCount = 0;
        this.noMoreBooksData = false;
        this.getBookBaseInfo();
      }
    },
    components: {
      'book-cell': BookCell,
      'classify-menu': ClassifyMenu,
      'section-title': SectionTitle,
      'recommend': Recommend,
      'tag-wall': TagWall,
      'browse-more': BrowseMore
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
