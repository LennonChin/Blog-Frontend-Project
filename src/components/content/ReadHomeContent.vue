<template>
  <div class="read-home-content layout-content">
    <i-row>
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <book-reading-cell v-for="book in readingBooks" :key="book.id" :book="book"></book-reading-cell>
          <section-title :mainTitle="'图书列表'"
                         :subTitle="'Books'"
                         :menus="menus"
                         :withRefresh="true"
                         @tipAction="viewBookList"
                         @refresh="refresh"
                         @menusControl="menusControl">
          </section-title>
          <book-cell v-for="book in books" :book="book" :key="book.id"></book-cell>
          <section-title :mainTitle="'笔记列表'"
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
  import BookReadingCell from '@/components/views/Book/BookReadingCell';
  import BookCell from '@/components/views/Book/BookCell';
  import BookNoteCell from '@/components/views/Book/BookNoteCell';
  import SectionTitle from '@/components/views/SectionTitle';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';

  // API
  import API from '@/api/client-api';

  const DEFAULT_LIMIT_SIZE = 10;
  // const MAX_LIMIT_SIZE = 100;

  export default {
    name: 'read-home-content',
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
        API.getCategorys({
          params: {
            'level_min': 1,
            'level_max': 1,
            'id': this.allCategorysInfo.filter(category => {
              return category.category_type === 'readings';
            })[0].id
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
          API.getBookBaseInfo({
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
          API.getBookNoteBaseInfo({
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
