<template>
  <div class="search-result-section">
    <p class="type">{{ typeName() }}</p>
    <a class="result-option" v-for="(result, index) in result.results" :key="index" :data-link="result.link" @click="handleClick">
      <p class="title">{{result.title}}</p>
      <p class="infos">
        <span class="comments">{{ $t('other.author') }}： {{result.author}}</span>
        <span class="publish-time">{{ $t('other.time') }}： {{ result.add_time | socialDate }} </span>
      </p>
      <p class="highlighted" v-html="result.highlighted" @click.prevent></p>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  // mixin
  import {mixin} from '@/common/js/utils';

  export default {
    props: {
      result: {
        default: []
      }
    },
    mixins: [mixin],
    methods: {
      typeName() {
        switch (this.result.type) {
          case 'material':
            return '评论';
          case 'article':
            return '文章';
          default:
            return '其他';
        }
      },
      handleClick(event) {
        event.preventDefault();
        this.$emit('clickOption', event.currentTarget);
      },
      handleMousein(event) {
        event.preventDefault();
        this.$emit('handleMouseinOption', event.currentTarget);
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .search-result-section
    .type
      line-height 21px
      font-size 16px
      padding 12px 15px 8px
      color $default-title-color
      font-weight 700
      border-bottom 1px solid $default-border-hover-color
      background-color $default-border-color
      box-shadow 1px 1px 1px $default-box-shadow-color
    .result-option
      display block
      padding 5px 20px
      background-color $default-background-color
      border-bottom 1px solid $default-border-color
      &:hover, &.select-option
        background-color $default-background-hover-color
      .title
        font-size 14px
        line-height 22px
        color $default-title-color
      .infos
        font-size 12px
        line-height 22px
        span
          color $default-info-color
          margin-right 20px
      .highlighted
        padding-top 5px
        font-size 13px
        line-height 16px
        color $default-desc-color
        word-wrap break-word
        word-break break-all
        em
          color $default-desc-hover-color
</style>
