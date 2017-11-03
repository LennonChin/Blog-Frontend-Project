<template>
  <div id="mavon-editor">
    <mavon-editor style="height: 100%; min-height: 50px; min-width: 200px;" :toolbarsFlag="toolbarsFlag" :subfield="subfield" :placeholder="placeholder" @change="change"></mavon-editor>
  </div>
</template>

<script type="text/ecmascript-6">
  import MavonEditor from 'mavon-editor';
  import 'mavon-editor/dist/css/index.css';
  export default {
    props: {
      subfield: {
        default: false
      },
      placeholder: {
        default: '输入评论内容...'
      }
    },
    data() {
      return {
        valueChanged: false,
        toolbarsFlag: false
      };
    },
    name: 'editor',
    components: {
      'mavon-editor': MavonEditor.mavonEditor
    },
    methods: {
      change(value) {
        if (value.length > 0) {
          if (!this.valueChanged) {
            this.$emit('valueChanged', true);
            this.valueChanged = true;
            this.toolbarsFlag = true;
          }
        } else {
          if (this.valueChanged) {
            this.$emit('valueChanged', false);
            this.valueChanged = false;
            this.toolbarsFlag = false;
          }
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #mavon-editor
    height 100%
    width 100%
</style>