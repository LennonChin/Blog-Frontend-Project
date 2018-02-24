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
                           @refresh="refresh"
                           @menusControl="menusControl">
            </section-title>
          </iv-affix>
          <book-list-cell v-for="book in books" :book="book" :key="book.id"></book-list-cell>
          <browse-more @browseMore="browseMore" ref="browseMore"></browse-more>
          <iv-affix style="position: relative;z-index: 12;">
            <section-title :mainTitle="'笔记列表'"
                           :subTitle="'Articles'"
                           :menus="menus"
                           :withRefresh="true"
                           @refresh="refresh"
                           @menusControl="menusControl">
            </section-title>
          </iv-affix>
          <book-note-cell v-for="bookNote in bookNotes" :bookNote="bookNote" :key="bookNote.id"></book-note-cell>
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
  import BookNoteCell from '@/components/views/Book/BookNoteCell';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import SectionTitle from '@/components/views/SectionTitle';
  import BrowseMore from '@/components/views/BrowseMore';

  // API
  import {getBookBaseInfo, getBookNoteBaseInfo, getCategorys} from '@/api/api';

  const DEFAULT_LIMIT_SIZE = 10;
  // const MAX_LIMIT_SIZE = 100;

  export default {
    data() {
      return {
        books: [],
        bookNotes: [],
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
        ]
      };
    },
    created() {
      this.getCategorys();
      this.getBookBaseInfo();
      this.getBookNoteBaseInfo();
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
      getBookNoteBaseInfo() {
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
          getBookNoteBaseInfo({
            params: {
              top_category: this.top_category,
              ordering: orderings.toString(),
              is_recommend: this.recommend,
              is_banner: false,
              limit: this.limit_size,
              offset: this.page * this.limit_size
            }
          }).then((response) => {
            this.bookNotes = this.bookNotes.concat(response.data.results);
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
      }
    },
    components: {
      'book-reading-cell': BookReadingCell,
      'book-list-cell': BookListCell,
      'book-note-cell': BookNoteCell,
      'section-title': SectionTitle,
      'recommend': Recommend,
      'classify-menu': ClassifyMenu,
      'tag-wall': TagWall,
      'browse-more': BrowseMore
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
