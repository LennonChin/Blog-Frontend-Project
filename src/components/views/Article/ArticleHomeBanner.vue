<template>
  <div class="article-home-banner">
    <div v-swiper:leftSwiper="swiperOption" class="gallery">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="article in bannerArticles">
          <a @click="gotoPostDetail(article)">
            <img :data-src="article.front_image" :title="article.title" class="swiper-lazy">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </a>
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import {checkPostAuth} from '@/common/js/utils';

  if (process.browser) {
    require('swiper/dist/css/swiper.css');
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
    Vue.use(VueAwesomeSwiper);
  }

  export default {
    name: 'article-home-banner',
    props: {
      bannerArticles: {
        Type: Array,
        Default: []
      }
    },
    data() {
      return {
        swiperOption: {
          lazy: true,
          centeredSlides: true,
          loop: true,
          effect: 'fade',
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
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该文章已加密，您需要输入阅读密码', () => {
          this.$router.push({name: post.post_type, params: {id: post.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: post.post_type,
            params: {id: post.id},
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, () => {
          this.$Notice.error({
            title: '密码错误'
          });
        });
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .article-home-banner
    height 100%
    .gallery
      width 100%
      height 100%
      .row
        height 100%
        .col
          height 100%
          a
            display block
            height 100%
            overflow hidden
          img
            height 100%
            width 100%
          .infos
            height 100%
            width 100%
            padding 30px
            .title
              font-size 23px
              line-height 31px
              margin-bottom 10px
            .desc
              font-size 15px
              font-weight 300
              line-height 20px
              margin-bottom 10px
</style>
