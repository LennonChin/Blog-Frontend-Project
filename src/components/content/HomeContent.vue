<template>
  <div class="home-content layout-content" v-if="showPage">
    <i-row>
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <!-- 文章 -->
          <section-title v-if="this.specialCategory('articles') !== undefined && articles.length > 0"
                         :mainTitle="this.specialCategory('articles')[resolveI18N('name')]"
                         :subTitle="this.specialCategory('articles').en_name"
                         :menus="articlesTitleMenus"
                         :to="{'name': this.specialCategory('articles').category_type}"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshArticles"
                         @menusControl="artclesMenusControl">
          </section-title>
          <article-list-cell v-for="article in articles" :article="article" :key="article.id"></article-list-cell>
          <!-- 图集 -->
          <section-title v-if="this.specialCategory('albums') !== undefined && albums.length > 0"
                         :mainTitle="this.specialCategory('albums')[resolveI18N('name')]"
                         :subTitle="this.specialCategory('albums').en_name"
                         :menus="albumsTitleMenus"
                         :to="{'name': this.specialCategory('albums').category_type}"
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
          <!-- 图书 -->
          <section-title v-if="this.specialCategory('readings') !== undefined && books.length > 0"
                         :mainTitle="this.specialCategory('readings')[resolveI18N('name')]"
                         :subTitle="this.specialCategory('readings').en_name"
                         :menus="booksTitleMenus"
                         :to="{'name': this.specialCategory('readings').category_type}"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshBooks"
                         @menusControl="booksMenusControl">
          </section-title>
          <div class="books">
            <book-cell :book="book" v-for="book in books" :key="book.id"></book-cell>
          </div>
          <!-- 阅读笔记 -->
          <section-title v-if="this.specialCategory('readings') !== undefined && bookNotes.length > 0"
                         :mainTitle="$t('others.bookNoteTitle')"
                         :subTitle="'Note'"
                         :menus="bookNotesTitleMenus"
                         :to="{'name': this.specialCategory('readings').category_type}"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshBookNotes"
                         @menusControl="bookNotesMenusControl">
          </section-title>
          <div class="bookNotes">
            <book-note-cell :bookNote="bookNote" v-for="bookNote in bookNotes" :key="bookNote.id"></book-note-cell>
          </div>
          <!-- 电影 -->
          <section-title v-if="this.specialCategory('movies') !== undefined && movies.length > 0"
                         :mainTitle="this.specialCategory('movies')[resolveI18N('name')]"
                         :subTitle="this.specialCategory('movies').en_name"
                         :menus="moviesTitleMenus"
                         :to="{'name': this.specialCategory('movies').category_type}"
                         :withRefresh="true"
                         :withTimeSelect="false"
                         @refresh="refreshMovies"
                         @menusControl="moviesMenusControl">
          </section-title>
          <div class="movies">
            <i-row :gutter="10">
              <i-col :xs="24" :sm="12" :md="8" :lg="8" v-for="movie in movies" :key="movie.id"
                     style="margin-bottom: 10px;">
                <movie-list-item :movie="movie"></movie-list-item>
              </i-col>
            </i-row>
          </div>
        </div>
      </i-col>
      <i-col :xs="24" :sm="24" :md="24" :lg="7">
        <div class="layout-right" v-if="showPage">
          <about></about>
          <recommend style="margin-top:15px;"></recommend>
          <hot style="margin-top:15px;"></hot>
					<tag-wall style="margin-top: 15px;"></tag-wall>
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
  import TagWall from '@/components/views/TagWall';
  import FriendLinks from '@/components/views/FriendLinks';
  import SideToc from '@/components/views/SideToc';

  // mixin
  import {mixin} from '@/common/js/utils';

  export default {
    name: 'home-content',
    data() {
      return {
        // 文章
        mostCommentArticles: undefined,
        hotArticles: undefined,
        recommendArticles: undefined,
        articlesTitleMenus: [
          {title: 'article.filter.mostComment', selected: false, method: 'mostComment'},
          {title: 'article.filter.hot', selected: false, method: 'hot'},
          {title: 'article.filter.recommend', selected: false, method: 'recommend'}
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
          {title: 'book.filter.mostComment', selected: false, method: 'mostComment'},
          {title: 'book.filter.hot', selected: false, method: 'hot'},
          {title: 'book.filter.recommend', selected: false, method: 'recommend'}
        ],
        // 笔记
        mostCommentBookNotes: undefined,
        hotBookNotes: undefined,
        recommendBookNotes: undefined,
        bookNotesTitleMenus: [
          {title: 'bookNote.filter.mostComment', selected: false, method: 'mostComment'},
          {title: 'bookNote.filter.hot', selected: false, method: 'hot'},
          {title: 'bookNote.filter.recommend', selected: false, method: 'recommend'}
        ],
        // 电影
        mostCommentMovies: undefined,
        hotMovies: undefined,
        recommendMovies: undefined,
        moviesTitleMenus: [
          {title: 'movie.filter.mostComment', selected: false, method: 'mostComment'},
          {title: 'movie.filter.hot', selected: false, method: 'hot'},
          {title: 'movie.filter.recommend', selected: false, method: 'recommend'}
        ]
      };
    },
    mixins: [mixin],
    asyncData({store}) {
      return Promise.all([
        store.dispatch('home/UPDATE_HOME_META'),
        store.dispatch('home/GET_TOP_LEVEL_CATEGORIES_INFO', {
          params: {
            level_min: 1,
            level_max: 1
          }
        }),
        store.dispatch('home/GET_ARTICLES_BASE_INFO', {
          params: {
            is_recommend: this.recommendArticles,
            is_hot: this.hotArticles,
            ordering: this.mostCommentArticles,
            limit: 30,
            offset: 0
          }
        }),
        store.dispatch('home/GET_BOOKS_BASE_INFO', {
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 10,
            offset: 0
          }
        }),
        store.dispatch('home/GET_BOOKNOTES_BASE_INFO', {
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 10,
            offset: 0
          }
        }),
        store.dispatch('home/GET_ALBUMS_BASE_INFO', {
          params: {
            is_recommend: this.recommendAlbums,
            is_hot: this.hotAlbums,
            ordering: this.mostCommentAlbums,
            limit: 6,
            offset: 0
          }
        }),
        store.dispatch('home/GET_MOVIES_BASE_INFO', {
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
      }),
      showPage: function () {
        return (this.$store.state.home.articles.length +
          this.$store.state.home.articles.length +
          this.$store.state.home.books.length +
          this.$store.state.home.bookNotes.length +
          this.$store.state.home.albums.length +
          this.$store.state.home.movies.length) > 0;
      }
    },
    beforeMount() {
      if (this.$store.state.home.topLevelCategoriesInfo.length === 0) {
        this.getTopLevelCategoriesInfo({
          params: {
            level_min: 1,
            level_max: 1
          }
        });
      }
      if (this.$store.state.home.articles.length === 0) {
        this.getArticlesBaseInfo({
          params: {
            is_recommend: this.recommendArticles,
            is_hot: this.hotArticles,
            ordering: this.mostCommentArticles,
            limit: 30,
            offset: 0
          }
        });
      }
      if (this.$store.state.home.books.length === 0) {
        this.getBooksBaseInfo({
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 10,
            offset: 0
          }
        });
      }
      if (this.$store.state.home.bookNotes.length === 0) {
        this.getBookNotesBaseInfo({
          params: {
            is_recommend: this.recommendBooks,
            is_hot: this.hotBooks,
            ordering: this.mostCommentBooks,
            limit: 10,
            offset: 0
          }
        });
      }
      if (this.$store.state.home.albums.length === 0) {
        this.getAlbumsBaseInfo({
          params: {
            is_recommend: this.recommendAlbums,
            is_hot: this.hotAlbums,
            ordering: this.mostCommentAlbums,
            limit: 6,
            offset: 0
          }
        });
      }
      if (this.$store.state.home.movies.length === 0) {
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
    mounted() {
      // 更新首页meta信息
      this.updateHomeMeta();
    },
    methods: {
      ...mapActions({
        updateHomeMeta: 'home/UPDATE_HOME_META',
        getTopLevelCategoriesInfo: 'home/GET_TOP_LEVEL_CATEGORIES_INFO',
        getArticlesBaseInfo: 'home/GET_ARTICLES_BASE_INFO',
        getBooksBaseInfo: 'home/GET_BOOKS_BASE_INFO',
        getBookNotesBaseInfo: 'home/GET_BOOKNOTES_BASE_INFO',
        getAlbumsBaseInfo: 'home/GET_ALBUMS_BASE_INFO',
        getMoviesBaseInfo: 'home/GET_MOVIES_BASE_INFO'
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
            limit: 30,
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
            limit: 10,
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
            limit: 10,
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
      specialCategory(name) {
        return this.allCategorysInfo.filter((category) => {
          return category.category_type === name;
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
      'tag-wall': TagWall,
      'friend-links': FriendLinks,
      'side-toc': SideToc
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
</style>
