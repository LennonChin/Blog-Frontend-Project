<template>
  <div class="tag-wall">
    <panel :title="'相关标签'">
      <div slot="content" class="content">
        <iv-tag v-for="tag in tags" :color="tag.color" :key="tag.id" style="margin: 0 5px 5px 0;">{{ tag.name }}
        </iv-tag>
      </div>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import Panel from '@/components/views/Panel';
  import { getTags } from '@/api/api';

  export default {
    data() {
      return {
        tags: []
      };
    },
    created() {
      this.getDatas();
    },
    methods: {
      getDatas() {
        getTags({
          params: {}
        }).then((response) => {
          this.tags = response.data;
        }).catch(function (error) {
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
  @import "../../common/stylus/index.styl";

  .tag-wall
    .content
      padding 5px 20px
      border-left 1px solid $color-border

</style>
