<template>
  <div class="read-home-content layout-content">
    <i-row>
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <div v-swiper="swiperOption" :instanceName="'swiper'" class="book-gallery">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="book in readingBooks" :key="book.id">
                <book-reading-cell :book="book"></book-reading-cell>
              </div>
            </div>
            <div class="swiper-pagination" slot="pagination"></div>
          </div>
          <classify-menu :categorys="categorysInfo" @selectCategory="selectCategory"
                         :defaultCategory="selected_category"></classify-menu>
          <section-title :mainTitle="$t('others.bookTitle') + $t('others.list')"
                         :subTitle="'Books'"
                         :menus="menus"
                         :withRefresh="true"
                         @tipAction="viewBookList"
                         @refresh="refresh"
                         @menusControl="menusControl">
          </section-title>
          <book-cell v-for="book in books" :book="book" :key="book.id"></book-cell>
          <section-title :mainTitle="$t('others.bookNoteTitle') + $t('others.list')"
                         :subTitle="'Book Notes'"
                         :menus="menus"
                         :withRefresh="true"
                         @tipAction="viewBookNoteList"
                         @refresh="refresh"
                         @menusControl="menusControl">
          </section-title>
          <book-note-cell v-for="bookNote in bookNotes" :bookNote="bookNote" :key="bookNote.id"></book-note-cell>
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
  import Vue from 'vue';
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';
  import BookReadingCell from '@/components/views/Book/BookReadingCell';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import BookCell from '@/components/views/Book/BookCell';
  import BookNoteCell from '@/components/views/Book/BookNoteCell';
  import SectionTitle from '@/components/views/SectionTitle';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';

  import {
    DefaultLimitSize,
    SectionTitleDefaultMenus
  } from '@/common/js/const';

  // mixin
  import {mixin} from '@/common/js/utils';

  if (process.browser) {
    require('swiper/dist/css/swiper.css');
    Vue.use(require('vue-awesome-swiper/dist/ssr'));
  }

  export default {
    name: 'read-home-content',
    data() {
      return {
        selected_category: undefined,
        timeSorted: false,
        mostComment: undefined,
        recommend: undefined,
        limit_size: DefaultLimitSize,
        menus: SectionTitleDefaultMenus,
        swiperOption: {
          lazy: false,
          centeredSlides: true,
          loop: true,
          effect: 'fade',
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      };
    },
    mixins: [mixin],
    beforeRouteLeave(to, from, next) {
      // 导航离开时清空已有的数据
      this.clearBooksInfo();
      this.clearBookNotesInfo();
      next();
    },
    asyncData({store}) {
      this.selected_category = 2;
      return Promise.all([
        store.dispatch('readHome/GET_BOOKS_BASE_INFO', {
          params: {
            params: {
              top_category: this.selected_category,
              ordering: '-add_time',
              limit: DefaultLimitSize
            }
          },
          reset: true
        }),
        store.dispatch('readHome/GET_BOOKNOTES_BASE_INFO', {
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
    created() {
      // 设置默认的分类id
      this.selected_category = this.categorysInfo[0].id;
    },
    mounted() {
      if (this.$store.state.readHome.books.length + this.$store.state.readHome.bookNotes.length === 0) {
        console.log('non ssr');
        // 未SSR的情况
        this.updateBooksInfo(true);
        this.updateBookNotesInfo(true);
      }
    },
    beforeDestroy() {
      // 导航离开时清空vuex中数据
      this.clearBooksInfo();
      this.clearBookNotesInfo();
    },
    computed: {
      ...mapState({
        books: state => state.readHome.books,
        bookNotes: state => state.readHome.bookNotes,
        readingBooks: state => state.readHome.readingBooks
      }),
      categorysInfo: function() {
        return this.allCategorysInfo.filter((category) => {
          return category.category_type === 'readings';
        });
      }
    },
    methods: {
      ...mapMutations({
        clearBooksInfo: 'readHome/CLAER_BOOKS_BASE_INFO',
        clearBookNotesInfo: 'readHome/CLAER_BOOKNOTES_BASE_INFO'
      }),
      ...mapActions({
        getBooksBaseInfo: 'readHome/GET_BOOKS_BASE_INFO',
        getBookNotesBaseInfo: 'readHome/GET_BOOKNOTES_BASE_INFO'
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
              is_recommend: this.recommend,
              is_banner: false,
              limit: this.limit_size
            }
          },
          reset
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
              is_recommend: this.recommend,
              is_banner: false,
              limit: this.limit_size
            }
          },
          reset
        });
      },
      selectCategory(categoryId) {
        this.selected_category = categoryId;
        this.updateBooksInfo(true);
        this.updateBookNotesInfo(true);
      },
      viewBookList() {
        alert('booklist');
      },
      viewBookNoteList() {
        alert('viewBookNoteList');
      },
      refresh() {
        this.timeSorted = false;
        this.mostComment = undefined;
        this.recommend = undefined;
        this.updateBooksInfo(true);
        this.updateBookNotesInfo(true);
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
        this.updateBooksInfo(true);
        this.updateBookNotesInfo(true);
      }
    },
    components: {
      'book-reading-cell': BookReadingCell,
      'classify-menu': ClassifyMenu,
      'book-cell': BookCell,
      'book-note-cell': BookNoteCell,
      'section-title': SectionTitle,
      'recommend': Recommend,
      'tag-wall': TagWall
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  .read-home-content
    .book-gallery
      margin-bottom 8px
      .swiper-pagination-bullet
        background $default-background-color
      .swiper-pagination-bullet-active
        background $default-background-color
</style>
