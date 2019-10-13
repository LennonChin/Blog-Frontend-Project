<template>
  <div class="article-content layout-content" v-if="Object.keys(article).length > 0">
    <i-row v-if="!needAuth">
      <i-col :xs="24" :sm="24" :md="24" :lg="ExpandLeftColumn ? 24 : 17">
        <div class="layout-left" v-if="article">
          <article-page-header :article="article" :languages="languages"></article-page-header>
          <article-page-content>
            <div class="article-details" id="article-main-page" slot="content" ref="article" v-viewer>
              <div class="detail" v-if="articleDetail" v-for="detail in articleDetail">
                <article class="typo container article-main-content" v-html="detail.formatted_content">
                </article>
                <div class="detail-footer">
                  {{ $t('common.detailAddTip') }} {{ detail.add_time | socialDate }} &nbsp;&nbsp;&nbsp;
                  {{ $t('common.detailUpdateTip') }} {{ detail.update_time | socialDate }}
                </div>
              </div>
            </div>
          </article-page-content>
          <article-page-footer :article="article"></article-page-footer>
        </div>
      </i-col>
      <i-col :xs="0" :sm="0" :md="0" :lg="ExpandLeftColumn ? 0 : 7">
        <div class="layout-right">
          <recommend></recommend>
          <i-affix :offset-top="60">
            <side-toc style="margin-top: 15px;" ref="sideToc"></side-toc>
          </i-affix>
        </div>
      </i-col>
    </i-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';
  import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader';
  import ArticlePageContent from '@/components/views/Article/ArticlePageContent';
  import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter';
  import About from '@/components/views/About';
  import FriendLinks from '@/components/views/FriendLinks';
  import SideToc from '@/components/views/SideToc';
  import Recommend from '@/components/views/Recommend';
  // TOC
  import tocbot from 'tocbot';
  // 加密
  import MD5 from 'crypto-js/md5';
  // mixin
  import {mixin} from '@/common/js/utils';

  export default {
    name: 'article-content',
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
      this.clearArticleInfo();
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
        store.dispatch('article/GET_ARTICLE_DETAIL_INFO', {
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
        if (Object.keys(this.$store.state.article.article).length === 0) {
          console.log('non ssr');
          // 未SSR的情况
          this.refreshData();
        } else {
          // SSR的情况
          this.refreshContent();
        }
      }
    },
    beforeDestroy() {
      // 导航离开时清空vuex中数据
      this.clearArticleInfo();
      // 恢复通栏
      this.resetExpandColumn();
      if (this.tocbotControl !== undefined) {
        console.log('tocbot destroyed');
        this.tocbotControl.destroy();
      }
    },
    computed: {
      ...mapState({
        article: state => state.article.article,
        languages: state => state.article.languages,
        needAuth: state => state.article.needAuth,
        ExpandLeftColumn: state => state.base.ExpandLeftColumn
      }),
      articleDetail: function () {
        let result = this.article.details.filter(detail => {
          return detail.language === this.$i18n.locale;
        });
        if (result.length === 0) {
          return this.article.details;
        } else {
          return result;
        }
      }
    },
    methods: {
      ...mapMutations({
        updateArticleAuth: 'article/UPDATE_ARTICLE_AUTH',
        clearArticleInfo: 'article/CLAER_ARTICLE_DETAIL_INFO',
        resetExpandColumn: 'base/RESET_EXPAND_COLUMN'
      }),
      ...mapActions({
        getArticleDetailInfo: 'article/GET_ARTICLE_DETAIL_INFO'
      }),
      refreshData() {
        let that = this;
        this.getArticleDetailInfo({
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
          console.log(this.id, this.browse_auth);
          this.$router.replace({
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
      // 更新文章图片、目录
      refreshContent() {
        this.$nextTick(() => {
          // 添加图片前缀
          this.resolveImageTagsUrl(this.$refs.article.querySelectorAll('img'));
          this.addTocScrollSpy();
        });
      },
      addTocScrollSpy() {
        /* eslint-disable */
        if (!this.$refs.article) return;
        console.log('addTocScrollSpy');
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
          collapseDepth: 3,
          scrollSmooth: true,
          scrollSmoothDuration: 420,
          headingsOffset: 1,
          throttleTimeout: 50,
          positionFixedClass: 'is-position-fixed',
          fixedSidebarOffset: 'auto',
          includeHtml: true,
          onClick: false
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
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
</style>
