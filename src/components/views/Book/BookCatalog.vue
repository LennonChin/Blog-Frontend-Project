<template>
  <div class="book-catalog" :class="{'open': showMoreToc}" v-if="book != undefined">
    <ul class="book-toc-list">
      <li class="book-toc-list-item" v-for="chapter in book.book_chapter">
        <a class="book-toc-link">
          <iv-tool-tip placement="right" :content="'已读'">
            <span><iv-icon type="android-checkbox-outline"></iv-icon></span>
          </iv-tool-tip>
          {{ chapter.title }}
          <iv-tool-tip placement="right" :content="'笔记已完成'">
            <iv-icon type="ios-compose"></iv-icon>
          </iv-tool-tip>
        </a>
        <ul class="book-toc-list is-collapsible" v-if="chapter.book_section.length > 0">
          <li class="book-toc-list-item" v-for="section in chapter.book_section">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'已读'">
                <iv-icon type="android-checkbox-outline"></iv-icon>
              </iv-tool-tip>
              {{ section.title }}
              <iv-tool-tip placement="right" :content="'笔记已完成'">
                <iv-icon type="ios-compose"></iv-icon>
              </iv-tool-tip>
            </a>
          </li>
        </ul>
      </li>
    </ul>
    <a class="toggle-more" @click="openToc" v-if="showToggleMoreMenu">
      <span style="z-index: 10;">
        {{ showMoreToc ? '收起目录' : '展开查看所有目录' }}
        <iv-icon :type="showMoreToc ? 'chevron-up' : 'chevron-down'"></iv-icon>
      </span>
      <div class="mask" style="z-index: 9;"></div>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      book: {
        Type: Object,
        default: undefined
      }
    },
    data() {
      return {
        showMoreToc: false,
        showToggleMoreMenu: false
      };
    },
    mounted() {
      this.$nextTick(() => {
        let toc = document.querySelector('.book-catalog ul');
        if (toc && toc.clientHeight >= 360) {
          console.log(toc.clientHeight);
          this.showToggleMoreMenu = true;
        } else {
          this.showToggleMoreMenu = false;
        }
      });
    },
    methods: {
      openToc() {
        this.showMoreToc = !this.showMoreToc;
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .book-catalog
    li
      list-style: none
    .book-toc-list
      margin: 0;
      padding-left: 25px
      overflow-y: hidden
    > .book-toc-list
      max-height 360px
      padding-left 8px
    .book-toc-list-item
      a.book-toc-link
        height: 100%
        line-height 30px
        padding 5px 0
        color $color-gradually-gray-31
        i
          font-size 16px
        &.is-active-link
          font-weight: 700
          color $color-main-primary
        &:hover
          color $color-main-primary
    &.is-collapsible
      max-height: 1000px;
      overflow: hidden;
      transition: all 300ms ease-in-out
    &.is-collapsed
      max-height: 0
    .toggle-more
      position relative
      display block
      color $color-main-primary
      background-color transparent
      margin-top -40px
      padding 60px 0 10px
      text-align center
      span
        position relative
      .mask
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        opacity 1
        background-image linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1));
  &.open
    > .book-toc-list
      max-height inherit
      overflow hidden
      transition all 300ms ease-in-out
    .toggle-more
      .mask
        opacity 0
</style>
