<template>
  <div class="search-result-section">
    <p class="type">{{ typeName() }}</p>
    <a class="result-option" v-for="(result, index) in result.results" :key="index" :data-link="result.link" @click="handleClick">
      <p class="title">{{result.title}}</p>
      <p class="infos">
        <span class="comments">作者： {{result.author}}</span>
        <span class="publish-time">时间： {{ result.add_time | socialDate }} </span>
      </p>
      <p class="highlighted" v-html="result.highlighted" @click.prevent></p>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      result: {
        default: []
      }
    },
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
      margin-bottom 5px
      border-bottom 1px solid $color-border-hover
      background-color $color-border
    .result-option
      display block
      padding 5px 20px
      background-color white
      border-bottom 1px solid $color-border
      &:hover, &.select-option
        background-color $color-gradually-gray-101
      .title, .infos
        font-size 14px
        line-height 22px
      .infos
        color $color-gradually-gray-71
        > span
          margin-right 20px
      .highlighted
        padding-top 5px
        font-size 13px
        line-height 16px
        color $color-gradually-gray-61
        word-wrap break-word
        word-break break-all
        em
          color $color-main-primary
</style>
