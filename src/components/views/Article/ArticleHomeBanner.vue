<template>
  <div class="article-home-banner">
    <i-row class="row">
      <i-col :xs="24" :sm="24" :md="24" :lg="17" class="col">
        <div v-swiper="leftSwiperOption" :instanceName="'leftSwiper'" class="gallery">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="article in bannerArticles">
              <a @click.prevent="gotoPostDetail(article)" :href="`${article.post_type}/${article.id}`">
								<span class="title">{{ article[resolveI18N('title')] }}</span>
                <img :data-src="article.front_image" :title="article.title" class="swiper-lazy">
                <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
              </a>
            </div>
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev">
            <i-icon type="ios-arrow-left"></i-icon>
          </div>
          <div class="swiper-button-next" slot="button-next">
            <i-icon type="ios-arrow-right"></i-icon>
          </div>
        </div>
      </i-col>
      <i-col :xs="0" :sm="0" :md="0" :lg="7" class="col">
        <div v-swiper="rightSwiperOption" :instanceName="'rightSwiper'" class="gallery right-gallery">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="article in bannerArticles">
              <div class="carousel-infos">
                <p class="title">{{ article[resolveI18N('title')] | textLineBreak(35) }}</p>
                <p class="desc">
                  {{ article[resolveI18N('desc')] | textLineBreak(70) }}
                </p>
                <i-button size="large" type="primary" @click.prevent="gotoPostDetail(article)" :href="`${article.post_type}/${article.id}`">{{ $t('common.browseMore.clickToSeeMore') }}</i-button>
              </div>
            </div>
          </div>
        </div>
      </i-col>
    </i-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import {checkPostAuth, mixin} from '@/common/js/utils';

  if (process.browser) {
    require('swiper/dist/css/swiper.css');
    Vue.use(require('vue-awesome-swiper/dist/ssr'));
  }

  export default {
    name: 'article-home-banner',
    props: {
      bannerArticles: {
        Type: Array,
        Default: []
      }
    },
    mixins: [mixin],
    data() {
      return {
        leftSwiperOption: {
          lazy: true,
          centeredSlides: true,
          loop: true,
          effect: 'fade',
          autoplay: {
            delay: 8000,
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
          direction: 'vertical',
          loop: true
        }
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.rightSwiper.controller.control = this.leftSwiper;
        this.leftSwiper.controller.control = this.rightSwiper;
      });
    },
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该文章已加密，您需要输入访问密码', () => {
          this.$router.push({name: post.post_type, params: {id: post.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: post.post_type,
            params: {id: post.id},
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, (error) => {
          console.log(error);
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
		.row, .col
			height 100%
		.gallery
			width 100%
			height 100%
			border 1px solid $default-border-color
			a
				position relative
				display block
				height 100%
				overflow hidden
				img
					height 100%
					width 100%
				.title
					position absolute
					display none
					top 5px
					right 5px
					padding 4px
					background rgba($default-background-color, 0.6)
					color $default-title-color
					font-size 13px
					max-width 90%
					@media only screen and (max-width: $responsive-lg)
						display block
			.carousel-infos
				height 100%
				width 100%
				padding 20px
				background-color $default-background-color
				.title
					font-size 23px
					line-height 31px
					margin-bottom 10px
					color $default-title-color
				.desc
					font-size 15px
					font-weight 300
					line-height 20px
					margin-bottom 10px
					color $default-desc-color
			.swiper-pagination-bullet
				background $default-background-color
			.swiper-pagination-bullet-active
				background $default-background-color
			.swiper-button-prev, .swiper-button-next
				text-align center
				background-image none
				color $default-background-color
				> i
					font-size 45px
		.right-gallery
			border-left none
</style>
