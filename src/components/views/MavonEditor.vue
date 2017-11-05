<template>
  <div id="mavon-editor">
    <mavon-editor class="editor-area" style="height: 100%; min-height: 50px; min-width: 200px; z-index: 9;" :toolbarsFlag="toolbarsFlag"
                  :subfield="subfield" :placeholder="placeholder" :toolbars="toolbars" @change="change"></mavon-editor>
    <div class="bottom-area">
      <div class="comment-tip"><a href="https://guides.github.com/features/mastering-markdown/" target="_blank"><i
        class="el-icon-info"></i> 支持MarkDown</a></div>
      <div class="buttons">
        <el-button size="small" @click="publish" type="primary">发布</el-button>
      </div>
    </div>
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
        toolbarsFlag: false,
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: false, // 展示html源码
          help: false, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: false, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true // 预览
        }
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
            this.toolbars['navigation'] = true;
            this.listenWindowWidth();
          }
        } else {
          if (this.valueChanged) {
            this.$emit('valueChanged', false);
            this.valueChanged = false;
            this.toolbarsFlag = false;
            this.toolbars['navigation'] = false;
            this.listenWindowWidth();
          }
        }
      },
      listenWindowWidth() {
        // 此方法用于监听窗口宽度变化,改变编辑器菜单
        var clientWidth = document.documentElement.clientWidth;
        if (clientWidth < 900) {
          this.$set(this.toolbars, 'readmodel', false);
          this.$set(this.toolbars, 'htmlcode', false);
          this.$set(this.toolbars, 'navigation', false);
          this.$set(this.toolbars, 'subfield', false);
        } else {
          this.$set(this.toolbars, 'readmodel', true);
          this.$set(this.toolbars, 'htmlcode', true);
          this.$set(this.toolbars, 'navigation', true);
          this.$set(this.toolbars, 'subfield', true);
        }
      },
      publish() {
        console.log('publish');
      }
    },
    mounted() {
      var that = this;
      window.onresize = function temp() {
        that.listenWindowWidth();
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #mavon-editor
    height 100%
    width 100%
    display flex
    flex-direction column
    .editor-area
      flex 1
    .bottom-area
      flex 0 0 40px
      height 40px
      display flex
      padding-top 15px
      justify-content: space-between

</style>