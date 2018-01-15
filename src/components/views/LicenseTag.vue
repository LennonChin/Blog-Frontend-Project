<template>
  <div class="license-tag" v-if="license != undefined">
    <a :href="license.link" target="_blank">
      <span class="name" :style="{background: license.color, border: '1px solid ' + license.color}">License</span>
      <span class="type" :style="{color: license.color, border: '1px solid ' + license.color}">{{ license.name }}</span>
      <span class="desc" v-if="license.desc.length > 0" v-html="license.desc"></span>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      license: {
        Type: Object,
        default: undefined
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl"

  .license-tag
    margin 10px 0
    font-size 0
    a
      display inline-block
      &:hover
        cursor pointer
        text-decoration none
      .name, .type, .desc
        display inline-block
        padding 5px 8px
        margin 5px 0
        font-size 15px
        text-align center
      .name
        background-color $color-main-primary
        color $white
        border 1px solid $color-main-primary
        font-weight 700
      .type
        background-color $white
        color $color-main-primary
        border 1px solid $color-main-primary
      .desc
        font-size 14px
        color $color-gradually-gray-51

</style>
