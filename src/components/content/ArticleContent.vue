<template>
  <div class="article-content layout-content" v-if="article != undefined">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <article-page-header :article="article"></article-page-header>
          <article-page-content>
            <article v-if="article !== undefined" id="article-main-page" class="typo container article-main-content"
                     slot="content"
                     v-html="article.detail.formatted_content" v-viewer ref="article">
            </article>
          </article-page-content>
          <article-page-footer :article="article"></article-page-footer>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend></recommend>
          <iv-affix :offset-top="60" v-if="responsiveRender(false, false, false, true)">
            <side-toc style="margin-top: 15px;" ref="sideToc"></side-toc>
          </iv-affix>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader';
  import ArticlePageContent from '@/components/views/Article/ArticlePageContent';
  import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter';
  import About from '@/components/views/About';
  import FriendLinks from '@/components/views/FriendLinks';
  import SideToc from '@/components/views/SideToc';
  import Recommend from '@/components/views/Recommend';
  // highlight.js引入
  import hljs from '@/common/js/highlight.pack';
  // 样式文件
  import 'highlight.js/styles/atom-one-light.css';
  // TOC
  import tocbot from 'tocbot';
  // 加密
  import {hexMd5} from '@/common/js/md5';
  // API
  import {getArticleDetailInfo} from '@/api/api';

  var HLJS = hljs;

  export default {
    data() {
      return {
        articleId: 0,
        browse_auth: null,
        article: undefined
      };
    },
    beforeRouteUpdate(to, from, next) {
      next();
      this.article = undefined;
      this.articleId = this.$route.params.articleId;
      this.browse_auth = this.$route.query.browse_auth;
      this.getDatas();
    },
    created() {
      this.articleId = this.$route.params.articleId;
      this.browse_auth = this.$route.query.browse_auth;
      this.getDatas();
    },
    methods: {
      getDatas() {
        var that = this;
        getArticleDetailInfo({
          params: {
            browse_auth: this.browse_auth
          },
          id: this.articleId
        }).then((response) => {
          this.$nextTick(() => {
            this.article = response.data;
          });
        }).catch((error) => {
          console.log(error);
          if (error.status === 401) {
            if (that.browse_auth) {
              that.$Notice.error({
                title: '您输入的阅读密码错误',
                duration: 3,
                closable: true,
                onClose: () => {
                  that.checkPassword('该文章为加密文章，<br />您输入的阅读密码错误，请重新验证');
                }
              });
            } else {
              that.checkPassword('该文章为加密文章，请输入阅读密码');
            }
          }
        });
      },
      checkPassword(message) {
        this.$Modal.confirm({
          autoClosable: false,
          render: (h) => {
            let children = [];
            children.push(h('h2', {
              domProps: {
                innerHTML: '提示'
              },
              'class': {
                'modal-title': true
              }
            }));
            children.push(h('p', {
              domProps: {
                innerHTML: message
              },
              'class': {
                'modal-message': true
              }
            }));
            children.push(h('iv-input', {
              props: {
                type: 'password',
                autofocus: true,
                placeholder: '请输入阅读密码'
              },
              'class': {
                'modal-input': true
              },
              on: {
                input: (value) => {
                  this.browse_auth_input = value;
                }
              }
            }));
            return h('div', {}, children);
          },
          onOk: () => {
            this.browse_auth = hexMd5(this.browse_auth_input);
            this.$router.push({
              name: 'article/detail',
              params: {articleId: this.articleId},
              query: {browse_auth: this.browse_auth}
            });
            this.getDatas();
          }
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
          let reg = /<ul(.*?)><li(.*?)>[\s\S]*?<\/li><\/ul>/gm;
          if (reg.test(block.innerHTML)) return;
          block.innerHTML = '<ul><li>' + block.innerHTML.replace(/(^\s*)|(\s*$)/g, '').replace(/\n/g, '\n</li><li>') + '\n</li></ul>';
        });
      }
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
    watch: {
      article: function (newArticle) {
        if (newArticle) {
          this.$nextTick(() => {
            this.addCodeLineNumber();
            // 添加图片前缀
            this.resolveImageUrl(this.$refs.article.querySelectorAll('img'));
            this.addTocScrollSpy();
            window.scrollTo(0, 0);
          });
        }
      }
    },
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
</style>
