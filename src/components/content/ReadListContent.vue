<template>
  <div class="read-home-content layout-content">
    <i-row>
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu :categorys="categorysInfo" @selectCategory="selectCategory"
                         :defaultCategory="selected_category"></classify-menu>
          <section-title :mainTitle="$t('others.bookTitle') + $t('others.list')"
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
          <book-cell v-for="book in books" :book="book" :key="book.id"></book-cell>
          <browse-more @browseMore="browseMoreBooks" :noMoreData="noMoreBooksData" ref="browseMoreBooks"></browse-more>
          <section-title :mainTitle="$t('others.bookNoteTitle') + $t('others.list')"
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
          <book-note-cell v-for="bookNote in bookNotes" :bookNote="bookNote" :key="bookNote.id"></book-note-cell>
          <browse-more @browseMore="browseMoreBookNotes" :noMoreData="noMorebookNotesData"
                       ref="browseMoreBookNotes"></browse-more>
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
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';
  import BookCell from '@/components/views/Book/BookCell';
  import BookNoteCell from '@/components/views/Book/BookNoteCell';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import SectionTitle from '@/components/views/SectionTitle';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';
  import BrowseMore from '@/components/views/BrowseMore';

  import {
    DefaultLimitSize,
    SectionTitleDefaultMenus,
    SectionTitleDefaultDatePickerOptions
  } from '@/common/js/const';

  // mixin
  import {mixin} from '@/common/js/utils';

  export default {
    name: 'read-list-content',
    data() {
      return {
        selected_category: undefined,
        // 图书相关
        booksTimeSorted: false,
        booksMostComment: undefined,
        booksRecommend: undefined,
        booksPage: 0,
        booksMenus: SectionTitleDefaultMenus,
        booksDatePickerOptions: SectionTitleDefaultDatePickerOptions,
        booksSelectedDateRange: [],
        // 读书笔记相关
        bookNotesTimeSorted: false,
        bookNotesMostComment: undefined,
        bookNotesRecommend: undefined,
        bookNotesPage: 0,
        bookNotesMenus: SectionTitleDefaultMenus,
        bookNotesDatePickerOptions: SectionTitleDefaultDatePickerOptions,
        bookNotesSelectedDateRange: []
      };
    },
    mixins: [mixin],
    asyncData({store, route}) {
      this.selected_category = route.params.id;
      return Promise.all([
        store.dispatch('readList/GET_BOOKS_BASE_INFO', {
          params: {
            params: {
              top_category: this.selected_category,
              ordering: '-add_time',
              limit: DefaultLimitSize
            }
          },
          reset: true
        }),
        store.dispatch('readList/GET_BOOKNOTES_BASE_INFO', {
          params: {
            params: {
              top_category: this.selected_category,
              ordering: '-add_time',
              limit: DefaultLimitSize
            }
          },
          reset: true
        })
      ]);
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开时清空已有的数据
      this.clearBooksBaseInfo();
      next();
    },
    beforeRouteUpdate(to, from, next) {
      next();
      this.selected_category = this.$route.params.id;
      this.refreshBooks();
      this.refreshBookNotes();
    },
    created() {
      this.selected_category = parseInt(this.$route.params.id);
    },
    mounted() {
      if (this.$store.state.readList.books.length === 0) {
        console.log('non ssr');
        // 未SSR的情况
        this.updateBooksInfo(true);
      }
      if (this.$store.state.readList.bookNotes.length === 0) {
        console.log('non ssr');
        // 未SSR的情况
        this.updateBookNotesInfo(true);
      }
    },
    beforeDestroy() {
      // 导航离开时清空vuex中数据
      this.clearBooksBaseInfo();
    },
    computed: {
      ...mapState({
        books: state => state.readList.books,
        bookNotes: state => state.readList.bookNotes,
        totalBooksCount: state => state.readList.totalBooksCount,
        totalBookNotesCount: state => state.readList.totalBookNotesCount,
        noMoreBooksData: state => state.readList.noMoreBooksData,
        noMorebookNotesData: state => state.readList.noMorebookNotesData
      }),
      categorysInfo: function () {
        return this.allCategorysInfo.filter((category) => {
          return category.category_type === 'readings';
        });
      }
    },
    methods: {
      ...mapMutations({
        clearBooksBaseInfo: 'readList/CLAER_BOOKS_BASE_INFO'
      }),
      ...mapActions({
        getBooksBaseInfo: 'readList/GET_BOOKS_BASE_INFO',
        getBookNotesBaseInfo: 'readList/GET_BOOKNOTES_BASE_INFO'
      }),
      updateBooksInfo(reset) {
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
        this.getBooksBaseInfo({
          params: {
            params: {
              top_category: this.selected_category,
              ordering: orderings.toString(),
              is_recommend: this.booksRecommend,
              time_min: this.booksSelectedDateRange[0],
              time_max: this.booksSelectedDateRange[1],
              limit: DefaultLimitSize,
              offset: this.booksPage * DefaultLimitSize
            }
          },
          reset
        }).then(response => {
          this.$nextTick(() => {
            this.$refs.browseMoreBooks.stopLoading(this.noMoreBooksData);
          });
        }).catch(error => {
          this.$refs.browseMoreBooks.stopLoading(this.noMoreBooksData);
          console.log(error);
        });
      },
      updateBookNotesInfo(reset) {
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
        this.getBookNotesBaseInfo({
          params: {
            params: {
              top_category: this.selected_category,
              ordering: orderings.toString(),
              is_recommend: this.bookNotesRecommend,
              time_min: this.bookNotesSelectedDateRange[0],
              time_max: this.bookNotesSelectedDateRange[1],
              limit: DefaultLimitSize,
              offset: this.bookNotesPage * DefaultLimitSize
            }
          },
          reset
        }).then(response => {
          this.$nextTick(function () {
            this.$refs.browseMoreBookNotes.stopLoading(this.noMoreBookNotesData);
          });
        }).catch(error => {
          this.$refs.browseMoreBookNotes.stopLoading(this.noMoreBookNotesData);
          console.log(error);
        });
      },
      selectCategory(categoryId) {
        this.selected_category = categoryId;
        // 清空图书原数据
        this.booksTimeSorted = false;
        this.booksMostComment = undefined;
        this.booksRecommend = undefined;
        this.booksPage = 0;
        this.booksSelectedDateRange = [];
        // 清空笔记原数据
        this.bookNotesTimeSorted = false;
        this.bookNotesMostComment = undefined;
        this.bookNotesRecommend = undefined;
        this.bookNotesPage = 0;
        this.bookNotesSelectedDateRange = [];
        this.updateBooksInfo(true);
        this.updateBookNotesInfo(true);
      },
      browseMoreBooks() {
        console.log('browseMoreBooks');
        this.booksPage++;
        this.updateBooksInfo(false);
      },
      refreshBooks() {
        this.selected_category = parseInt(this.$route.params.id);
        this.booksTimeSorted = false;
        this.booksMostComment = undefined;
        this.booksRecommend = undefined;
        this.booksPage = 0;
        this.limit_size = DefaultLimitSize;
        this.booksSelectedDateRange = [];
        this.updateBooksInfo(true);
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
        this.updateBooksInfo(true);
      },
      booksDateSelect(dateRange) {
        this.booksSelectedDateRange = dateRange;
        this.booksPage = 0;
        this.updateBooksInfo(true);
      },
      booksDateSelectClear() {
        this.booksSelectedDateRange = [];
        this.booksPage = 0;
        this.updateBooksInfo(true);
      },
      browseMoreBookNotes() {
        console.log('getBookNoteBaseInfo');
        this.bookNotesPage++;
        this.updateBookNotesInfo(false);
      },
      refreshBookNotes() {
        this.selected_category = parseInt(this.$route.params.id);
        this.bookNotesTimeSorted = false;
        this.bookNotesMostComment = undefined;
        this.bookNotesRecommend = undefined;
        this.bookNotesPage = 0;
        this.limit_size = DefaultLimitSize;
        this.bookNotesSelectedDateRange = [];
        this.updateBookNotesInfo(true);
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
        this.updateBookNotesInfo(true);
      },
      bookNotesDateSelect(dateRange) {
        this.bookNotesSelectedDateRange = dateRange;
        this.bookNotesPage = 0;
        this.updateBookNotesInfo(true);
      },
      bookNotesDateSelectClear() {
        this.bookNotesSelectedDateRange = [];
        this.bookNotesPage = 0;
        this.updateBookNotesInfo(true);
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
