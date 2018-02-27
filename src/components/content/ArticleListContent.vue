<template>
  <div class="article-list-content layout-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu :categorys="categorys" @selectCategory="selectCategory"
                         :defaultCategory="top_category"></classify-menu>
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
          <article-list-cell v-for="article in articles" :article="article" :key="article.title"></article-list-cell>
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
  import ArticlePageContent from '@/components/views/Article/ArticlePageContent';
  import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter';
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
        categorys: undefined,
        top_category: undefined,
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
      this.top_category = parseInt(this.$route.params.id);
      this.getDatas();
      this.getCategorys();
    },
    methods: {
      browseMore() {
        console.log('browseMore');
        this.page++;
        this.getArticleBaseInfo();
      },
      selectCategory(categoryId) {
        this.top_category = categoryId;
        this.noMoreData = false;
        this.getArticleBaseInfo();
      },
      getDatas() {
        this.getArticleBaseInfo();
      },
      getCategorys() {
        getCategorys({
          params: {
            'level_min': 1,
            'level_max': 1,
            'id': this.$Window.__category_info__.article
          }
        }).then((response) => {
          this.categorys = response.data.results;
        }).catch((error) => {
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
              is_recommend: false,
              time_min: this.selectedDateRange[0],
              time_max: this.selectedDateRange[1],
              limit: this.limit_size,
              offset: this.page * this.limit_size
            }
          }).then((response) => {
            this.articles = response.data.results;
            this.totalCount += response.data.results.length;
            this.noMoreData = this.totalCount >= response.data.count;
            this.$refs.browseMore.stopLoading(this.noMoreData);
          }).catch((error) => {
            console.log(error);
          });
        }
      },
      refresh() {
        this.top_category = undefined;
        this.timeSorted = false;
        this.mostComment = undefined;
        this.recommend = undefined;
        this.page = 0;
        this.posts = {};
        this.totalCount = 0;
        this.noMoreData = false;
        this.selectedDateRange = [];
        this.getDatas();
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
        this.posts = {};
        this.totalCount = 0;
        this.noMoreData = false;
        this.getDatas();
      },
      dateSelect(dateRange) {
        this.selectedDateRange = dateRange;
        this.page = 0;
        this.limit_size = MAX_LIMIT_SIZE;
        this.posts = {};
        this.totalCount = 0;
        this.noMoreData = false;
        this.getDatas();
      },
      dateSelectClear() {
        this.selectedDateRange = [];
        this.page = 0;
        this.limit_size = DEFAULT_LIMIT_SIZE;
        this.posts = {};
        this.totalCount = 0;
        this.noMoreData = false;
        this.getDatas();
      }
    },
    watch: {
      selectedCategory: function () {
        this.getDatas();
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
