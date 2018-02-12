<template>
  <div class="article-home-content layout-content">
    <div class="banner" v-if="bannerArticles.length > 0">
      <div class="bracket"></div>
      <div class="target">
        <article-home-banner :bannerArticles="bannerArticles"></article-home-banner>
      </div>
    </div>
    <iv-row style="margin-top:20px;">
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu :categorys="categorys" @selectCategory="selectCategory"
                         :defaultCategory="top_category"></classify-menu>
          <iv-affix style="position: relative;z-index: 12;">
            <section-title :mainTitle="'文章列表'"
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
          </iv-affix>
          <article-list-cell v-for="article in articles" :article="article" :key="article.id"></article-list-cell>
          <browse-more @browseMore="browseMore" ref="browseMore"></browse-more>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend></recommend>
          <tag-wall style="margin-top: 15px;"></tag-wall>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import ArticleHomeBanner from '@/components/views/Article/ArticleHomeBanner';
  import ArticleListCell from '@/components/views/Article/ArticleListCell';
  import SectionTitle from '@/components/views/SectionTitle';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';
  import BrowseMore from '@/components/views/BrowseMore';

  // API
  import {getArticleBaseInfo, getCategorys} from '@/api/api';

  const DEFAULT_LIMIT_SIZE = 10;
  const MAX_LIMIT_SIZE = 100;

  export default {
    data() {
      return {
        articles: [],
        bannerArticles: [],
        categorys: undefined,
        top_category: 1,
        timeSorted: false,
        mostComment: undefined,
        recommend: undefined,
        limit_size: DEFAULT_LIMIT_SIZE,
        page: 0,
        totalCount: 0,
        noMoreData: false,
        menus: [
          {title: '顺序', selectedTitle: '逆序', selected: true, method: 'timeSorted'},
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '推荐', selected: false, method: 'recommend'}
        ],
        datePickerOptions: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          },
          shortcuts: [
            {
              text: '近一周',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '近一个月',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '近三个月',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            },
            {
              text: '近一年',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                return [start, end];
              }
            }
          ]
        },
        selectedDateRange: []
      };
    },
    created() {
      this.getDatas();
      this.getCategorys();
    },
    mounted() {
    },
    methods: {
      browseMore() {
        this.page++;
        this.getArticleBaseInfo();
      },
      selectCategory(categoryId) {
        this.top_category = categoryId;
        this.articles = [];
        this.bannerArticles = [];
        this.noMoreData = false;
        this.getArticleBaseInfo();
        this.getBannerArticleBaseInfo();
      },
      getDatas() {
        this.getArticleBaseInfo();
        this.getBannerArticleBaseInfo();
      },
      getCategorys() {
        getCategorys({
          params: {
            'level_min': 1,
            'level_max': 1,
            'id': 1
          }
        }).then((response) => {
          this.categorys = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });
      },
      getBannerArticleBaseInfo() {
        getArticleBaseInfo({
          params: {
            top_category: this.top_category,
            is_banner: true
          }
        }).then((response) => {
          this.bannerArticles = this.bannerArticles.concat(response.data.results);
        }).catch(function (error) {
          console.log(error);
        });
      },
      getArticleBaseInfo() {
        if (!this.noMoreData) {
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
          getArticleBaseInfo({
            params: {
              top_category: this.top_category,
              ordering: orderings.toString(),
              is_recommend: this.recommend,
              time_min: this.selectedDateRange[0],
              time_max: this.selectedDateRange[1],
              is_banner: false,
              limit: this.limit_size,
              offset: this.page * this.limit_size
            }
          }).then((response) => {
            this.totalCount += response.data.results.length;
            this.noMoreData = this.totalCount >= response.data.count;
            this.articles = this.articles.concat(response.data.results);
            this.$nextTick(() => {
              this.$refs.browseMore.stopLoading(this.noMoreData);
            });
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
      reduceArticles(articles) {
        articles.map((article) => {
          if (article.is_banner) {
            this.bannerArticles.push(article);
          } else {
            this.articles.push(article);
          }
        });
        console.table(this.articles);
        console.table(this.bannerArticles);
      },
      refresh() {
        this.top_category = undefined;
        this.timeSorted = false;
        this.mostComment = undefined;
        this.recommend = undefined;
        this.page = 0;
        this.articles = [];
        this.bannerArticles = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.selectedDateRange = [];
        this.getArticleBaseInfo();
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
        this.articles = [];
        this.bannerArticles = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.getArticleBaseInfo();
      },
      dateSelect(dateRange) {
        this.selectedDateRange = dateRange;
        this.page = 0;
        this.limit_size = MAX_LIMIT_SIZE;
        this.articles = [];
        this.bannerArticles = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.getArticleBaseInfo();
      },
      dateSelectClear() {
        this.selectedDateRange = [];
        this.page = 0;
        this.limit_size = DEFAULT_LIMIT_SIZE;
        this.articles = [];
        this.bannerArticles = [];
        this.totalCount = 0;
        this.noMoreData = false;
        this.getArticleBaseInfo();
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
