<template>
  <div class="photowall">
    <iv-row>
      <iv-col span="12" style="padding-left: 0;padding-right: 0;">
        <div class="big-photo">
          <a href="">
            <img :src="this.banners[0].image !== 'undefined' ? this.banners[0].image : ''" alt="">
          </a>
        </div>
      </iv-col>
      <iv-col span="12" style="padding-left: 0;padding-right: 0;">
        <iv-row>
          <iv-col span="12" style="padding-left: 0;padding-right: 0;">
            <div class="small-photo">
              <a href="">
                <img :src="this.banners[1].image !== 'undefined' ? this.banners[1].image : ''" alt="">
              </a>
            </div>
          </iv-col>
          <iv-col span="12" style="padding-left: 0;padding-right: 0;">
            <div class="small-photo">
              <a href="">
                <img :src="this.banners[2].image !== 'undefined' ? this.banners[2].image : ''" alt="">
              </a>
            </div>
          </iv-col>
        </iv-row>
        <iv-row>
          <iv-col span="12" style="padding-left: 0;padding-right: 0;">
            <div class="small-photo">
              <a href="">
                <img :src="this.banners[3].image !== 'undefined' ? this.banners[3].image : ''" alt="">
              </a>
            </div>
          </iv-col>
          <iv-col span="12" style="padding-left: 0;padding-right: 0;">
            <div class="small-photo">
              <a href="">
                <img :src="this.banners[4].image !== 'undefined' ? this.banners[4].image : ''" alt="">
              </a>
            </div>
          </iv-col>
        </iv-row>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getIndexBanner} from '@/api/api';

  export default {
    data() {
      return {
        banners: []
      };
    },
    mounted() {
      this.getBanners();
    },
    methods: {
      getBanners() {
        getIndexBanner({}).then((response) => {
          console.log(response);
          this.banners = response.data;
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .photowall
    .big-photo
      padding-bottom: 100%
      width: 100%
      height: 0
      overflow hidden
      a
        display: block
        width: 100%
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
          transition: All 0.4s ease-in-out
          transform: scale(1.0)
          zoom: 1.0
      &:hover
        img
          transition: All 0.4s ease-in-out
          transform: scale(1.05)
          zoom: 1.05

</style>
