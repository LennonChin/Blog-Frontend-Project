<template>
  <div class="movie-content" v-if="Object.keys(movie).length > 0">
    <div class="header-wrapper">
      <img src="../../assets/background.jpg" alt="">
      <movie-page-header :movie="movie"></movie-page-header>
    </div>
    <div class="content-wrapper layout-content">
      <i-row>
        <i-col :xs="24" :sm="24" :md="24" :lg="17">
          <div class="layout-left">
            <movie-page-content>
              <div class="article-details" id="article-main-page" slot="content" ref="article" v-viewer>
                <div class="detail" v-if="movie !== undefined" v-for="detail in movie.details">
                  <article class="typo container article-main-content" v-html="detail.formatted_content">
                  </article>
                  <div class="detail-footer">以上内容添加于 {{ detail.add_time | socialDate
                    }} &nbsp;&nbsp;&nbsp; 更新于 {{ detail.update_time | socialDate }}
                  </div>
                </div>
              </div>
            </movie-page-content>
            <article-page-footer :article="movie"></article-page-footer>
          </div>
        </i-col>
        <i-col :xs="0" :sm="0" :md="0" :lg="7">
          <div class="layout-right">
            <recommend></recommend>
            <i-affix :offset-top="60">
              <side-toc style="margin-top: 15px;"></side-toc>
            </i-affix>
          </div>
        </i-col>
      </i-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';
  import MoviePageHeader from '@/components/views/Movie/MoviePageHeader';
  import MoviePageContent from '@/components/views/Movie/MoviePageContent';
  import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter';
  import SideToc from '@/components/views/SideToc';
  import Recommend from '@/components/views/Recommend';
  // TOC
  import tocbot from 'tocbot';
  // 加密
  import MD5 from 'crypto-js/md5';
  // mixin
  import {mixin} from '@/common/js/utils';

  export default {
    name: 'movie-content',
    data() {
      return {
        id: undefined,
        browse_auth: undefined,
        tocbotControl: undefined
      };
    },
    mixins: [mixin],
    beforeRouteLeave(to, from, next) {
      console.log('beforeRouteLeave');
      // 导航离开时清空vuex中数据
      this.clearMovieInfo();
      next();
    },
    beforeRouteUpdate(to, from, next) {
      next();
      console.log('beforeRouteUpdate');
      this.id = this.$route.params.id;
      this.browse_auth = this.$route.query.browse_auth;
      this.refreshData();
    },
    asyncData({store, route}) {
      this.id = route.params.id;
      this.browse_auth = route.query.browse_auth;
      return Promise.all([
        store.dispatch('movie/GET_MOVIE_DETAIL_INFO', {
          params: {
            browse_auth: this.browse_auth
          },
          id: this.id
        })
      ]);
    },
    mounted() {
      console.log('mounted');
      this.id = this.$route.params.id;
      this.browse_auth = this.$route.query.browse_auth;
      let that = this;
      if (this.needAuth) {
        this.$Notice.error({
          title: '您输入的访问密码错误',
          duration: 3,
          closable: true,
          onClose: () => {
            that.checkPassword('该文章已加密，<br />您输入的访问密码错误，请重新验证');
          }
        });
      } else {
        if (Object.keys(this.$store.state.movie.movie).length === 0) {
          console.log('non ssr');
          // 未SSR的情况
          this.refreshData();
        } else {
          // SSR的情况
          this.refreshContent();
        }
      }
    },
    computed: {
      ...mapState({
        movie: state => state.movie.movie,
        needAuth: state => state.movie.needAuth
      })
    },
    beforeDestroy() {
      // 导航离开时清空vuex中数据
      this.clearMovieInfo();
      if (this.tocbotControl !== undefined) {
        console.log('tocbot destroyed');
        this.tocbotControl.destroy();
      }
    },
    methods: {
      ...mapMutations({
        updateMovieAuth: 'movie/UPDATE_MOVIE_AUTH',
        clearMovieInfo: 'movie/CLAER_MOVIE_DETAIL_INFO'
      }),
      ...mapActions({
        getMovieDetailInfo: 'movie/GET_MOVIE_DETAIL_INFO'
      }),
      refreshData() {
        let that = this;
        this.getMovieDetailInfo({
          params: {
            browse_auth: this.browse_auth
          },
          id: this.id
        }).then(response => {
          this.refreshContent();
        }).catch((error) => {
          console.log('article detail need auth');
          if (error.code === 401) {
            if (that.browse_auth) {
              that.$Notice.error({
                title: '您输入的访问密码错误',
                duration: 3,
                closable: true,
                onClose: () => {
                  that.checkPassword('该文章已加密，<br />您输入的访问密码错误，请重新验证');
                }
              });
            } else {
              that.checkPassword('该文章已加密，请输入访问密码');
            }
          }
        });
      },
      checkPassword(message) {
        let checkAuth = (browseAuthInput, isAutoRemove) => {
          this.browse_auth = MD5(browseAuthInput).toString();
          this.$router.push({
            name: this.$router.name,
            params: {id: this.id},
            query: {browse_auth: this.browse_auth}
          });
          if (isAutoRemove) {
            this.$Modal.remove();
          }
        };

        this.$Modal.confirm({
          autoClosable: true,
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
            children.push(h('i-input', {
              props: {
                type: 'password',
                autofocus: true,
                placeholder: '请输入访问密码'
              },
              'class': {
                'modal-input': true
              },
              on: {
                input: (value) => {
                  this.browse_auth_input = value;
                }
              },
              nativeOn: {
                keyup: (event) => {
                  if (event.keyCode === 13) {
                    checkAuth(this.browse_auth_input, true);
                  }
                }
              }
            }));
            return h('div', {}, children);
          },
          onOk: () => {
            checkAuth(this.browse_auth_input, false);
          }
        });
      },
      // 更新文章结构，高亮、图片、代码行号
      refreshContent() {
        this.$nextTick(() => {
          // 添加图片前缀
          this.resolveImageTagsUrl(this.$refs.article.querySelectorAll('img'));
          this.addTocScrollSpy();
        });
      },
      addTocScrollSpy() {
        /* eslint-disable */
        let tocSelector = '#side-toc';
        if (document.body.clientWidth <= 1200) {
          tocSelector = '#sidebar-toc';
        }
        this.tocbotControl = tocbot.init({
          tocSelector,
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
      }
    },
    components: {
      'movie-page-header': MoviePageHeader,
      'movie-page-content': MoviePageContent,
      'article-page-footer': ArticlePageFooter,
      'side-toc': SideToc,
      'recommend': Recommend
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
