<template>
  <div class="classify" v-if="categorys.length > 0">
    <p class="header-title">{{ $t('album.typeName') + $t('others.category') }}</p>
    <i-row>
      <i-col :xs="8" :sm="6" :md="4" :lg="4" v-for="category in categorys" :key="category.id">
        <a class="content" @click="selectCategory(category)">
          <img :src="category.image" alt="">
          <p class="title">{{ category.name }}</p>
          <p class="desc">{{ category.desc }}</p>
        </a>
      </i-col>
    </i-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'classify-wall',
    props: {
      categorys: {
        Type: Array,
        default: []
      }
    },
    methods: {
      selectCategory(category) {
        this.$emit('selectCategory', category);
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .classify
    overflow hidden
    p.header-title
      text-align center
      border 2px dotted #ccc
      @media only screen and (max-width: 768px)
        font-size 21px
        padding 12px 0
        margin 10px 0 6px
      @media screen and (min-width: 768px)
        font-size 24px
        padding 15px 0
        margin 15px 0 10px
      @media screen and (min-width: 992px)
        font-size 28px
        padding 18px 0
        margin 18px 0 14px
      @media screen and (min-width: 1200px)
        font-size 30px
        padding 20px 0
        margin 20px 0 16px
    a.content
      display block
      position relative
      padding-bottom: 40%;
      width: 100%;
      height: 0;
      border 3px solid #fff
      overflow hidden
      img
        width 100%
        transition: All 0.4s ease-in-out
        transform: scale(1.0)
        zoom: 1.0
      &:hover
        img
          transition: All 0.4s ease-in-out
          transform: scale(1.05)
          zoom: 1.05
      .title
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        text-align center
        font-size 20px
        font-weight 500
        color #fff
        padding-top 12%
      .desc
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        text-align center
        font-size 15px
        font-weight 200
        color #fff
        padding-top 24%
</style>
