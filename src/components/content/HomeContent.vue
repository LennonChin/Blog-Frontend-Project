<template>
  <div class="home-content layout-content">
    <i-row>
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <section-title v-if="this.specialCategory(1) !== undefined && articles.length > 0"
                         :mainTitle="this.specialCategory(1).name"
                         :subTitle="this.specialCategory(1).subname"
                         :menus="articlesTitleMenus"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshArticles"
                         @menusControl="artclesMenusControl">
          </section-title>
          <article-list-cell v-for="article in articles" :article="article" :key="article.id"></article-list-cell>
          <section-title v-if="this.specialCategory(3) !== undefined && albums.length > 0"
                         :mainTitle="this.specialCategory(3).name"
                         :subTitle="this.specialCategory(3).subname"
                         :menus="albumsTitleMenus"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshAlbums"
                         @menusControl="albumsMenusControl">
          </section-title>
          <div class="topic-cards">
            <i-row :gutter="10">
              <i-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="album in albums" :key="album.id">
                <topic-card :album="album"></topic-card>
              </i-col>
            </i-row>
          </div>
          <section-title v-if="this.specialCategory(2) !== undefined && books.length > 0"
                         :mainTitle="this.specialCategory(2).name"
                         :subTitle="this.specialCategory(2).subname"
                         :menus="booksTitleMenus"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshBooks"
                         @menusControl="booksMenusControl">
          </section-title>
          <div class="books">
            <book-cell :book="book" v-for="book in books" :key="book.id"></book-cell>
          </div>
          <section-title v-if="this.specialCategory(2) !== undefined && bookNotes.length > 0"
                         :mainTitle="this.specialCategory(2).name + '笔记'"
                         :subTitle="this.specialCategory(2).subname"
                         :menus="bookNotesTitleMenus"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshBookNotes"
                         @menusControl="bookNotesMenusControl">
          </section-title>
          <div class="bookNotes">
            <book-note-cell :bookNote="bookNote" v-for="bookNote in bookNotes" :key="bookNote.id"></book-note-cell>
          </div>
          <section-title v-if="this.specialCategory(2) !== undefined && movies.length > 0"
                         :mainTitle="this.specialCategory(2).name"
                         :subTitle="this.specialCategory(2).subname"
                         :menus="moviesTitleMenus"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshMovies"
                         @menusControl="moviesMenusControl">
          </section-title>
          <div class="movies">
            <i-row :gutter="10">
              <i-col :xs="12" :sm="12" :md="8" :lg="8" v-for="movie in movies" :key="movie.id"
                     style="margin-bottom: 10px;">
                <movie-list-item :movie="movie"></movie-list-item>
              </i-col>
            </i-row>
          </div>
        </div>
      </i-col>
      <i-col :xs="24" :sm="24" :md="24" :lg="7">
        <div class="layout-right">
          <about></about>
          <recommend style="margin-top:15px;"></recommend>
          <hot style="margin-top:15px;"></hot>
          <friend-links style="margin-top:15px;"></friend-links>
        </div>
      </i-col>
    </i-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapState,
    mapActions
  } from 'vuex';
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

  export default {
    name: 'HomeContent',
    metaInfo: {
      title: '首页'
    },
    data() {
      return {
        // 文章
        mostCommentArticles: undefined,
        hotArticles: undefined,
        recommendArticles: undefined,
        articlesTitleMenus: [
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '最热', selected: false, method: 'hot'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        // 摄影
        mostCommentAlbums: undefined,
        hotAlbums: undefined,
        recommendAlbums: undefined,
        albumsTitleMenus: [
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '最热', selected: false, method: 'hot'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        // 读书
        mostCommentBooks: undefined,
        hotBooks: undefined,
        recommendBooks: undefined,
        booksTitleMenus: [
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '最热', selected: false, method: 'hot'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        // 笔记
        mostCommentBookNotes: undefined,
        hotBookNotes: undefined,
        recommendBookNotes: undefined,
        bookNotesTitleMenus: [
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '最热', selected: false, method: 'hot'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        // 电影
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
    asyncData({store}) {
      return Promise.all([
        store.dispatch('home/getTopLevelCategoriesInfo', {
          params: {
            level_min: 1,
            level_max: 1
          }
        }),
        store.dispatch('home/getArticlesBaseInfo', {
          params: {
            is_recommend: this.recommendArticles,
            is_hot: this.hotArticles,
            ordering: this.mostCommentArticles,
            limit: 5,
            offset: 0
          }
        }),
        store.dispatch('home/getBooksBaseInfo', {
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 6,
            offset: 0
          }
        }),
        store.dispatch('home/getBookNotesBaseInfo', {
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 6,
            offset: 0
          }
        }),
        store.dispatch('home/getAlbumsBaseInfo', {
          params: {
            is_recommend: this.recommendAlbums,
            is_hot: this.hotAlbums,
            ordering: this.mostCommentAlbums,
            limit: 6,
            offset: 0
          }
        }),
        store.dispatch('home/getMoviesBaseInfo', {
          params: {
            is_recommend: this.recommendMovies,
            is_hot: this.hotMovies,
            ordering: this.mostCommentMovies,
            limit: 6,
            offset: 0
          }
        })
      ]);
    },
    computed: {
      ...mapState({
        categorys: state => state.home.topLevelCategoriesInfo,
        articles: state => state.home.articles,
        books: state => state.home.books,
        bookNotes: state => state.home.bookNotes,
        albums: state => state.home.albums,
        movies: state => state.home.movies
      })
    },
    methods: {
      ...mapActions({
        getTopLevelCategoriesInfo: 'home/getTopLevelCategoriesInfo',
        getArticlesBaseInfo: 'home/getArticlesBaseInfo',
        getBooksBaseInfo: 'home/getBooksBaseInfo',
        getBookNotesBaseInfo: 'home/getBookNotesBaseInfo',
        getAlbumsBaseInfo: 'home/getAlbumsBaseInfo',
        getMoviesBaseInfo: 'home/getMoviesBaseInfo'
      }),
      refreshArticles() {
        this.mostCommentArticles = undefined;
        this.hotArticles = undefined;
        this.recommendArticles = undefined;
        this.getArticlesBaseInfo({
          params: {
            is_recommend: this.recommendArticles,
            is_hot: this.hotArticles,
            ordering: this.mostCommentArticles,
            limit: 5,
            offset: 0
          }
        });
      },
      refreshAlbums() {
        this.mostCommentAlbums = undefined;
        this.hotAlbums = undefined;
        this.recommendAlbums = undefined;
        this.getAlbumsBaseInfo({
          params: {
            is_recommend: this.recommendAlbums,
            is_hot: this.hotAlbums,
            ordering: this.mostCommentAlbums,
            limit: 6,
            offset: 0
          }
        });
      },
      refreshBooks() {
        this.mostCommentBooks = undefined;
        this.hotBooks = undefined;
        this.recommendBooks = undefined;
        this.getBooksBaseInfo({
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 6,
            offset: 0
          }
        });
      },
      refreshBookNotes() {
        this.mostCommentBookNotes = undefined;
        this.hotBookNotes = undefined;
        this.recommendBookNotes = undefined;
        this.getBookNotesBaseInfo({
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 6,
            offset: 0
          }
        });
      },
      refreshMovies() {
        this.mostCommentMovies = undefined;
        this.hotMovies = undefined;
        this.recommendMovies = undefined;
        this.getMoviesBaseInfo({
          params: {
            is_recommend: this.recommendMovies,
            is_hot: this.hotMovies,
            ordering: this.mostCommentMovies,
            limit: 6,
            offset: 0
          }
        });
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
        this.getArticlesBaseInfo({
          params: {
            is_recommend: this.recommendArticles,
            is_hot: this.hotArticles,
            ordering: this.mostCommentArticles,
            limit: 5,
            offset: 0
          }
        });
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
        this.getAlbumsBaseInfo({
          params: {
            is_recommend: this.recommendAlbums,
            is_hot: this.hotAlbums,
            ordering: this.mostCommentAlbums,
            limit: 6,
            offset: 0
          }
        });
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
        this.getBooksBaseInfo({
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 6,
            offset: 0
          }
        });
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
        this.getBookNotesBaseInfo({
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 6,
            offset: 0
          }
        });
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
        this.getMoviesBaseInfo({
          params: {
            is_recommend: this.recommendMovies,
            is_hot: this.hotMovies,
            ordering: this.mostCommentMovies,
            limit: 6,
            offset: 0
          }
        });
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
