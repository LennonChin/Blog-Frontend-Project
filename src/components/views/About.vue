<template>
  <div class="about">
    <img class="background" :src="bloggerInfo.background" alt="">
    <img class="avatar" :src="bloggerInfo.avatar" alt="">
    <p class="name">{{ bloggerInfo.name_en }}</p>
    <p class="desc">{{ bloggerInfo.desc }}</p>
    <ul class="social">
      <li v-for="social in bloggerInfo.socials"><a :href="social.url"><img :src="social.image" alt=""></a></li>
    </ul>
    <div class="line"></div>
    <h4>技能值</h4>
    <div class="progresses">
      <iv-row v-for="master in bloggerInfo.masters" :gutter="20" :key="master.id">
        <iv-col :span="6">
          <p class="title">{{ master.name }}</p>
        </iv-col>
        <iv-col :span="18">
          <iv-progress status="normal" :hide-info="true" :stroke-width="8" :percent="master.experience" class="bar"></iv-progress>
        </iv-col>
      </iv-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getBloggerInfo} from '@/api/api';

  export default {
    data() {
      return {
        bloggerInfo: {}
      };
    },
    created() {
      this.getDatas();
    },
    methods: {
      getDatas() {
        getBloggerInfo({
          params: {}
        }).then((response) => {
          this.bloggerInfo = response.data[0];
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/theme.styl";

  .about
    position relative
    text-align center
    border 1px solid $color-border
    padding-bottom 20px
    img.background
      position absolute
      top 0
      left 0
      right 0
      width 100%
      height 125px
      z-index 1
    img.avatar
      position relative
      margin 75px auto 15px
      width 100px
      height 100px
      border 5px solid $color-gradually-gray-91
      border-radius 50%
      z-index 9
    .name
      font-size 22px
      color $color-typegraphy-title
      line-height 30px
      font-weight 700
    .desc
      font-size 15px
      color $color-secondary-info
      line-height 30px
      font-weight 100
    .social
      text-align center
      display flex
      padding 0 20px
      margin-top 15px
      > li
        flex 1
        padding 8px
        a
          display block
          img
            width 100%
    .line
      height 1px
      background-color $color-gradually-gray-91
      margin 10px 20px
    h4
      font-size 19px
      margin 30px 0 20px
      font-weight 600
    .progresses
      padding 0 20px
      p.title
        height 38px
        line-height 38px
        text-align right
      .bar
        margin 10px 0
</style>
