<template>
  <div class="tag-wall">
    <panel :title="'相关标签'">
      <div slot="content" class="content">
        <i-tag :color="tag.color" type="dot" v-for="tag in tags" :key="tag.id" style="margin: 0 5px 5px 0;">{{ tag.name }} [{{ tag.related_post_num }}]
        </i-tag>
      </div>
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
    name: 'tag-wall',
    mounted() {
      if (this.$store.state.common.tags.length === 0) {
        console.log('tags');
        this['common/GET_TAGS']();
      }
    },
    computed: {
      ...mapState({
        tags: state => state.common.tags
      })
    },
    methods: {
      ...mapActions(['common/GET_TAGS'])
    },
    components: {
      'panel': Panel
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">

  .tag-wall
    .content
      padding 5px 20px
      border-left 1px solid $color-border

</style>
