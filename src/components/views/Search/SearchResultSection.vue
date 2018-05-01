<template>
  <div class="search-result-section">
    <p class="type">{{ type }}</p>
    <div class="result-option" v-for="(result, index) in results" :key="index" :data-link="result.link">
      <p class="title">{{result.title}} - {{index}}</p>
      <p class="infos">
        <span class="comments">作者： {{result.author}}</span>
        <span class="publish-time">时间： {{ result.add_time | socialDate }} </span>
      </p>
      <p class="highlighted" v-html="result.highlighted"></p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      type: {
        default: ''
      },
      results: {
        default: []
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .search-result-section
    .type
      line-height 21px
      font-size 17px
      padding 5px 15px
      margin-bottom 5px
      border-bottom 1px solid $color-border
    .result-option
      padding 5px 20px
      background-color white
      &.select-option
        background-color $color-border
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
</style>
