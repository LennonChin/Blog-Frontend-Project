<template>
  <div class="article-home-content layout-content">
    <div class="banner" v-if="bannerArticles.length > 0">
      <div class="bracket"></div>
      <div class="target">
        <article-home-banner :bannerArticles="bannerArticles"></article-home-banner>
      </div>
    </div>
    <i-row style="margin-top:20px;">
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu :categorys="categorysInfo" @selectCategory="selectCategory"
                         :defaultCategory="selected_category"></classify-menu>
          <section-title :mainTitle="categorysInfo[0].name + '列表'"
                         :subTitle="categorysInfo[0].subname + ' List'"
                         :menus="menus"
                         :withRefresh="true"
                         :withTimeSelect="true"
                         :datePickerOptions="datePickerOptions"
                         @refresh="refresh"
                         @menusControl="menusControl"
                         @comfirmDateSelect="dateSelect"
                         @clearDateSelect="dateSelectClear">
          </section-title>
          <article-list-cell v-for="article in articles" :article="article" :key="article.id"></article-list-cell>
          <browse-more @browseMore="browseMore" :noMoreData="noMoreData" ref="browseMore"></browse-more>
        </div>
      </i-col>
      <i-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend></recommend>
          <tag-wall style="margin-top: 15px;"></tag-wall>
        </div>
      </i-col>
    </i-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex';
  import ArticleHomeBanner from '@/components/views/Article/ArticleHomeBanner';
  import ArticleListCell from '@/components/views/Article/ArticleListCell';
  import SectionTitle from '@/components/views/SectionTitle';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';
  import BrowseMore from '@/components/views/BrowseMore';

  import {
    DefaultLimitSize,
    MaxLimitSize,
    SectionTitleDefaultMenus,
    SectionTitleDefaultDatePickerOptions
  } from '@/common/js/const';

  export default {
    name: 'article-home-content',
    data() {
      return {
        selected_category: undefined,
        timeSorted: false,
        mostComment: undefined,
        recommend: undefined,
        limit_size: DefaultLimitSize,
        page: 0,
        menus: SectionTitleDefaultMenus,
        datePickerOptions: SectionTitleDefaultDatePickerOptions,
        selectedDateRange: []
      };
    },
    asyncData({store}) {
      this.selected_category = 1;
      return Promise.all([
        store.dispatch('articleHome/GET_ARTICLES_BASE_INFO', {
          params: {
            params: {
              top_category: this.selected_category,
              ordering: '-add_time',
              limit: DefaultLimitSize
            }
          }
        })
      ]);
    },
    created() {
      // 设置默认的分类id
      this.selected_category = this.categorysInfo[0].id;
    },
    mounted() {
      if (this.$store.state.articleHome.articles.length + this.$store.state.articleHome.bannerArticles.length === 0) {
        console.log('non ssr');
        // 未SSR的情况
        this.updateArticlesInfo({
          params: {
            params: {
              top_category: this.selected_category,
              ordering: '-add_time',
              limit: DefaultLimitSize
            }
          }
        }, false);
      }
    },
    computed: {
      ...mapState({
        articles: state => state.articleHome.articles,
        bannerArticles: state => state.articleHome.bannerArticles,
        noMoreData: state => state.articleHome.noMoreData
      }),
      ...mapGetters({
        documentMeta: 'DOCUMENT_META'
      }),
      categorysInfo: function () {
        return this.allCategorysInfo.filter((category) => {
          return category.category_type === 'articles';
        });
      }
    },
    methods: {
      ...mapMutations({
        clearArticlesBaseInfo: 'articleHome/CLAER_ARTICLES_BASE_INFO'
      }),
      ...mapActions({
        getArticlesBaseInfo: 'articleHome/GET_ARTICLES_BASE_INFO'
      }),
      updateArticlesInfo(reset) {
        // 排序条件
        let orderings = [];
        if (this.timeSorted) {
          orderings.push('add_time');
        } else {
          orderings.push('-add_time');
        }
        if (this.mostComment !== undefined) {
          if (this.mostComment) {
            orderings.push('comment_num');
          } else {
            orderings.push('-comment_num');
          }
        }
        this.getArticlesBaseInfo({
          params: {
            params: {
              top_category: this.selected_category,
              ordering: orderings.toString(),
              is_recommend: this.recommend,
              time_min: this.selectedDateRange[0],
              time_max: this.selectedDateRange[1],
              limit: this.limit_size,
              offset: this.page * this.limit_size
            }
          },
          reset
        }).then(response => {
          this.$refs.browseMore.stopLoading();
        }).catch(error => {
          this.$refs.browseMore.stopLoading();
          console.log(error);
        });
      },
      browseMore() {
        this.page++;
        this.updateArticlesInfo();
      },
      selectCategory(categoryId) {
        this.page = 0;
        this.selected_category = categoryId;
        this.updateArticlesInfo(true);
      },
      refresh() {
        this.selected_category = undefined;
        this.timeSorted = false;
        this.mostComment = undefined;
        this.recommend = undefined;
        this.page = 0;
        this.selectedDateRange = [];
        this.updateArticlesInfo(true);
      },
      menusControl(params) {
        switch (params[0]) {
          case 'timeSorted':
            this.timeSorted = !params[1];
            break;
          case 'mostComment':
            this.mostComment = params[1] ? true : undefined;
            break;
          case 'recommend':
            this.recommend = params[1] ? true : undefined;
            break;
        }
        // 清空原数据
        this.page = 0;
        this.updateArticlesInfo(true);
      },
      dateSelect(dateRange) {
        this.selectedDateRange = dateRange;
        this.page = 0;
        this.limit_size = MaxLimitSize;
        this.updateArticlesInfo(true);
      },
      dateSelectClear() {
        this.selectedDateRange = [];
        this.page = 0;
        this.limit_size = DefaultLimitSize;
        this.updateArticlesInfo(true);
      }
    },
    components: {
      'article-home-banner': ArticleHomeBanner,
      'section-title': SectionTitle,
      'classify-menu': ClassifyMenu,
      'article-list-cell': ArticleListCell,
      'recommend': Recommend,
      'tag-wall': TagWall,
      'browse-more': BrowseMore
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  .article-home-content
    .banner
      position relative
      width 100%
      overflow hidden
      .bracket
        margin-top 25%
        @media only screen and (max-width: $responsive-sm)
          margin-top 38%
      .target
        position absolute
        top 0
        bottom 0
        left 0
        right 0
    .thumb-cards
      margin-top 15px
</style>
