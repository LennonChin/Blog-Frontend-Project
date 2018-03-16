<template>
  <div class="book-overview-content layout-content" v-if="bookDoubanInfo != undefined">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <div class="book-base-info">
            <a>
              <div class="img">
                <div class="container">
                  <div class="bracket"></div>
                  <div class="target">
                    <img :src="bookDoubanInfo.images.large" alt="">
                  </div>
                </div>
              </div>
              <div class="info">
                <p class="title">{{ bookDoubanInfo.title }}</p>
                <p class="desc"><span>作者：</span>{{ bookDoubanInfo.author.join(' ') }}</p>
                <p class="desc"><span>出版社：</span>{{ bookDoubanInfo.publisher }}</p>
                <p class="desc"><span>出版日期：</span>{{ bookDoubanInfo.publish_date }}</p>
                <p class="desc"><span>页数：</span>{{ bookDoubanInfo.pages }}</p>
                <p class="desc"><span>评分：</span>
                  <iv-rate v-model="bookDoubanInfo.rating.average * 0.5" :allowHalf="true" :disabled="true"></iv-rate>
                </p>
                <iv-tag type="border" v-for="tag in bookDoubanInfo.tags" :key="tag.name">{{ tag.name }}</iv-tag>
              </div>
              <div class="rating"></div>
            </a>
            <vue-tabs class="infos"  @tab-change="handleTabChange">
              <v-tab title="读书目录">
                <book-catalog :book="book"></book-catalog>
              </v-tab>
              <v-tab title="原书目录">
                <p class="catalog" v-html="bookDoubanInfo.catalog"></p>
              </v-tab>
              <v-tab title="整书读后感">
                <div class="article-details" id="article-main-page" v-viewer ref="book">
                  <div class="detail" v-if="book !== undefined" v-for="detail in book.details">
                    <article class="typo container article-main-content" v-html="detail.formatted_content">
                    </article>
                    <div class="detail-footer">Append At / {{ detail.add_time | socialDate }} &nbsp;&nbsp;&nbsp; Update At / {{ detail.update_time | socialDate }}</div>
                  </div>
                </div>
                <!--<p class="summary" v-html="book.detail.formatted_content"></p>-->
              </v-tab>
              <v-tab title="简介">
                <p class="author" v-html="bookDoubanInfo.author_intro"></p>
                <p class="summary" v-html="bookDoubanInfo.summary"></p>
              </v-tab>
            </vue-tabs>
          </div>
          <social-section :article="book"></social-section>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend></recommend>
          <iv-affix :offset-top="60" v-if="responsiveRender(false, false, false, true)" v-show="showToc">
            <side-toc style="margin-top: 15px;" ref="sideToc"></side-toc>
          </iv-affix>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {VueTabs, VTab} from 'vue-nav-tabs';
  import 'vue-nav-tabs/themes/paper.css';
  import BookCatalog from '@/components/views/Book/BookCatalog';
  import Recommend from '@/components/views/Recommend';
  import SideToc from '@/components/views/SideToc';
  import SocialSection from '@/components/views/Comment/SocialSection';
  import {getBookDetailInfo, getDoubanInfo} from '@/api/api';
  // highlight.js引入
  import hljs from '@/common/js/highlight.pack';
  // 样式文件
  import 'highlight.js/styles/atom-one-light.css';
  // TOC
  import tocbot from 'tocbot';
  // 加密
  import {hexMd5} from '@/common/js/md5';

  var HLJS = hljs;

  export default {
    data() {
      return {
        id: undefined,
        book: undefined,
        bookDoubanInfo: undefined,
        browse_auth: null,
        showToc: false
      };
    },
    beforeRouteUpdate(to, from, next) {
      next();
      this.book = undefined;
      this.bookDoubanInfo = undefined;
      this.id = this.$route.params.id;
      this.browse_auth = this.$route.query.browse_auth;
      this.getBookDetailInfo();
    },
    created() {
      this.id = this.$route.params.id;
      this.browse_auth = this.$route.query.browse_auth;
      this.getBookDetailInfo();
    },
    methods: {
      getBookDetailInfo() {
        var that = this;
        getBookDetailInfo({
          params: {
            browse_auth: this.browse_auth
          },
          id: this.id
        }).then((response) => {
          this.book = response.data;
          if (this.book.douban_infos) {
            this.bookDoubanInfo = this.formatBookInfo(JSON.parse(this.book.douban_infos));
          } else {
            this.getDoubanInfo(this.book.douban_type, this.book.douban_id);
          }
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
      getDoubanInfo(doubanType, doubanId) {
        getDoubanInfo({
          id: doubanId,
          type: doubanType
        }).then((response) => {
          this.bookDoubanInfo = this.formatBookInfo(response.data);
        }).catch((error) => {
          console.log(error);
        });
      },
      checkPassword(message) {
        let checkAuth = (browseAuthInput, isAutoRemove) => {
          this.browse_auth = hexMd5(browseAuthInput);
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
      formatBookInfo(book) {
        let bookInfo = {};
        bookInfo.title = book.title;
        bookInfo.images = book.images;
        bookInfo.author = book.author;
        bookInfo.author_intro = this.formatContent(book.author_intro);
        bookInfo.publisher = book.publisher;
        bookInfo.publish_date = book.pubdate;
        bookInfo.pages = book.pages;
        bookInfo.summary = this.formatContent(book.summary);
        bookInfo.catalog = this.formatContent(book.catalog);
        bookInfo.tags = book.tags;
        bookInfo.rating = book.rating;
        return bookInfo;
      },
      formatContent(content) {
        return content.replace(/\n/g, '<br />');
      },
      handleTabChange(tabIndex, newTab, oldTab) {
        console.log(tabIndex);
        this.showToc = tabIndex === 2;
      },
      addTocScrollSpy() {
        /* eslint-disable */
        if (!this.$refs.book) return;
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
        if (!this.$refs.book) return;
        let blocks = this.$refs.book.querySelectorAll('pre code');
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
      'vue-tabs': VueTabs,
      'v-tab': VTab,
      'book-catalog': BookCatalog,
      'social-section': SocialSection,
      'recommend': Recommend,
      'side-toc': SideToc
    },
    watch: {
      showToc: function (newShowToc) {
        if (newShowToc) {
          this.$nextTick(() => {
            this.addCodeLineNumber();
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
    .book-base-info
      > a
        display flex
        margin-bottom 20px
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
              > img
                width 100%
                height 100%
                transition: All 0.4s ease-in-out
                transform: scale(1.0)
                zoom: 1.0
        .info
          padding-left 15px
          .title
            font-size 20px
            line-height 28px
            font-weight 500
            color $color-typegraphy-title
            margin-bottom 5px
            text-align justify
          .desc
            font-size 14px
            font-weight 100
            line-height 20px
            color $color-gradually-gray-61
            text-align justify
            margin-bottom 3px
            > span
              color $color-gradually-gray-41
              font-weight 300
        &:hover
          img
            transition: All 0.4s ease-in-out
            transform: scale(1.05)
            zoom: 1.05
          .info
            .desc
              color $color-gradually-gray-11
      .infos
        p.summary, p.author, p.catalog
          font-size 14px
          font-weight 200
          line-height 23px
          text-align justify
        .nav-tabs-navigation
          margin-bottom 20px

</style>
