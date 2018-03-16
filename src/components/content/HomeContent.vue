<template>
  <div class="home-content layout-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <section-title v-if="this.specialCategory(this.$Window.__category_info__.article) !== undefined && articles.length > 0"
                         :mainTitle="this.specialCategory(this.$Window.__category_info__.article).name"
                         :subTitle="this.specialCategory(this.$Window.__category_info__.article).subname"
                         :menus="articlesTitleMenus"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshArticles"
                         @menusControl="artclesMenusControl">
          </section-title>
          <article-list-cell v-for="article in articles" :article="article" :key="article.id"></article-list-cell>
          <section-title v-if="this.specialCategory(this.$Window.__category_info__.album) !== undefined && albums.length > 0"
                         :mainTitle="this.specialCategory(this.$Window.__category_info__.album).name"
                         :subTitle="this.specialCategory(this.$Window.__category_info__.album).subname"
                         :menus="albumsTitleMenus"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshAlbums"
                         @menusControl="albumsMenusControl">
          </section-title>
          <div class="topic-cards">
            <iv-row :gutter="10">
              <iv-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="album in albums" :key="album.id">
                <topic-card :album="album"></topic-card>
              </iv-col>
            </iv-row>
          </div>
          <section-title v-if="this.specialCategory(this.$Window.__category_info__.reading) !== undefined && books.length > 0"
                         :mainTitle="this.specialCategory(this.$Window.__category_info__.reading).name"
                         :subTitle="this.specialCategory(this.$Window.__category_info__.reading).subname"
                         :menus="booksTitleMenus"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshBooks"
                         @menusControl="booksMenusControl">
          </section-title>
          <div class="books">
            <book-cell :book="book" v-for="book in books" :key="book.id"></book-cell>
          </div>
          <section-title v-if="this.specialCategory(this.$Window.__category_info__.reading) !== undefined && bookNotes.length > 0"
                         :mainTitle="this.specialCategory(this.$Window.__category_info__.reading).name + '笔记'"
                         :subTitle="this.specialCategory(this.$Window.__category_info__.reading).subname"
                         :menus="bookNotesTitleMenus"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshBookNotes"
                         @menusControl="bookNotesMenusControl">
          </section-title>
          <div class="bookNotes">
            <book-note-cell :bookNote="bookNote" v-for="bookNote in bookNotes" :key="bookNote.id"></book-note-cell>
          </div>
          <section-title v-if="this.specialCategory(this.$Window.__category_info__.reading) !== undefined && movies.length > 0"
                         :mainTitle="this.specialCategory(this.$Window.__category_info__.reading).name"
                         :subTitle="this.specialCategory(this.$Window.__category_info__.reading).subname"
                         :menus="moviesTitleMenus"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshMovies"
                         @menusControl="moviesMenusControl">
          </section-title>
          <div class="movies">
            <iv-row :gutter="10">
              <iv-col :xs="12" :sm="12" :md="8" :lg="8" v-for="movie in movies" :key="movie.id"
                      style="margin-bottom: 10px;">
                <movie-list-item :movie="movie"></movie-list-item>
              </iv-col>
            </iv-row>
          </div>
        </div>
      </iv-col>
      <iv-col :xs="24" :sm="24" :md="24" :lg="7">
        <div class="layout-right">
          <about v-if="responsiveRender(false, false, false, true)"></about>
          <recommend style="margin-top:15px;"></recommend>
          <hot style="margin-top:15px;"></hot>
          <friend-links style="margin-top:15px;"></friend-links>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import ArticleListCell from '@/components/views/Article/ArticleListCell';
  import SectionTitle from '@/components/views/SectionTitle';
  import TopicCard from '@/components/views/TopicCard';
  import BookCell from '@/components/views/Book/BookCell';
  import BookNoteCell from '@/components/views/Book/BookNoteCell';
  import MovieListItem from '@/components/views/Movie/MovieListItem';
  import About from '@/components/views/About';
  import Recommend from '@/components/views/Recommend';
  import Hot from '@/components/views/Hot';
  import FriendLinks from '@/components/views/FriendLinks';
  import SideToc from '@/components/views/SideToc';

  // API
  import {getCategory, getArticleBaseInfo, getAlbumBaseInfo, getBookBaseInfo, getBookNoteBaseInfo, getMovieBaseInfo} from '@/api/api';

  export default {
    data() {
      return {
        categorys: [],
        // 文章
        articles: [],
        mostCommentArticles: undefined,
        hotArticles: undefined,
        recommendArticles: undefined,
        articlesTitleMenus: [
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '最热', selected: false, method: 'hot'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        // 摄影
        albums: [],
        mostCommentAlbums: undefined,
        hotAlbums: undefined,
        recommendAlbums: undefined,
        albumsTitleMenus: [
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '最热', selected: false, method: 'hot'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        // 读书
        books: [],
        mostCommentBooks: undefined,
        hotBooks: undefined,
        recommendBooks: undefined,
        booksTitleMenus: [
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '最热', selected: false, method: 'hot'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        // 笔记
        bookNotes: [],
        mostCommentBookNotes: undefined,
        hotBookNotes: undefined,
        recommendBookNotes: undefined,
        bookNotesTitleMenus: [
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '最热', selected: false, method: 'hot'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        // 电影
        movies: [],
        mostCommentMovies: undefined,
        hotMovies: undefined,
        recommendMovies: undefined,
        moviesTitleMenus: [
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '最热', selected: false, method: 'hot'},
          {title: '推荐', selected: false, method: 'recommend'}
        ]
      };
    },
    created() {
      this.getDatas();
    },
    methods: {
      getDatas() {
        // 分类
        getCategory({
          params: {
            level_min: 1,
            level_max: 1
          }
        }).then((response) => {
          this.categorys = response.data.results;
        }).catch((error) => {
          console.log(error);
        });
        this.getArticleBaseInfo();
        this.getAlbumBaseInfo();
        this.getBookBaseInfo();
        this.getBookNoteBaseInfo();
        this.getMovieBaseInfo();
      },
      getArticleBaseInfo() {
        // 文章
        getArticleBaseInfo({
          params: {
            is_recommend: this.recommendArticles,
            is_hot: this.hotArticles,
            ordering: this.mostCommentArticles,
            limit: 5,
            offset: 0
          }
        }).then((response) => {
          this.articles = response.data.results;
        }).catch((error) => {
          console.log(error);
        });
      },
      getAlbumBaseInfo() {
        // 图集
        getAlbumBaseInfo({
          params: {
            is_recommend: this.recommendAlbums,
            is_hot: this.hotAlbums,
            ordering: this.mostCommentAlbums,
            limit: 6,
            offset: 0
          }
        }).then((response) => {
          this.albums = response.data.results;
        }).catch((error) => {
          console.log(error);
        });
      },
      getBookBaseInfo() {
        // 读书
        getBookBaseInfo({
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 6,
            offset: 0
          }
        }).then((response) => {
          this.books = response.data.results;
        }).catch((error) => {
          console.log(error);
        });
      },
      getBookNoteBaseInfo() {
        // 读书笔记
        getBookNoteBaseInfo({
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 6,
            offset: 0
          }
        }).then((response) => {
          this.bookNotes = response.data.results;
        }).catch((error) => {
          console.log(error);
        });
      },
      getMovieBaseInfo() {
        // 电影
        getMovieBaseInfo({
          params: {
            is_recommend: this.recommendMovies,
            is_hot: this.hotMovies,
            ordering: this.mostCommentMovies,
            limit: 6,
            offset: 0
          }
        }).then((response) => {
          this.movies = response.data.results;
        }).catch((error) => {
          console.log(error);
        });
      },
      refreshArticles() {
        this.mostCommentArticles = undefined;
        this.hotArticles = undefined;
        this.recommendArticles = undefined;
        this.getArticleBaseInfo();
      },
      refreshAlbums() {
        this.mostCommentAlbums = undefined;
        this.hotAlbums = undefined;
        this.recommendAlbums = undefined;
        this.getAlbumBaseInfo();
      },
      refreshBooks() {
        this.mostCommentBooks = undefined;
        this.hotBooks = undefined;
        this.recommendBooks = undefined;
        this.getBookBaseInfo();
      },
      refreshBookNotes() {
        this.mostCommentBookNotes = undefined;
        this.hotBookNotes = undefined;
        this.recommendBookNotes = undefined;
        this.getBookNoteBaseInfo();
      },
      refreshMovies() {
        this.mostCommentMovies = undefined;
        this.hotMovies = undefined;
        this.recommendMovies = undefined;
        this.getMovieBaseInfo();
      },
      specialCategory(id) {
        if (this.categorys.length === 0) return undefined;
        return this.categorys.filter((category) => {
          return category.id === id;
        })[0];
      },
      artclesMenusControl(params) {
        switch (params[0]) {
          case 'mostComment':
            this.mostCommentArticles = params[1] ? '-comment_num' : undefined;
            break;
          case 'hot':
            this.hotArticles = params[1] ? true : undefined;
            break;
          case 'recommend':
            this.recommendArticles = params[1] ? true : undefined;
            break;
        }
        this.getArticleBaseInfo();
      },
      albumsMenusControl(params) {
        switch (params[0]) {
          case 'mostComment':
            this.mostCommentAlbums = params[1] ? '-comment_num' : undefined;
            break;
          case 'hot':
            this.hotAlbums = params[1] ? true : undefined;
            break;
          case 'recommend':
            this.recommendAlbums = params[1] ? true : undefined;
            break;
        }
        this.getAlbumBaseInfo();
      },
      booksMenusControl(params) {
        switch (params[0]) {
          case 'mostComment':
            this.mostCommentBooks = params[1] ? '-comment_num' : undefined;
            break;
          case 'hot':
            this.hotBooks = params[1] ? true : undefined;
            break;
          case 'recommend':
            this.recommendBooks = params[1] ? true : undefined;
            break;
        }
        this.getBookBaseInfo();
      },
      bookNotesMenusControl(params) {
        switch (params[0]) {
          case 'mostComment':
            this.mostCommentBookNotes = params[1] ? '-comment_num' : undefined;
            break;
          case 'hot':
            this.hotBookNotes = params[1] ? true : undefined;
            break;
          case 'recommend':
            this.recommendBookNotes = params[1] ? true : undefined;
            break;
        }
        this.getBookNoteBaseInfo();
      },
      moviesMenusControl(params) {
        switch (params[0]) {
          case 'mostComment':
            this.mostCommentMovies = params[1] ? '-comment_num' : undefined;
            break;
          case 'hot':
            this.hotMovies = params[1] ? true : undefined;
            break;
          case 'recommend':
            this.recommendMovies = params[1] ? true : undefined;
            break;
        }
        this.getMovieBaseInfo();
      }
    },
    components: {
      'article-list-cell': ArticleListCell,
      'section-title': SectionTitle,
      'topic-card': TopicCard,
      'book-cell': BookCell,
      'book-note-cell': BookNoteCell,
      'movie-list-item': MovieListItem,
      'about': About,
      'recommend': Recommend,
      'hot': Hot,
      'friend-links': FriendLinks,
      'side-toc': SideToc
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
</style>
