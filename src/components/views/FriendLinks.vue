<template>
  <div class="friend-links" v-if="friendLinks.length > 0">
    <panel :title="'友情链接'">
      <ul class="link-list" slot="content">
        <li v-for="friendLink in friendLinks">
          <a :href="friendLink.url" target="_blank">
            <img :src="friendLink.image" alt="">
            <div class="right">
              <p class="title">{{ friendLink.name }}</p>
              <p class="link">{{ friendLink.url }}</p>
            </div>
          </a>
        </li>
      </ul>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import Panel from '@/components/views/Panel';
  import { getFriendLinks } from '@/api/api';

  export default {
    data() {
      return {
        friendLinks: []
      };
    },
    created() {
      this.getDatas();
    },
    methods: {
      getDatas() {
        getFriendLinks({
          params: {}
        }).then((response) => {
          this.friendLinks = response.data;
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    components: {
      'panel': Panel
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  .friend-links
    position relative
    ul.link-list
      padding 15px 0
      border-left 1px solid $color-border
      li
        padding 2px 25px
        a
          display flex
          transform: translate(0, 0)
          transition: all 0.2s ease-in
          &:hover
            transform: translate(30px, 0)
            transition: all 0.2s ease-in-out
            .link
              color $dark
          img
            flex 0 0 50px
            width 50px
            height 50px
            margin 5px 0
          .right
            display flex
            flex-direction column
            padding-left 12px
            height 60px
            line-height 60px
            p
              flex 1
              text-align left
              &.title
                height 35px
                line-height 45px
                font-size 17px
                color $color-main-primary
              &.link
                height 15px
                line-height 15px
                font-weight 100

</style>
