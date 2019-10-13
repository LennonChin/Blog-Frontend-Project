<template>
  <div class="album-preview-content">
    <i-row>
      <i-col :xs="24" :sm="24" :md="16" :lg="18">
        <div class="album-preview">
          <album-carousel v-if="album != undefined && album.pictures.length > 0"
                          :pictures="album.pictures"
                          @slideToIndex="slideToIndex"
                          @close="back"></album-carousel>
        </div>
      </i-col>
      <i-col :xs="24" :sm="24" :md="8" :lg="6">
        <album-infos v-if="album != undefined" :album="album" ref="albumInfos"></album-infos>
      </i-col>
    </i-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import AlbumInfos from '@/components/views/Album/AlbumInfos';
  import AlbumCarousel from '@/components/views/Album/AlbumCarousel';
  // 加密
  import MD5 from 'crypto-js/md5';
  // API
  import API from 'API';

  export default {
    name: 'album-preview-content',
    data() {
      return {
        id: 0,
        browse_auth: null,
        album: undefined
      };
    },
    created() {
      this.id = this.$route.params.id;
      this.browse_auth = this.$route.query.browse_auth;
      this.getDatas();
    },
    methods: {
      getDatas() {
        var that = this;
        API.getAlbumDetailInfo({
          params: {
            browse_auth: this.browse_auth
          },
          id: this.id
        }).then((response) => {
          this.album = response.data;
        }).catch((error) => {
          console.log(error);
          if (error.status === 401) {
            if (that.browse_auth) {
              that.$Notice.error({
                title: '您输入的访问密码错误',
                duration: 3,
                closable: true,
                onClose: () => {
                  that.checkPassword('该文章已加密，<br />您输入的访问密码错误，请重新验证');
                }
              });
            } else {
              that.checkPassword('该文章已加密，请输入访问密码');
            }
          }
        });
      },
      checkPassword(message) {
        let checkAuth = (browseAuthInput, isAutoRemove) => {
          this.browse_auth = MD5(browseAuthInput).toString();
          this.$router.push({
            name: this.$router.name,
            params: {id: this.id},
            query: {browse_auth: this.browse_auth}
          });
          if (isAutoRemove) {
            this.$Modal.remove();
          }
        };

        this.$Modal.confirm({
          autoClosable: true,
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
            children.push(h('i-input', {
              props: {
                type: 'password',
                autofocus: true,
                placeholder: '请输入访问密码'
              },
              'class': {
                'modal-input': true
              },
              on: {
                input: (value) => {
                  this.browse_auth_input = value;
                }
              },
              nativeOn: {
                keyup: (event) => {
                  if (event.keyCode === 13) {
                    checkAuth(this.browse_auth_input, true);
                  }
                }
              }
            }));
            return h('div', {}, children);
          },
          onOk: () => {
            checkAuth(this.browse_auth_input, false);
          }
        });
      },
      slideToIndex(index) {
        this.$refs.albumInfos.selectPicture(index);
      },
      back() {
        this.$router.go(-1);
      }
    },
    components: {
      'album-infos': AlbumInfos,
      'album-carousel': AlbumCarousel
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
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
