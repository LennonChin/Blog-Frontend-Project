<template>
  <div class="about">
    <img class="background" src="../../assets/background.jpg" alt="">
    <img class="avatar" src="../../assets/logo.png" alt="">
    <p class="name">Lennon Chin</p>
    <p class="desc">Write the code, Change the World</p>
    <ul class="social">
      <li><a href=""><img src="../../assets/logo.png" alt=""></a></li>
      <li><a href=""><img src="../../assets/logo.png" alt=""></a></li>
      <li><a href=""><img src="../../assets/logo.png" alt=""></a></li>
      <li><a href=""><img src="../../assets/logo.png" alt=""></a></li>
      <li><a href=""><img src="../../assets/logo.png" alt=""></a></li>
    </ul>
    <div class="line"></div>
    <h4>技能值</h4>
    <div class="progresses">
      <el-row :gutter="20">
        <el-col :span="6">
          <p class="title">Java</p>
        </el-col>
        <el-col :span="18">
          <el-progress :show-text="false" :stroke-width="16" :percentage="80" class="bar"></el-progress>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <p class="title">Hadoop</p>
        </el-col>
        <el-col :span="18">
          <el-progress :show-text="false" :stroke-width="16" :percentage="70" class="bar"></el-progress>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <p class="title">Python</p>
        </el-col>
        <el-col :span="18">
          <el-progress :show-text="false" :stroke-width="16" :percentage="60" status="success" class="bar"></el-progress>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <p class="title">Spark</p>
        </el-col>
        <el-col :span="18">
          <el-progress :show-text="false" :stroke-width="16" :percentage="50" status="exception" class="bar"></el-progress>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

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
      font-weight 500
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
      font-size 20px
      margin 30px 0 20px
    .progresses
      padding 0 20px
      p.title
        height 38px
        line-height 38px
        text-align right
      .bar
        margin 10px 0
</style>
