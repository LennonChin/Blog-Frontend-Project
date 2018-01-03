<template>
  <div class="movie-content">
    <div class="header-wrapper">
      <img src="../../assets/background.jpg" alt="">
      <movie-page-header :movie="movie"></movie-page-header>
    </div>
    <div class="content-wrapper layout-content">
      <iv-row>
        <iv-col :xs="24" :sm="24" :md="24" :lg="17">
          <div class="layout-left">
            <movie-page-content>
              <article v-if="movie != undefined" id="article-main-page" class="typo container article-main-content"
                       slot="content" v-html="movie.detail.formatted_content" ref="article"></article>
            </movie-page-content>
          </div>
        </iv-col>
        <iv-col :xs="0" :sm="0" :md="0" :lg="7">
          <div class="layout-right">
            <recommend></recommend>
            <iv-affix :offset-top="60">
              <side-toc style="margin-top: 15px;"></side-toc>
            </iv-affix>
          </div>
        </iv-col>
      </iv-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MoviePageHeader from '@/components/views/Movie/MoviePageHeader';
  import MoviePageContent from '@/components/views/Movie/MoviePageContent';
  import SideToc from '@/components/views/SideToc';
  import Recommend from '@/components/views/Recommend';
  // highlight.js引入
  import hljs from '@/common/js/highlight.pack';
  // 样式文件
  import 'highlight.js/styles/atom-one-light.css';
  // TOC
  import tocbot from 'tocbot';
  // API
  import {getMovieDetailInfo} from '@/api/api';

  var HLJS = hljs;

  export default {
    data() {
      return {
        movieId: 0,
        movie: undefined
      };
    },
    components: {
      'movie-page-header': MoviePageHeader,
      'movie-page-content': MoviePageContent,
      'side-toc': SideToc,
      'recommend': Recommend
    },
    created() {
      this.movieId = this.$route.params.movieId;
      this.getDatas();
    },
    methods: {
      getDatas() {
        getMovieDetailInfo({
          id: this.movieId
        }).then((response) => {
          this.movie = response.data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      addTocScrollSpy() {
        /* eslint-disable */
        tocbot.init({
          tocSelector: '#side-toc',
          contentSelector: '#article-main-page',
          headingSelector: 'h1, h2, h3, h4, h5',
          linkClass: 'toc-link',
          activeLinkClass: 'is-active-link',
          listClass: 'toc-list',
          isCollapsedClass: 'is-collapsed',
          collapsibleClass: 'is-collapsible',
          listItemClass: 'toc-list-item',
          collapseDepth: 0,
          scrollSmooth: true,
          scrollSmoothDuration: 420,
          headingsOffset: 1,
          throttleTimeout: 50,
          positionFixedClass: 'is-position-fixed',
          fixedSidebarOffset: 'auto',
          includeHtml: false,
          onClick: false
        });
      },
      addCodeLineNumber() {
        // 添加行号
        let blocks = this.$refs.article.querySelectorAll('pre code');
        blocks.forEach((block) => {
          HLJS.highlightBlock(block);
          // 去前后空格并添加行号
          block.innerHTML = '<ul><li>' + block.innerHTML.replace(/(^\s*)|(\s*$)/g, '').replace(/\n/g, '\n</li><li>') + '\n</li></ul>';
        });
      }
    },
    watch: {
      movie: function (newMovie) {
        this.$nextTick(() => {
          this.addCodeLineNumber();
          this.addTocScrollSpy();
          window.scrollTo(0, 0);
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .movie-content
    .header-wrapper
      position relative
      overflow hidden
      > img
        position absolute
        left 0
        top 0
        width 100%
        height 100%
        filter blur(5px)
        transform scale(1.5)
        zoom 1.5
</style>
