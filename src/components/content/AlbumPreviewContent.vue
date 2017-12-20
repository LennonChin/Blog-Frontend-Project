<template>
  <div class="album-preview-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="16" :lg="18">
        <div class="album-preview">
          <album-carousel v-if="album != undefined && album.pictures.length > 0" :pictures="album.pictures" @slideToIndex="slideToIndex"></album-carousel>
        </div>
      </iv-col>
      <iv-col :xs="24" :sm="24" :md="8" :lg="6">
        <album-infos v-if="album != undefined" :album="album" ref="albumInfos"></album-infos>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import AlbumInfos from '@/components/views/AlbumPreview/AlbumInfos';
  import AlbumCarousel from '@/components/views/AlbumPreview/AlbumCarousel';
  // API
  import { getAlbumDetailInfo } from '@/api/api';

  export default {
    data() {
      return {
        albumId: 0,
        album: undefined
      };
    },
    created() {
      this.albumId = this.$route.params.albumId;
      this.getDatas();
    },
    methods: {
      getDatas() {
        getAlbumDetailInfo({
          id: this.albumId
        }).then((response) => {
          this.album = response.data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      slideToIndex(index) {
        this.$refs.albumInfos.selectPicture(index);
      }
    },
    components: {
      'album-infos': AlbumInfos,
      'album-carousel': AlbumCarousel
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .album-preview-content
    position: absolute
    top 0
    left 0
    width 100%
    background #000
    .album-preview
      background #000
      width 100%
      height 100vmin
      @media only screen and (max-width: 768px)
        height 130vmin
      @media screen and (min-width: 768px)
        height 130vmin
      @media screen and (min-width: 992px)
        height 100vmin
      @media screen and (min-width: 1200px)
        height 100vmin
</style>
