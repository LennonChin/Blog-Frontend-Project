<template>
  <div class="book-catalog" :class="{'open': showMoreToc}" v-if="book != undefined">
    <ul class="book-toc-list">
      <li class="book-toc-list-item" v-for="note1 in book.book_note">
        <a class="book-toc-link" :class="{'is-active-link' : note1.is_reading}" @click="gotoBookNoteDetail(note1)">
          <i-tool-tip placement="right" :content="note1.is_completed ? '已读' : (note1.is_reading ? '正在读' : '未读')">
            <span><i-icon :type="note1.is_completed ? 'android-checkbox-outline' : (note1.is_reading ? 'play' : 'android-checkbox-outline-blank')"></i-icon></span>
          </i-tool-tip>
          {{ note1.title }}
          <i-tool-tip placement="right" :content="'笔记已完成'" v-if="note1.is_noted">
            <i-icon type="ios-compose"></i-icon>
          </i-tool-tip>
        </a>
        <ul class="book-toc-list is-collapsible" v-if="note1.sub_note.length > 0">
          <li class="book-toc-list-item" v-for="note2 in note1.sub_note">
            <a class="book-toc-link" :class="{'is-active-link' : note2.is_reading}" @click="gotoBookNoteDetail(note2)">
              <i-tool-tip placement="right" :content="note2.is_completed ? '已读' : (note2.is_reading ? '正在读' : '未读')">
                <span><i-icon :type="note2.is_completed ? 'android-checkbox-outline' : (note2.is_reading ? 'play' : 'android-checkbox-outline-blank')"></i-icon></span>
              </i-tool-tip>
              {{ note2.title }}
              <i-tool-tip placement="right" :content="'笔记已完成'" v-if="note2.is_noted">
                <i-icon type="ios-compose"></i-icon>
              </i-tool-tip>
            </a>
          </li>
        </ul>
      </li>
    </ul>
    <a class="toggle-more" @click="openToc" v-if="showToggleMoreMenu">
      <span style="z-index: 10;">
        {{ showMoreToc ? '收起目录' : '展开查看所有目录' }}
        <i-icon :type="showMoreToc ? 'chevron-up' : 'chevron-down'"></i-icon>
      </span>
      <div class="mask" style="z-index: 9;"></div>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  import {checkPostAuth} from '@/common/js/utils';

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
          this.showToggleMoreMenu = true;
        } else {
          this.showToggleMoreMenu = false;
        }
      });
    },
    methods: {
      openToc() {
        this.showMoreToc = !this.showMoreToc;
      },
      gotoBookNoteDetail(note) {
        if (!note.is_noted) {
          this.$Notice.info({
            title: '无文章信息'
          });
          return;
        }
        checkPostAuth.call(this, note, '提示', '该文章已加密，您需要输入阅读密码', () => {
          this.$router.push({name: note.post_type, params: {id: note.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: note.post_type,
            params: {id: note.id},
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, () => {
          this.$Notice.error({
            title: '密码错误'
          });
        });
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
