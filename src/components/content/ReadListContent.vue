<template>
  <div class="read-home-content layout-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu :categorys="categorys" @selectCategory="selectCategory"
                         :defaultCategory="top_category"></classify-menu>
          <iv-affix style="position: relative;z-index: 12;">
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
          </iv-affix>
          <book-cell v-for="book in books" :book="book" :key="book.id"></book-cell>
          <browse-more @browseMore="browseMoreBooks" ref="browseMoreBooks"></browse-more>
          <iv-affix style="position: relative;z-index: 12;">
            <section-title :mainTitle="'笔记列表'"
                           :subTitle="'Book Notes'"
                           :menus="bookNotesMenus"
                           :withRefresh="true"
                           :withTimeSelect="true"
                           :datePickerOptions="bookNotesDatePickerOptions"
                           @refresh="refreshBookNotes"
                           @menusControl="bookNotesMenusControl"
                           @comfirmDateSelect="bookNotesDateSelect"
                           @clearDateSelect="bookNotesDateSelectClear">
            </section-title>
          </iv-affix>
          <book-note-cell v-for="bookNote in bookNotes" :bookNote="bookNote" :key="bookNote.id"></book-note-cell>
          <browse-more @browseMore="browseMoreBookNotes" ref="browseMoreBookNotes"></browse-more>
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
  import BookCell from '@/components/views/Book/BookCell';
  import BookNoteCell from '@/components/views/Book/BookNoteCell';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import SectionTitle from '@/components/views/SectionTitle';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';
  import BrowseMore from '@/components/views/BrowseMore';

  // API
  import {getBookBaseInfo, getBookNoteBaseInfo, getCategorys} from '@/api/api';

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
        booksSelectedDateRange: [],
        // 读书笔记相关
        bookNotesTimeSorted: false,
        bookNotesMostComment: undefined,
        bookNotesRecommend: undefined,
        bookNotesPage: 0,
        bookNotesTotalCount: 0,
        noMorebookNotesData: false,
        bookNotesMenus: [
          {title: '顺序', selectedTitle: '逆序', selected: true, method: 'timeSorted'},
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        bookNotesDatePickerOptions: {
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
        bookNotesSelectedDateRange: []
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
        // 清空笔记原数据
        this.bookNotesTimeSorted = false;
        this.bookNotesMostComment = undefined;
        this.bookNotesRecommend = undefined;
        this.bookNotesPage = 0;
        this.bookNotes = [];
        this.bookNotesTotalCount = 0;
        this.noMoreBookNotesData = false;
        this.bookNotesSelectedDateRange = [];
        this.getBookBaseInfo();
        this.getBookNoteBaseInfo();
      },
      getDatas() {
        this.getCategorys();
        this.getBookBaseInfo();
        this.getBookNoteBaseInfo();
      },
      getCategorys() {
        getCategorys({
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
          getBookBaseInfo({
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
      },
      getBookNoteBaseInfo() {
        if (!this.noMoreBookNotesData) {
          // 排序条件
          let orderings = [];
          if (this.bookNotesTimeSorted) {
            orderings.push('add_time');
          } else {
            orderings.push('-add_time');
          }
          if (this.bookNotesMostComment !== undefined) {
            if (this.bookNotesMostComment) {
              orderings.push('comment_num');
            } else {
              orderings.push('-comment_num');
            }
          }
          getBookNoteBaseInfo({
            params: {
              top_category: this.top_category,
              ordering: orderings.toString(),
              is_recommend: false,
              time_min: this.bookNotesSelectedDateRange[0],
              time_max: this.bookNotesSelectedDateRange[1],
              limit: this.limit_size,
              offset: this.bookNotesPage * this.limit_size
            }
          }).then((response) => {
            this.bookNotes = this.bookNotes.concat(response.data.results);
            this.bookNotesTotalCount += response.data.results.length;
            this.noMoreBookNotesData = this.bookNotesTotalCount >= response.data.count;
            this.$refs.browseMoreBookNotes.stopLoading(this.noMoreBookNotesData);
          }).catch((error) => {
            console.log(error);
          });
        }
      },
      browseMoreBookNotes() {
        console.log('getBookNoteBaseInfo');
        this.bookNotesPage++;
        this.getBookNoteBaseInfo();
      },
      refreshBookNotes() {
        this.top_category = parseInt(this.$route.params.id);
        this.bookNotesTimeSorted = false;
        this.bookNotesMostComment = undefined;
        this.bookNotesRecommend = undefined;
        this.bookNotesPage = 0;
        this.bookNotes = [];
        this.bookNotesTotalCount = 0;
        this.noMoreBookNotesData = false;
        this.bookNotesSelectedDateRange = [];
        this.getCategorys();
        this.getBookNoteBaseInfo();
      },
      bookNotesMenusControl(params) {
        switch (params[0]) {
          case 'timeSorted':
            this.bookNotesTimeSorted = !params[1];
            break;
          case 'mostComment':
            this.bookNotesMostComment = params[1];
            break;
          case 'recommend':
            this.bookNotesRecommend = params[1];
            break;
        }
        // 清空原数据
        this.bookNotesPage = 0;
        this.bookNotes = [];
        this.bookNotesTotalCount = 0;
        this.noMoreBookNotesData = false;
        this.getBookNoteBaseInfo();
      },
      bookNotesDateSelect(dateRange) {
        this.bookNotesSelectedDateRange = dateRange;
        this.bookNotesPage = 0;
        this.limit_size = DEFAULT_LIMIT_SIZE;
        this.bookNotes = [];
        this.bookNotesTotalCount = 0;
        this.noMoreBooksData = false;
        this.getBookNoteBaseInfo();
      },
      bookNotesDateSelectClear() {
        this.bookNotesSelectedDateRange = [];
        this.bookNotesPage = 0;
        this.limit_size = DEFAULT_LIMIT_SIZE;
        this.bookNotes = [];
        this.bookNotesTotalCount = 0;
        this.noMoreBookNotesData = false;
        this.getBookNoteBaseInfo();
      }
    },
    components: {
      'book-cell': BookCell,
      'book-note-cell': BookNoteCell,
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
