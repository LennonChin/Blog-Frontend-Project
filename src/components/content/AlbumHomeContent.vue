<template>
  <div class="album-list-content" v-if="banners.length > 0">
    <swiper :options="swiperOption" class="gallery-top" ref="swiperTop">
      <swiper-slide v-for="banner in banners" :key="banner.id">
        <a>
          <img width="100%" :data-src="banner.image" alt="" class="swiper-lazy">
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <classify-wall @selectCategory="selectCategory"></classify-wall>
    <section-title :mainTitle="'游记'" :subTitle="'天下之美'"></section-title>
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
  import { getAlbumBaseInfo, getIndexBanners } from '@/api/api';

  export default {
    data() {
      return {
        banners: [],
        albums: [],
        selectedCategory: undefined,
        swiperOption: {
          spaceBetween: 30,
          lazy: true,
          centeredSlides: true,
          autoplay: {
            delay: 2500,
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
    },
    methods: {
      getDatas() {
        getAlbumBaseInfo({
          params: {
            top_category: this.selectedCategory
          }
        }).then((response) => {
          this.albums = response.data.results;
        }).catch(function (error) {
          console.log(error);
        });
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
      selectCategory(categoryId) {
        this.selectedCategory = categoryId;
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
  .album-list-content
    width auto
    @media only screen and (max-width: 768px)
      margin 5px 5px 0 5px
    @media screen and (min-width: 768px)
      margin 10px 10px 0 10px
    @media screen and (min-width: 992px)
      margin 15px 35px 0 35px
    @media screen and (min-width: 1200px)
      width 1200px
      margin 15px auto 0
      margin-bottom 200px
    .gallery-top
      width: 100%
      height: 300px
      overflow hidden
    .thumb-cards
      margin-top 15px
</style>
