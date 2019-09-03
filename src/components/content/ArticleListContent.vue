<template>
  <div class="article-list-content layout-content">
    <i-row>
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu :categorys="categorysInfo" @selectCategory="selectCategory"
                         :defaultCategory="selected_category"></classify-menu>
          <section-title :mainTitle="$t('article.typeName') + $t('others.list')"
                         :subTitle="'Articles'"
                         :menus="menus"
                         :withRefresh="true"
                         :withTimeSelect="true"
                         :datePickerOptions="datePickerOptions"
                         @refresh="refresh"
                         @menusControl="menusControl"
                         @comfirmDateSelect="dateSelect"
                         @clearDateSelect="dateSelectClear">
          </section-title>
          <article-list-cell v-for="article in articles" :article="article" :key="article.title"></article-list-cell>
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
    mapMutations,
    mapActions
  } from 'vuex';
  import ArticlePageContent from '@/components/views/Article/ArticlePageContent';
  import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter';
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

  // mixin
  import {mixin, dateAdd} from '@/common/js/utils';

  export default {
    name: 'article-list-content',
    data() {
      return {
        categorys: undefined,
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
    mixins: [mixin],
    asyncData({store, route}) {
      this.selected_category = route.params.id;
      return Promise.all([
        store.dispatch('articleList/GET_ARTICLES_BASE_INFO', {
          params: {
            params: {
              top_category: this.selected_category,
              ordering: '-add_time',
              limit: DefaultLimitSize
            }
          },
          reset: true
        })
      ]);
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开时清空已有的数据
      this.clearArticlesBaseInfo();
      next();
    },
    beforeRouteUpdate(to, from, next) {
      next();
      console.log('beforeRouteUpdate');
      this.selected_category = this.$route.params.id;
      this.refresh();
    },
    created() {
      this.selected_category = this.$route.params.id;
    },
    mounted() {
      if (this.$store.state.articleList.articles.length === 0) {
        console.log('non ssr');
        // 未SSR的情况
        this.updateArticlesInfo(true);
      }
    },
    beforeDestroy() {
      // 导航离开时清空vuex中数据
      this.clearArticlesBaseInfo();
    },
    computed: {
      ...mapState({
        articles: state => state.articleList.articles,
        noMoreData: state => state.articleList.noMoreData
      }),
      categorysInfo: function () {
        return this.allCategorysInfo.filter((category) => {
          return category.category_type === 'articles';
        });
      }
    },
    methods: {
      ...mapMutations({
        clearArticlesBaseInfo: 'articleList/CLAER_ARTICLES_BASE_INFO'
      }),
      ...mapActions({
        getArticlesBaseInfo: 'articleList/GET_ARTICLES_BASE_INFO'
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
        console.log(this.selectedDateRange);
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
        console.log('browseMore');
        this.page++;
        this.updateArticlesInfo(false);
      },
      selectCategory(categoryId) {
        this.selected_category = categoryId;
        this.page = 0;
        this.updateArticlesInfo(true);
      },
      refresh() {
        console.log('refresh');
        this.timeSorted = false;
        this.mostComment = undefined;
        this.recommend = undefined;
        this.selectedDateRange = [];
        this.page = 0;
        this.limit_size = DefaultLimitSize;
        this.updateArticlesInfo(true);
      },
      menusControl(params) {
        switch (params[0]) {
          case 'timeSorted':
            this.timeSorted = !params[1];
            break;
          case 'mostComment':
            this.mostComment = params[1];
            break;
          case 'recommend':
            this.recommend = params[1];
            break;
        }
        // 清空原数据
        this.page = 0;
        this.updateArticlesInfo(true);
      },
      dateSelect(dateRange) {
        this.selectedDateRange = [dateRange[0], dateAdd(dateRange[1], 60 * 60 * 24 * 1000)];
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
      'article-page-content': ArticlePageContent,
      'article-page-footer': ArticlePageFooter,
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
</style>
