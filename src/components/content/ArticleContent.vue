<template>
  <div class="article-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <article-page-header :article="article"></article-page-header>
          <article-page-content>
            <article v-if="article !== undefined" id="article-main-page" class="typo container" slot="content"
                     v-html="article.detail.formatted_content" ref="article">
            </article>
          </article-page-content>
          <article-page-footer></article-page-footer>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <!--<recommend></recommend>-->
          <iv-affix :offset-top="60">
            <side-toc style="margin-top: 15px;" ref="sideToc"></side-toc>
          </iv-affix>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>
npm
<script type="text/ecmascript-6">
  import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader';
  import ArticlePageContent from '@/components/views/Article/ArticlePageContent';
  import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter';
  import About from '@/components/views/About';
  import FriendLinks from '@/components/views/FriendLinks';
  import SideToc from '@/components/views/SideToc';
  import Recommend from '@/components/views/Recommend';
  // highlight.js引入
  import hljs from 'highlight.js';
  // 样式文件
  import 'highlight.js/styles/zenburn.css';
  // TOC
  import tocbot from 'tocbot';
  // API
  import {getArticleDetailInfo} from '@/api/api';

  var HLJS = hljs;

  export default {
    data() {
      return {
        articleId: 0,
        article: undefined
      };
    },
    components: {
      'article-page-header': ArticlePageHeader,
      'article-page-content': ArticlePageContent,
      'article-page-footer': ArticlePageFooter,
      'about': About,
      'friend-links': FriendLinks,
      'side-toc': SideToc,
      'recommend': Recommend
    },
    mounted: function () {
    },
    created() {
      this.articleId = this.$route.params.articleId;
      this.getDatas();
    },
    methods: {
      getDatas() {
        getArticleDetailInfo({
          id: this.articleId
        }).then((response) => {
          this.article = response.data;
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
      article: function (newArticle) {
        this.$nextTick(() => {
          this.addCodeLineNumber();
          this.addTocScrollSpy();
          window.scrollTo(0, 0);
        });
      }
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .article-content
    width auto
    @media only screen and (max-width: 768px)
      margin 5px 5px 0 5px
    @media screen and (min-width: 768px)
      margin 10px 10px 0 10px
    @media screen and (min-width: 992px)
      margin 15px 35px 0 35px
    @media screen and (min-width: 1200px)
      width 1200px
      margin 15px auto 0
      margin-bottom 200px
    .layout-left, .layout-right
      padding 0
      @media only screen and (max-width: 768px)
        padding 0
      @media screen and (min-width: 768px)
        padding 0
      @media screen and (min-width: 992px)
        padding 0 10px
      @media screen and (min-width: 1200px)
        padding 0 10px
</style>
