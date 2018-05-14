<template>
  <div class="movie-list-content layout-content">
    <i-row>
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu :categorys="categorysInfo" @selectCategory="selectCategory" :defaultCategory="selected_category"></classify-menu>
          <section-title :mainTitle="'电影列表'"
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
          <i-row :gutter="10">
            <i-col :xs="12" :sm="12" :md="8" :lg="8" v-for="movie in movies" :key="movie.id"
                    style="margin-bottom: 10px;">
              <movie-list-item :movie="movie"></movie-list-item>
            </i-col>
          </i-row>
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
  import MovieListItem from '@/components/views/Movie/MovieListItem';
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
  import {mixin} from '@/common/js/utils';

  export default {
    name: 'movie-list-content',
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
    mixins: [mixin],
    metaInfo() {
      return {
        title: this.documentMeta.title,
        meta: [
          {name: 'description', content: this.documentMeta.description},
          {name: 'keywords', content: this.documentMeta.keywords}
        ]
      };
    },
    asyncData({store, route}) {
      this.selected_category = route.params.id;
      return Promise.all([
        store.dispatch('movieList/GET_MOVIES_BASE_INFO', {
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
    beforeRouteUpdate(to, from, next) {
      next();
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
        this.updateMoviesInfo({
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
        movies: state => state.movieList.movies,
        noMoreData: state => state.movieList.noMoreData
      }),
      ...mapGetters({
        documentMeta: 'DOCUMENT_META'
      }),
      categorysInfo: function () {
        return this.allCategorysInfo.filter((category) => {
          return category.category_type === 'movies';
        });
      }
    },
    methods: {
      ...mapMutations({
        clearMoviesBaseInfo: 'movieList/CLAER_MOVIES_BASE_INFO'
      }),
      ...mapActions({
        getMoviesBaseInfo: 'movieList/GET_MOVIES_BASE_INFO'
      }),
      updateMoviesInfo(reset) {
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
        this.getMoviesBaseInfo({
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
        this.updateMoviesInfo();
      },
      selectCategory(categoryId) {
        this.selected_category = categoryId;
        this.page = 0;
        this.updateMoviesInfo(true);
      },
      refresh() {
        this.timeSorted = false;
        this.mostComment = undefined;
        this.recommend = undefined;
        this.page = 0;
        this.selectedDateRange = [];
        this.updateMoviesInfo(true);
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
        this.updateMoviesInfo(true);
      },
      dateSelect(dateRange) {
        this.selectedDateRange = dateRange;
        this.page = 0;
        this.limit_size = MaxLimitSize;
        this.updateMoviesInfo(true);
      },
      dateSelectClear() {
        this.selectedDateRange = [];
        this.page = 0;
        this.limit_size = DefaultLimitSize;
        this.updateMoviesInfo(true);
      }
    },
    components: {
      'section-title': SectionTitle,
      'classify-menu': ClassifyMenu,
      'movie-list-item': MovieListItem,
      'recommend': Recommend,
      'tag-wall': TagWall,
      'browse-more': BrowseMore
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
</style>
