<template>
  <div class="book-note-list-content layout-content">
    <i-row>
      <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <classify-menu :categorys="categorysInfo" @selectCategory="selectCategory"
                         :defaultCategory="selected_category"></classify-menu>
          <section-title :mainTitle="$t('others.bookNoteTitle') + $t('others.list')"
                         :subTitle="'Book Notes'"
                         :menus="menus"
                         :withRefresh="true"
                         :withTimeSelect="true"
                         :datePickerOptions="datePickerOptions"
                         @refresh="refresh"
                         @menusControl="menusControl"
                         @comfirmDateSelect="dateSelect"
                         @clearDateSelect="dateSelectClear">
          </section-title>
          <book-note-cell v-for="bookNote in bookNotes" :bookNote="bookNote" :key="bookNote.id"></book-note-cell>
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
  import BookNoteCell from '@/components/views/Book/BookNoteCell';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';
  import SectionTitle from '@/components/views/SectionTitle';
  import Recommend from '@/components/views/Recommend';
  import TagWall from '@/components/views/TagWall';
  import BrowseMore from '@/components/views/BrowseMore';

  import {
    DefaultLimitSize,
    SectionTitleDefaultMenus,
    SectionTitleDefaultDatePickerOptions
  } from '@/common/js/const';

  // mixin
  import {mixin, dateAdd} from '@/common/js/utils';

  export default {
    name: 'book-note-list-content',
    data() {
      return {
        selected_category: undefined,
        // 图书笔记相关
        timeSorted: false,
        mostComment: undefined,
        recommend: undefined,
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
        store.dispatch('bookNoteList/GET_BOOKNOTES_BASE_INFO', {
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
      this.clearBookNotesBaseInfo();
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
      if (this.$store.state.bookNoteList.bookNotes.length === 0) {
        console.log('non ssr');
        // 未SSR的情况
        this.updateBookNotesInfo(true);
      }
    },
    beforeDestroy() {
      // 导航离开时清空vuex中数据
      this.clearBookNotesBaseInfo();
    },
    computed: {
      ...mapState({
        bookNotes: state => state.bookNoteList.bookNotes,
        noMoreData: state => state.bookNoteList.noMoreData
      }),
      categorysInfo: function () {
        return this.allCategorysInfo.filter((category) => {
          return category.category_type === 'readings';
        });
      }
    },
    methods: {
      ...mapMutations({
        clearBookNotesBaseInfo: 'bookNoteList/CLAER_BOOKNOTES_BASE_INFO'
      }),
      ...mapActions({
        getBookNotesBaseInfo: 'bookNoteList/GET_BOOKNOTES_BASE_INFO'
      }),
      updateBookNotesInfo(reset) {
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
        this.getBookNotesBaseInfo({
          params: {
            params: {
              top_category: this.selected_category,
              ordering: orderings.toString(),
              is_recommend: this.recommend,
              time_min: this.selectedDateRange[0],
              time_max: this.selectedDateRange[1],
              limit: DefaultLimitSize,
              offset: this.page * DefaultLimitSize
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
        console.log('browseMoreBooks');
        this.page++;
        this.updateBookNotesInfo(false);
      },
      selectCategory(categoryId) {
        console.log(categoryId);
        this.selected_category = categoryId;
        // 清空图书原数据
        this.timeSorted = false;
        this.mostComment = undefined;
        this.recommend = undefined;
        this.selectedDateRange = [];
        this.page = 0;
        this.updateBookNotesInfo(true);
      },
      refresh() {
        this.selected_category = parseInt(this.$route.params.id);
        this.timeSorted = false;
        this.mostComment = undefined;
        this.recommend = undefined;
        this.selectedDateRange = [];
        this.page = 0;
        this.limit_size = DefaultLimitSize;
        this.updateBookNotesInfo(true);
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
        this.updateBookNotesInfo(true);
      },
      dateSelect(dateRange) {
        this.selectedDateRange = [dateRange[0], dateAdd(dateRange[1], 60 * 60 * 24 * 1000)];
        this.page = 0;
        this.updateBookNotesInfo(true);
      },
      dateSelectClear() {
        this.selectedDateRange = [];
        this.page = 0;
        this.updateBookNotesInfo(true);
      }
    },
    components: {
      'book-note-cell': BookNoteCell,
      'classify-menu': ClassifyMenu,
      'section-title': SectionTitle,
      'recommend': Recommend,
      'tag-wall': TagWall,
      'browse-more': BrowseMore
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
