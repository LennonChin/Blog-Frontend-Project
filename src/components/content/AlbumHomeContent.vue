<template>
  <div class="album-home-content layout-content" v-if="banners.length > 0">
    <div class="banner">
      <div class="bracket"></div>
      <div class="target">
        <div v-swiper="swiperOption" :instanceName="'swiper'" class="gallery">
          <div class="swiper-wrapper">
            <div class="swiper-slide row" v-for="banner in banners" :key="banner.id">
              <a :href="banner.url">
                <img width="100%" :data-src="banner.image" alt="" class="swiper-lazy">
                <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
              </a>
            </div>
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
      </div>
    </div>
    <classify-wall @selectCategory="selectCategory" :categorys="categorys"></classify-wall>
    <section-title :mainTitle="selectedCategory.name" :subTitle="selectedCategory.subname"></section-title>
    <div class="thumb-cards">
      <i-row>
        <i-col :xs="24" :sm="12" :md="8" :lg="8" v-for="album in albums" :key="album.tag">
          <thumb-card :album="album"></thumb-card>
        </i-col>
      </i-row>
    </div>
    <browse-more @browseMore="browseMore" ref="browseMore"></browse-more>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import ClassifyWall from '@/components/views/Classify/ClassifyWall';
  import SectionTitle from '@/components/views/SectionTitle';
  import ThumbCard from '@/components/views/ThumbCard';
  import BrowseMore from '@/components/views/BrowseMore';
  import {checkPostAuth} from '@/common/js/utils';

  // API
  import API from 'API';

  // swiper
  if (process.browser) {
    require('swiper/dist/css/swiper.css');
    Vue.use(require('vue-awesome-swiper/dist/ssr'));
  }

  const DEFAULT_LIMIT_SIZE = 6;

  export default {
    name: 'album-home-content',
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
        limit_size: DEFAULT_LIMIT_SIZE,
        page: 0,
        totalCount: 0,
        noMoreData: false,
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
        API.getIndexBanners({
          params: {
            top_category: 5
          }
        }).then((response) => {
          this.banners = response.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      getAlbumBaseInfo() {
        API.getAlbumBaseInfo({
          params: {
            top_category: this.selectedCategory.id,
            limit: this.limit_size,
            offset: this.page * this.limit_size
          }
        }).then((response) => {
          this.albums = this.albums.concat(response.data.results);
          this.totalCount += response.data.results.length;
          this.noMoreData = this.totalCount >= response.data.count;
          this.$nextTick(() => {
            if (this.$refs.browseMore) {
              this.$refs.browseMore.stopLoading(this.noMoreData);
            }
          });
        }).catch((error) => {
          console.log(error);
        });
      },
      getCategorys() {
        API.getCategorys({
          params: {
            level_min: 1,
            level_max: 3,
            top_category: 55,
            page_size: 12
          }
        }).then((response) => {
          this.categorys = response.data.results;
        }).catch((error) => {
          console.log(error);
        });
      },
      selectCategory(category) {
        this.selectedCategory = category;
      },
      browseMore() {
        this.page++;
        this.getAlbumBaseInfo();
      },
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该图集已加密，您需要输入阅读密码', () => {
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
    },
    watch: {
      selectedCategory: function () {
        this.albums = [];
        this.getDatas();
      }
    },
    components: {
      'classify-wall': ClassifyWall,
      'section-title': SectionTitle,
      'thumb-card': ThumbCard,
      'browse-more': BrowseMore
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
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
