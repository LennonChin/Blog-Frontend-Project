<template>
  <div class="book-catalog" v-if="book != undefined">
    <ul class="book-toc-list">
      <li class="book-toc-list-item" v-for="note1 in book.book_note">
        <a class="book-toc-link" :class="{'is-active-link' : note1.is_reading}" @click.prevent="gotoBookNoteDetail(note1)" :href="`/${note1.post_type}/${note1.id}`">
          <i-tool-tip placement="right" :content="note1.is_completed ? $t('book.readDone') : (note1.is_reading ? $t('book.reading') : $t('book.noRead'))">
            <span><i-icon :type="note1.is_completed ? 'android-checkbox-outline' : (note1.is_reading ? 'play' : 'android-checkbox-outline-blank')"></i-icon></span>
          </i-tool-tip>
          {{ note1.title }}
          <i-tool-tip placement="right" :content="$t('book.noteDone')" v-if="note1.is_noted">
            <i-icon type="ios-compose"></i-icon>
          </i-tool-tip>
        </a>
        <ul class="book-toc-list" v-if="note1.sub_note.length > 0">
          <li class="book-toc-list-item" v-for="note2 in note1.sub_note">
            <a class="book-toc-link" :class="{'is-active-link' : note2.is_reading}" @click.prevent="gotoBookNoteDetail(note2)":href="`/${note2.post_type}/${note2.id}`">
              <i-tool-tip placement="right" :content="note2.is_completed ? $t('book.readDone') : (note2.is_reading ? $t('book.reading') : $t('book.noRead'))">
                <span><i-icon :type="note2.is_completed ? 'android-checkbox-outline' : (note2.is_reading ? 'play' : 'android-checkbox-outline-blank')"></i-icon></span>
              </i-tool-tip>
              {{ note2.title }}
              <i-tool-tip placement="right" :content="$t('book.noteDone')" v-if="note2.is_noted">
                <i-icon type="ios-compose"></i-icon>
              </i-tool-tip>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {checkPostAuth} from '@/common/js/utils';

  export default {
    name: 'book-catalog',
    props: {
      book: {
        Type: Object,
        default: undefined
      }
    },
    methods: {
      gotoBookNoteDetail(note) {
        if (!note.is_noted) {
          this.$Notice.info({
            title: '无文章信息'
          });
          return;
        }
        checkPostAuth.call(this, note, '提示', '该文章已加密，您需要输入访问密码', () => {
          this.$router.push({name: note.post_type, params: {id: note.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: note.post_type,
            params: {id: note.id},
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, (error) => {
          console.log(error);
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
      margin 0
      padding-left 25px
      overflow-y hidden
    > .book-toc-list
      padding-left 8px
    .book-toc-list-item
      a.book-toc-link
        line-height 30px
        padding 5px 0
        color $default-desc-color
        i
          font-size 16px
        &.is-active-link
          font-weight: 700
          color $default-link-hover-color
        &:hover
          color $default-link-hover-color
</style>
