<template>
  <div class="book-overview-content layout-content" v-if="Object.keys(bookDoubanInfo).length > 0">
    <i-row v-if="!needAuth">
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <div class="book-infos">
            <div class="book-base-info">
              <div class="img">
                <div class="container">
                  <div class="bracket"></div>
                  <div class="target">
                    <img :src="book.book_image" alt="">
                  </div>
                </div>
              </div>
              <div class="info">
                <p class="title">{{ book[resolveI18N('title')] }}</p>
                <p class="desc"><span>{{ $t('book.author') }}：</span>{{ bookDoubanInfo.author.join(' ') }}</p>
                <p class="desc"><span>{{ $t('book.publisher') }}：</span>{{ bookDoubanInfo.publisher }}</p>
                <p class="desc"><span>{{ $t('book.publishDate') }}：</span>{{ bookDoubanInfo.publish_date }}</p>
                <p class="desc"><span>{{ $t('book.pages') }}：</span>{{ bookDoubanInfo.pages }}</p>
                <p class="desc"><span>{{ $t('book.rating') }}：</span>
                  <i-rate v-model="bookDoubanInfo.rating.average * 0.5" :allowHalf="true"
                          :disabled="true"></i-rate>
                </p>
                <i-tag type="border" v-for="tag in bookDoubanInfo.tags" :key="tag.name"
                       class="border-tag">{{ tag.name }}
                </i-tag>
              </div>
              <div class="rating"></div>
            </div>
            <vue-tabs class="book-detail-info" @tab-change="handleTabChange">
              <v-tab :title="$t('book.desc')">
                <p class="author" v-html="bookDoubanInfo.author_intro"></p>
                <p class="summary" v-html="bookDoubanInfo.summary"></p>
              </v-tab>
              <v-tab :title="$t('book.readCatelog')">
                <book-catalog :book="book"></book-catalog>
              </v-tab>
              <v-tab :title="$t('book.catelog')">
                <p class="catalog" v-html="bookDoubanInfo.catalog"></p>
              </v-tab>
              <v-tab :title="$t('book.readThink')" v-if="book !== undefined">
                <div class="article-details" id="article-main-page" ref="book" v-viewer>
                  <div class="detail" v-for="detail in book.details">
                    <article class="typo container article-main-content"
                             v-html="detail.formatted_content">
                    </article>
                    <div class="detail-footer">
                      {{ $t('common.detailAddTip') }} {{ detail.add_time | socialDate }} &nbsp;&nbsp;&nbsp;
                      {{ $t('common.detailUpdateTip') }} {{ detail.update_time | socialDate }}
                    </div>
                  </div>
                </div>
                <!--<p class="summary" v-html="book.detail.formatted_content"></p>-->
              </v-tab>
            </vue-tabs>
          </div>
          <social-section :article="book"></social-section>
        </div>
      </i-col>
      <i-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend></recommend>
          <i-affix :offset-top="60" v-show="showToc">
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
  import {VueTabs, VTab} from 'vue-nav-tabs';
  import 'vue-nav-tabs/themes/paper.css';
  import BookCatalog from '@/components/views/Book/BookCatalog';
  import Recommend from '@/components/views/Recommend';
  import SideToc from '@/components/views/SideToc';
  import SocialSection from '@/components/views/Comment/SocialSection';
  import Viewer from 'v-viewer/src/component.vue';
  import 'viewerjs/dist/viewer.css';
  // TOC
  import tocbot from 'tocbot';
  // 加密
  import MD5 from 'crypto-js/md5';
  // mixin
  import {mixin} from '@/common/js/utils';

  export default {
    name: 'book-content',
    data() {
      return {
        id: 0,
        showToc: false,
        tocbotControl: undefined
      };
    },
    mixins: [mixin],
    beforeRouteLeave(to, from, next) {
      // 导航离开时清空vuex中文章数据
      this.clearBookInfo();
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
        store.dispatch('book/GET_BOOK_DETAIL_INFO', {
          params: {
            browse_auth: this.browse_auth
          },
          id: this.id
        })
      ]);
    },
    computed: {
      ...mapState({
        book: state => state.book.book,
        bookDoubanInfo: state => state.book.bookDoubanInfo,
        needAuth: state => state.book.needAuth
      })
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
        if (Object.keys(this.$store.state.book.book).length === 0) {
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
      // 销毁时清空vuex中数据
      this.clearBookInfo();
      if (this.tocbotControl !== undefined) {
        console.log('tocbot destroyed');
        this.tocbotControl.destroy();
      }
    },
    methods: {
      ...mapMutations({
        updateBookAuth: 'book/UPDATE_BOOK_AUTH',
        clearBookInfo: 'book/CLAER_BOOK_DETAIL_INFO'
      }),
      ...mapActions({
        getBookDetailInfo: 'book/GET_BOOK_DETAIL_INFO'
      }),
      refreshData() {
        this.id = this.$route.params.id;
        this.browse_auth = this.$route.query.browse_auth;
        let that = this;
        this.getBookDetailInfo({
          params: {
            browse_auth: this.browse_auth
          },
          id: this.id
        }).then(response => {
          console.log('book refreshContent');
          this.refreshContent();
        }).catch((error) => {
          console.log('book detail need auth');
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
      // 更新文章图片、目录
      refreshContent() {
        this.$nextTick(() => {
          // 添加图片前缀
          this.resolveImageTagsUrl(this.$refs.book.querySelectorAll('img'));
          this.addTocScrollSpy();
        });
      },
      handleTabChange(tabIndex, newTab, oldTab) {
        console.log(tabIndex);
        this.showToc = tabIndex === 3;
      },
      addTocScrollSpy() {
        /* eslint-disable */
        if (!this.$refs.book) return;
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
      'vue-tabs': VueTabs,
      'v-tab': VTab,
      'book-catalog': BookCatalog,
      'social-section': SocialSection,
      'recommend': Recommend,
      'side-toc': SideToc,
      'v-viewer': Viewer
    },
    watch: {
      showToc: function (newShowToc) {
        if (newShowToc) {
          this.$nextTick(() => {
            this.addTocScrollSpy();
          });
        }
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";
  @import "../../common/stylus/article.styl";

  .book-overview-content
    .book-infos
      .book-base-info
        display flex
        margin-bottom 15px
        .img
          position relative
          flex 0 0 140px
          width 140px
          overflow hidden
          .container
            width 100%
            position relative
            overflow hidden
            .bracket
              margin-top 140%
            .target
              position absolute
              top 0
              bottom 0
              left 0
              right 0
              border 1px solid $default-border-color
              > img
                width 100%
                height 100%
                transition All 0.4s ease-in-out
                transform scale(1.0)
                zoom 1.0
        .info
          padding-left 15px
          .title
            font-size 20px
            line-height 28px
            font-weight 500
            color $default-title-color
            margin-bottom 5px
            text-align justify
          .desc
            font-size 14px
            font-weight 100
            line-height 20px
            color $default-desc-color
            text-align justify
            margin-bottom 3px
            > span
              color $default-desc-color
              font-weight 700
      .book-detail-info
        p.summary, p.author, p.catalog
          font-size 14px
          font-weight 200
          line-height 23px
          text-align justify
          color $default-desc-color
        .nav-tabs-navigation
          border-bottom 1px solid $default-border-color
          margin-bottom 20px
          .nav-tabs
            li
              margin-bottom 0
              a
                color $default-info-color
                &.active_tab
                  color $default-info-hover-color
                &::before
                  bottom 2px
                  background transparent
                  border-bottom 11px solid $default-border-color
                &::after
                  bottom 1px
                  background transparent
                  border-bottom 11px solid $default-body-background-color

</style>
