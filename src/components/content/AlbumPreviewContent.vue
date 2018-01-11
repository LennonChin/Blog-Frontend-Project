<template>
  <div class="album-preview-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="16" :lg="18">
        <div class="album-preview">
          <album-carousel v-if="album != undefined && album.pictures.length > 0" :pictures="album.pictures"
                          @slideToIndex="slideToIndex"></album-carousel>
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
  // 加密
  import {hexMd5} from '@/common/js/md5';
  // API
  import {getAlbumDetailInfo} from '@/api/api';

  export default {
    data() {
      return {
        albumId: 0,
        browse_auth: null,
        album: undefined
      };
    },
    created() {
      this.albumId = this.$route.params.albumId;
      this.browse_auth = this.$route.query.browse_auth;
      this.getDatas();
    },
    methods: {
      getDatas() {
        var that = this;
        getAlbumDetailInfo({
          params: {
            browse_auth: this.browse_auth
          },
          id: this.albumId
        }).then((response) => {
          this.album = response.data;
        }).catch(function (error) {
          console.log(error);
          if (error.status === 401) {
            if (that.browse_auth) {
              that.$Notice.error({
                title: '您输入的阅读密码错误',
                duration: 3,
                closable: true,
                onClose: () => {
                  that.checkPassword('该文章为加密文章，<br />您输入的阅读密码错误，请重新验证');
                }
              });
            } else {
              that.checkPassword('该文章为加密文章，请输入阅读密码');
            }
          }
        });
      },
      checkPassword(message) {
        this.$Modal.confirm({
          autoClosable: false,
          render: (h) => {
            let children = [];
            children.push(h('h2', {
              domProps: {
                innerHTML: '提示'
              },
              'class': {
                'modal-title': true
              }
            }));
            children.push(h('p', {
              domProps: {
                innerHTML: message
              },
              'class': {
                'modal-message': true
              }
            }));
            children.push(h('iv-input', {
              props: {
                type: 'password',
                autofocus: true,
                placeholder: '请输入阅读密码'
              },
              'class': {
                'modal-input': true
              },
              on: {
                input: (value) => {
                  this.browse_auth_input = value;
                }
              }
            }));
            return h('div', {}, children);
          },
          onOk: () => {
            this.browse_auth = hexMd5(this.browse_auth_input);
            this.$router.push({
              name: 'album/detail',
              params: {albumId: this.albumId},
              query: {browse_auth: this.browse_auth}
            });
            this.getDatas();
          }
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
