<template>
  <div class="movie-content" v-if="movie !== undefined">
    <div class="header-wrapper">
      <img src="../../assets/background.jpg" alt="">
      <movie-page-header :movie="movie"></movie-page-header>
    </div>
    <div class="content-wrapper layout-content">
      <iv-row>
        <iv-col :xs="24" :sm="24" :md="24" :lg="17">
          <div class="layout-left">
            <movie-page-content>
              <div class="article-details" id="article-main-page" slot="content" v-viewer ref="article">
                <div class="detail" v-if="movie !== undefined" v-for="detail in movie.details">
                  <article class="typo container article-main-content" v-html="detail.formatted_content">
                  </article>
                  <div class="detail-footer">Append At / {{ detail.add_time | socialDate }} &nbsp;&nbsp;&nbsp; Update At / {{ detail.update_time | socialDate }}</div>
                </div>
              </div>
            </movie-page-content>
            <article-page-footer :article="movie"></article-page-footer>
          </div>
        </iv-col>
        <iv-col :xs="0" :sm="0" :md="0" :lg="7">
          <div class="layout-right">
            <recommend></recommend>
            <iv-affix :offset-top="60" v-if="responsiveRender(false, false, false, true)">
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
  import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter';
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
  import {getMovieDetailInfo} from '@/api/api';

  var HLJS = hljs;

  export default {
    data() {
      return {
        id: 0,
        browse_auth: null,
        movie: undefined
      };
    },
    components: {
      'movie-page-header': MoviePageHeader,
      'movie-page-content': MoviePageContent,
      'article-page-footer': ArticlePageFooter,
      'side-toc': SideToc,
      'recommend': Recommend
    },
    created() {
      this.id = this.$route.params.id;
      this.browse_auth = this.$route.query.browse_auth;
      this.getDatas();
    },
    methods: {
      getDatas() {
        var that = this;
        getMovieDetailInfo({
          params: {
            browse_auth: this.browse_auth
          },
          id: this.id
        }).then((response) => {
          this.$nextTick(() => {
            this.movie = response.data;
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
              name: 'movie/detail',
              params: {id: this.id},
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
    watch: {
      movie: function (newMovie) {
        this.$nextTick(() => {
          this.addCodeLineNumber();
          // 添加图片前缀
          this.resolveImageUrl(this.$refs.article.querySelectorAll('img'));
          this.addTocScrollSpy();
          window.scrollTo(0, 0);
        });
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
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
