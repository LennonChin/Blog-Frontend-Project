<template>
  <div class="section-title">
    <div class="title">
      <span class="square"></span>
      <span class="main-title">{{mainTitle}}</span>
      <span class="vertical-line"></span>
      <span class="sub-title">{{subTitle}}</span>
      <span class="view-more"><a href="">{{tipText}} <iv-icon type="arrow-right-b"></iv-icon></a></span>
    </div>
    <div class="menu">
      <ul class="list clearfix" v-if="menus.length > 0">
        <li v-for="menu in menus" :key="menu.title">
          <a @click="selectMenu(menu.method)">{{ menu.title }}</a>
        </li>
      </ul>
      <div class="date-picker" v-if="withTimeSelect">
        <iv-date-picker type="daterange" confirm placement="bottom-end" placeholder="选择日期区间" style="width: 180px;"></iv-date-picker>
      </div>
      <div class="refresh" v-if="withRefresh">
        <a @click="selectMenu('refresh')" title="刷新">
          <iv-icon type="refresh"></iv-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      mainTitle: '',
      subTitle: '',
      tipText: {
        default: 'View More'
      },
      menus: {
        Type: Array,
        default: function () {
          return [];
        }
      },
      withRefresh: {
        Type: Boolean,
        default: false
      },
      withTimeSelect: {
        Type: Boolean,
        default: false
      }
    },
    methods: {
      selectMenu(method) {
        this.$emit('titleControl', [method]);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/index.styl"

  .section-title
    display flex
    justify-content space-between
    padding 20px 0
    height 90px
    line-height 50px
    text-align left
    box-sizing border-box
    @media only screen and (max-width: 768px)
      padding 10px 0
      height 70px
    .title
      .square
        display inline-block
        height 30px
        width 30px
        background #000000
        vertical-align middle
      .main-title
        display inline-block
        vertical-align middle
        font-size 22px
        padding 0 10px
      .vertical-line
        display inline-block
        height 20px
        width 1px
        background-color #333
        vertical-align middle
      .sub-title
        display inline-block
        vertical-align middle
        font-size 18px
        padding-left 10px
      .view-more
        display inline-block
        vertical-align middle
        font-size 14px
        padding-left 10px
        a
          color $color-main-primary
          font-weight 500
          cursor pointer
          &:hover
            text-decoration underline
    .menu
      display flex
      height 100%
      line-height inherit
      float right
      @media only screen and (max-width: 768px)
        display none
      ul.list
        li
          float left
          margin 0 6px
          a
            padding 6px 0
            &:hover, &.active
              color $color-main-primary
              border-bottom 2px solid $color-main-primary
      .date-picker
        width 180px
        margin-left 15px
        font-size 13px
      .refresh
        margin-left 15px
        line-height inherit
        a
          font-size 20px
          color $color-gradually-gray-41
          cursor pointer
          &:hover
            color $color-main-primary

</style>
