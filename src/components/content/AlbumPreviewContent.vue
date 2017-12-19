<template>
  <div class="album-preview-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="16" :lg="18">
        <album-preview v-if="album != undefined" :album="album"></album-preview>
      </iv-col>
      <iv-col :xs="24" :sm="24" :md="8" :lg="6">
        <album-infos v-if="album != undefined" :album="album"></album-infos>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import AlbumPreview from '@/components/views/AlbumPreview/AlbumPreview';
  import AlbumInfos from '@/components/views/AlbumPreview/AlbumInfos';
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
      }
    },
    components: {
      'album-preview': AlbumPreview,
      'album-infos': AlbumInfos
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
</style>
