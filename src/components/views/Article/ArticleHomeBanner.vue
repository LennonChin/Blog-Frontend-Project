<template>
  <div class="article-home-banner">
    <iv-row class="row">
      <iv-col :xs="24" :sm="24" :md="24" :lg="17" class="row">
        <swiper :options="leftSwiperOption" class="gallery-left" ref="swiperLeft">
          <swiper-slide v-for="article in bannerArticles" :key="article.id">
            <a @click="gotoPostDetail(article)">
              <img :data-src="article.front_image" :title="article.title" class="swiper-lazy">
              <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7" class="row">
        <swiper :options="rightSwiperOption" class="gallery-right" ref="swiperRight">
          <swiper-slide class="swiper-no-swiping" v-for="article in bannerArticles" :key="article.id">
            <div class="carousel-infos">
              <p class="title">{{ article.title | textLineBreak(35) }}</p>
              <p class="desc">
                {{ article.desc | textLineBreak(70) }}
              </p>
              <iv-button size="large" type="primary" @click="gotoPostDetail(article)">点击查看更多</iv-button>
            </div>
          </swiper-slide>
        </swiper>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  // swiper
  import 'swiper/dist/css/swiper.css';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import {checkPostAuth} from '@/common/js/utils';

  export default {
    props: {
      bannerArticles: {
        Type: Array,
        Default: []
      }
    },
    data() {
      return {
        leftSwiperOption: {
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
        },
        rightSwiperOption: {
          noSwiping: true,
          loop: true,
          direction: 'vertical'
        }
      };
    },
    mounted() {
      this.$nextTick(() => {
        const swiperLeft = this.$refs.swiperLeft;
        const swiperRight = this.$refs.swiperRight;
        if (swiperLeft && swiperRight) {
          swiperLeft.swiper.controller.control = swiperRight.swiper;
        }
      });
    },
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该文章已加密，您需要输入阅读密码', () => {
          this.$router.push({name: 'article/detail', params: {articleId: post.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: 'article/detail',
            params: {articleId: post.id},
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, () => {
          this.$Notice.error({
            title: '密码错误'
          });
        });
      }
    },
    components: {
      'swiper': swiper,
      'swiperSlide': swiperSlide
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .article-home-banner
    height 100%
    .row
      height 100%
      .gallery-left, .gallery-right
        width 100%
        height 100%
        img
          height 100%
          width 100%
      .carousel-infos
        height 100%
        padding 30px
        border 1px solid $color-border
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
