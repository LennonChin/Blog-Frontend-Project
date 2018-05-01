<template>
  <div class="search-view">
    <i-input v-model="searchKeyWords"
             icon="ios-search"
             placeholder="你想搜什么？"
             @on-change="search">
    </i-input>
    <transition name="fade" mode="out-in">
      <div class="result-area custom-scrollbar" :class="{hide: !optionsVisible}" ref="resultsContianer">
        <search-result-section v-for="(value, key) in searchResult" :key="key" :type="key"
                               :results="value"></search-result-section>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@/api/client-api';
  import SearchResultSection from '@/components/views/Search/SearchResultSection';

  export default {
    name: 'search-view',
    data() {
      return {
        searchKeyWords: '',
        searchResult: [],
        hideOptions: false,
        focusIndex: -1
      };
    },
    mounted() {
      document.addEventListener('keydown', this.handleKeydown);
    },
    computed: {
      optionsVisible: function() {
        const visible = !(this.searchKeyWords.length === 0 || this.searchResult.length === 0 || this.hideOptions);
        if (!visible && this.$refs.resultsContianer !== undefined) {
          this.$refs.resultsContianer.scrollTop = 0;
        }
        return visible;
      },
      resultOptions: function () {
        if (this.$refs.resultsContianer !== undefined) {
          return this.$refs.resultsContianer.querySelectorAll('.result-option');
        }
        return undefined;
      }
    },
    methods: {
      search() {
        console.log(this.searchKeyWords);
        this.hideOptions = false;
        if (this.searchKeyWords.length === 0) {
          this.searchResult = [];
          return;
        }
        API.search({
          params: {
            'title__contains': this.searchKeyWords
          }
        }).then((response) => {
          this.searchResult = response.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      handleKeydown (e) {
        if (this.optionsVisible) {
          const keyCode = e.keyCode;
          // Esc slide-up
          if (keyCode === 27) {
            e.preventDefault();
            this.hideMenu();
          }
          // next
          if (keyCode === 40) {
            e.preventDefault();
            this.navigateOptions('next');
          }
          // prev
          if (keyCode === 38) {
            e.preventDefault();
            this.navigateOptions('prev');
          }
          // enter
          if (keyCode === 13) {
            e.preventDefault();
            this.choseOption(this.focusIndex);
          }
        }
      },
      choseOption(choseIndex) {
        const option = this.findOption(choseIndex);
        if (option !== undefined) {
          window.open(option.getAttribute('data-link'), '_blank');
        }
      },
      focusOption(option) {
        if (option === undefined) return;
        // 去除之前选中的option的class
        const selectedOptions = this.$refs.resultsContianer.querySelectorAll('.select-option');
        if (selectedOptions.length > 0) {
          selectedOptions[0].classList.remove('select-option');
        }
        option.classList.add('select-option');
        // 重置菜单滚动高度
        this.resetScrollTop(option);
      },
      navigateOptions (direction) {
        console.log(direction);
        if (direction === 'next') {
          this.focusIndex++;
        } else if (direction === 'prev') {
          this.focusIndex--;
        }
        this.focusOption(this.findOption(this.focusIndex));
      },
      findOption(index) {
        // 小于0
        if (index < 0) {
          this.focusIndex = 0;
          return undefined;
        }
        // 大于所有个数
        if (index > this.resultOptions.length - 1) {
          this.focusIndex = this.resultOptions.length - 1;
          return undefined;
        }
        // 等于0时重置scrollTop为0，让内容顶到顶部
        if (index === 0) {
          this.$refs.resultsContianer.scrollTop = 0;
        }
        return this.resultOptions.item(index);
      },
      resetScrollTop (selectedOptions) {
        const menu = this.$refs.resultsContianer;
        // 选中option顶部距离浏览器顶部距离
        const optionTop = selectedOptions.offsetTop + menu.offsetTop - menu.scrollTop;
        // 选中option底部距离浏览器底部距离
        const optionBottom = selectedOptions.offsetTop + selectedOptions.clientHeight + menu.offsetTop - menu.scrollTop;
        // 菜单顶部距离浏览器顶部距离
        const menuTop = menu.offsetTop;
        // 菜单底部距离浏览器底部距离
        const menuBottom = menu.clientHeight + menu.offsetTop;
        // 当选中option底部大于菜单底部，说明下面超出了
        if (optionBottom > menuBottom) {
          menu.scrollTop += (optionBottom - menuBottom);
        }
        // 当选中option底部小于菜单底部，说明上面超出了
        if (optionTop < menuTop) {
          menu.scrollTop -= (menuTop - optionTop);
        }
      },
      hideMenu() {
        this.hideOptions = true;
        this.focusIndex = -1;
      }
    },
    components: {
      'search-result-section': SearchResultSection
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .search-view
    position relative
    width 260px
    max-width 100vw
    max-height 60px
    .result-area
      overflow-y scroll
      position absolute
      display block
      left 0
      top 100%
      width 180%
      max-width 100vw
      max-height 70vh
      background-color white
      z-index 1000
      border 1px solid $color-border
      box-shadow 1px 1px 1px $color-border
      &.hide
        display none
</style>
