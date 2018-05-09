<template>
  <div class="friend-links" v-if="friendLinks.length > 0">
    <panel :title="'友情链接'">
      <ul class="link-list" slot="content">
        <li v-for="friendLink in friendLinks">
          <a :href="friendLink.url" target="_blank">
            <img :src="resolveImageUrl(friendLink.image)" :class="{'no-pic': friendLink.image === null || friendLink.image.length === 0}" alt="">
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
  import {
    mapState,
    mapActions
  } from 'vuex';
  import Panel from '@/components/views/Panel';

  export default {
    name: 'friend-links',
    mounted() {
      if (this.$store.state.common.friendLinks.length === 0) {
        console.log('friendLinks');
        this['common/GET_FRIENDLINKS']();
      }
    },
    computed: {
      ...mapState({
        friendLinks: state => state.common.friendLinks
      })
    },
    methods: {
      ...mapActions(['common/GET_FRIENDLINKS'])
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
      border-left 1px solid $default-border-color
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
              color $default-link-color
          img
            flex 0 0 50px
            width 50px
            height 50px
            margin 5px 0
            margin-right 12px
            border 1px solid $default-border-color
            &.no-pic
              flex 0 0 0
              width 0
              margin-right 0
              border none
          .right
            display flex
            flex-direction column
            height 60px
            line-height 60px
            p
              flex 1
              text-align left
              &.title
                height 35px
                line-height 45px
                font-size 17px
                color $default-title-hover-color
              &.link
                height 15px
                line-height 15px
                font-weight 100
                color $default-link-color

</style>
