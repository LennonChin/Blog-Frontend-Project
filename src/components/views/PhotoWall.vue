<template>
  <div class="photowall">
    <el-row>
      <el-col :span="12">
        <div class="big-photo">
          <a href="">
            <img src="../../assets/photowall/photowall_pic_1.jpg" alt="">
          </a>
        </div>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="12">
            <div class="small-photo" style="background-color: sienna;">
              <a href="">
                <img src="../../assets/photowall/photowall_pic_2.jpg" alt="">
              </a>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="small-photo" style="background-color: aqua;">
              <a href="">
                <img src="../../assets/photowall/photowall_pic_3.jpg" alt="">
              </a>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="small-photo" style="background-color: aqua;">
              <a href="">
                <img src="../../assets/photowall/photowall_pic_4.jpg" alt="">
              </a>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="small-photo" style="background-color: sienna;">
              <a href="">
                <img src="../../assets/photowall/photowall_pic_5.jpg" alt="">
              </a>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .photowall
    .big-photo
      background-color blue
      padding-bottom: 100%
      width: 100%
      height: 0
      overflow hidden
      a
        display: block
        width: 100%
        img
          width 100%
      &:hover
        img
          transition: All 0.4s ease-in-out
          transform: scale(1.05)
          zoom: 1.05
    .small-photo
      padding-bottom: 100%;
      width: 100%;
      height: 0;
      overflow hidden
      a
        display: block
        width: 100%
        img
          width 100%
      &:hover
        img
          transition: All 0.4s ease-in-out
          transform: scale(1.05)
          zoom: 1.05

</style>
