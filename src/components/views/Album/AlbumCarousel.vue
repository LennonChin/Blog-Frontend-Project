<template>
  <div class="album-carousel">
    <p class="top-bar">
      <i-icon type="android-close" @click.native="close"></i-icon>
      <i-icon type="android-expand" @click.native="expand"></i-icon>
      <i-icon type="ios-download-outline" @click.native="download"></i-icon>
    </p>
    <div class="carousel-wrapper">
      <!-- swiper previewer -->
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide v-for="picture in pictures" :key="picture.id">
          <a>
            <img :data-src="picture.image" class="swiper-lazy">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      </swiper>
      <!-- swiper Thumbs -->
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide v-for="picture in pictures" :key="picture.id">
          <a>
            <img :src="picture.image">
          </a>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'swiper/dist/css/swiper.css';

  import {swiper, swiperSlide} from 'vue-awesome-swiper';

  export default {
    name: 'album-carousel',
    props: {
      pictures: {
        Type: Array,
        default: []
      }
    },
    data() {
      return {
        currentIndex: 0,
        swiperOptionTop: {
          spaceBetween: 10,
          lazy: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
          }
        },
        swiperOptionThumbs: {
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        }
      };
    },
    mounted() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper;
        const swiperThumbs = this.$refs.swiperThumbs.swiper;
        swiperTop.controller.control = swiperThumbs;
        swiperThumbs.controller.control = swiperTop;
        // 监听滑动
        swiperTop.on('slideChangeTransitionEnd', () => {
          this.slideToIndex(swiperTop.activeIndex);
        });
        this.slideToIndex(0);
      });
    },
    methods: {
      slideToIndex(index) {
        this.currentIndex = index;
        this.$emit('slideToIndex', index);
      },
      close() {
        this.$emit('close');
      },
      expand() {
      },
      download() {
        window.open(this.pictures[this.currentIndex].image);
      }
    },
    watch: {
      pictures: function (newPictures) {
        if (newPictures.length > 0) {
          this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper;
            swiperTop.slideTo(0, 1000, false);
            this.refreshInfo(0);
          });
        }
      }
    },
    components: {
      'swiper': swiper,
      'swiperSlide': swiperSlide
    }
  };
</script>`

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .album-carousel
    position: relative
    width: 100%
    height 100%
    margin: 0 auto
    overflow hidden
    .top-bar
      height 60px
      line-height 60px
      font-size 30px
      width 100%
      padding 0 20px
      color $color-gradually-gray-81
      border-bottom 1px solid $color-gradually-gray-21
      i
        display inline-block
        line-height 60px
        cursor pointer
        + i
          margin 0 20px
          float right
    .carousel-wrapper
      width: 100%;
      height: 100%
      padding-top 60px
      margin-top -60px
      .gallery-top
        width: 100%;
        height: 100%
        padding-bottom 150px
        @media only screen and (max-width: 768px)
          padding-bottom 90px
        @media screen and (min-width: 768px)
          padding-bottom 130px
        @media screen and (min-width: 992px)
          padding-bottom 150px
        @media screen and (min-width: 1200px)
          padding-bottom 150px
        a
          display: flex;
          width: 100%;
          height: 100%
          padding 15px
          justify-content: center
          box-align: center
          align-items: center
          img
            max-height: 100%;
            max-width: 100%;
        .swiper-pagination-progressbar-fill
          background $iview-secondary-warning-color
      .gallery-thumbs
        width 100%
        @media only screen and (max-width: 768px)
          margin-top: -90px;
          height: 90px;
        @media screen and (min-width: 768px)
          margin-top: -130px;
          height: 130px;
        @media screen and (min-width: 992px)
          margin-top: -150px;
          height: 150px;
        @media screen and (min-width: 1200px)
          margin-top: -150px;
          height: 150px;
        .swiper-slide
          width 15%
          height 100%
          opacity 0.4
          a
            display block
            padding 10px 0
            height 100%
            width 100%
            img
              height 100%
              width 100%

        .swiper-slide-active
          opacity 1

</style>
