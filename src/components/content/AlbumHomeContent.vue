<template>
  <div class="album-home-content layout-content" v-if="banners.length > 0">
    <div class="banner">
      <div class="bracket"></div>
      <div class="target">
        <swiper :options="swiperOption" class="gallery" ref="swiperTop">
          <swiper-slide class="row" v-for="banner in banners" :key="banner.id">
            <a>
              <img width="100%" :data-src="banner.image" alt="" class="swiper-lazy">
              <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </div>
    <classify-wall @selectCategory="selectCategory" :categorys="categorys"></classify-wall>
    <section-title :mainTitle="selectedCategory.name" :subTitle="selectedCategory.subname"></section-title>
    <div class="thumb-cards">
      <iv-row>
        <iv-col :xs="24" :sm="12" :md="8" :lg="8" v-for="album in albums" :key="album.tag">
          <thumb-card :album="album"></thumb-card>
        </iv-col>
      </iv-row>
    </div>
    <browse-more></browse-more>
  </div>
</template>

<script type="text/ecmascript-6">
  import ClassifyWall from '@/components/views/Classify/ClassifyWall';
  import SectionTitle from '@/components/views/SectionTitle/SectionTitle';
  import ThumbCard from '@/components/views/ThumbCard';
  import BrowseMore from '@/components/views/BrowseMore';
  // swiper
  import 'swiper/dist/css/swiper.css';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';

  // API
  import {getCategorys, getAlbumBaseInfo, getIndexBanners} from '@/api/api';

  export default {
    data() {
      return {
        banners: [],
        albums: [],
        categorys: [],
        selectedCategory: {
          id: 55,
          name: '图集',
          subname: '天下之美'
        },
        swiperOption: {
          spaceBetween: 30,
          lazy: true,
          centeredSlides: true,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      };
    },
    created() {
      this.getDatas();
      this.getCategorys();
    },
    methods: {
      getDatas() {
        this.getAlbumBaseInfo();
        this.getIndexBanners();
      },
      getIndexBanners() {
        getIndexBanners({
          params: {
            top_category: 5
          }
        }).then((response) => {
          this.banners = response.data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      getAlbumBaseInfo() {
        getAlbumBaseInfo({
          params: {
            top_category: this.selectedCategory.id
          }
        }).then((response) => {
          this.albums = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCategorys() {
        getCategorys({
          params: {
            level_min: 1,
            level_max: 3,
            top_category: 55,
            page_size: 12
          }
        }).then((response) => {
          this.categorys = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });
      },
      selectCategory(category) {
        this.selectedCategory = category;
      }
    },
    watch: {
      selectedCategory: function () {
        this.getDatas();
      }
    },
    components: {
      'classify-wall': ClassifyWall,
      'section-title': SectionTitle,
      'thumb-card': ThumbCard,
      'browse-more': BrowseMore,
      'swiper': swiper,
      'swiperSlide': swiperSlide
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .album-home-content
    .banner
      position relative
      width 100%
      overflow hidden
      .bracket
        margin-top 30%
      .target
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        .gallery
          width: 100%
          height: 100%
          overflow hidden
          .row
            height 100%
            img
              height 100%
              width 100%

    .thumb-cards
      margin-top 15px
</style>
