<template>
  <div class="read-home-content layout-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <book-reading-cell v-for="book in readingBooks" :key="book.id" :book="book"></book-reading-cell>
          <iv-affix style="position: relative;z-index: 12;">
            <section-title :mainTitle="'图书列表'"
                           :subTitle="'Books'"
                           :menus="menus"
                           :withRefresh="true"
                           @tipAction="viewBookList"
                           @refresh="refresh"
                           @menusControl="menusControl">
            </section-title>
          </iv-affix>
          <book-cell v-for="book in books" :book="book" :key="book.id"></book-cell>
          <iv-affix style="position: relative;z-index: 12;">
            <section-title :mainTitle="'笔记列表'"
                           :subTitle="'Book Notes'"
                           :menus="menus"
                           :withRefresh="true"
                           @tipAction="viewBookNoteList"
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
  import BookCell from '@/components/views/Book/BookCell';
  import BookNoteCell from '@/components/views/Book/BookNoteCell';
  import SectionTitle from '@/components/views/SectionTitle';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';

  // API
  import {getBookBaseInfo, getBookNoteBaseInfo, getCategorys} from '@/api/api';

  const DEFAULT_LIMIT_SIZE = 10;
  // const MAX_LIMIT_SIZE = 100;

  export default {
    data() {
      return {
        books: [],
        bookNotes: [],
        readingBooks: [],
        categorys: undefined,
        timeSorted: false,
        mostComment: undefined,
        recommend: undefined,
        limit_size: DEFAULT_LIMIT_SIZE,
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
              ordering: orderings.toString(),
              is_recommend: this.recommend,
              is_banner: false,
              limit: this.limit_size
            }
          }).then((response) => {
            this.reduceBooks(response.data.results);
          }).catch((error) => {
            console.log(error);
          });
        }
      },
      reduceBooks(books) {
        books.map((book) => {
          if (book.is_reading) {
            this.readingBooks.push(book);
          } else {
            this.books.push(book);
          }
        });
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
              ordering: orderings.toString(),
              is_recommend: this.recommend,
              is_banner: false,
              limit: this.limit_size
            }
          }).then((response) => {
            this.bookNotes = this.bookNotes.concat(response.data.results);
          }).catch((error) => {
            console.log(error);
          });
        }
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
        this.books = [];
        this.readingBook = [];
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
        this.books = [];
        this.readingBook = [];
        this.getBookBaseInfo();
      }
    },
    components: {
      'book-reading-cell': BookReadingCell,
      'book-cell': BookCell,
      'book-note-cell': BookNoteCell,
      'section-title': SectionTitle,
      'recommend': Recommend,
      'tag-wall': TagWall
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
