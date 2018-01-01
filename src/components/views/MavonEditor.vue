<template>
  <div id="mavon-editor" :class="theme">
    <div class="operate">
      <iv-row>
        <iv-col :xs="8" :sm="8" :md="6" :lg="6" style="padding-left: 0; padding-right: 7.5px;">
          <iv-input v-model="nickName" placeholder="请输入您的昵称" size="large">
            <span slot="prepend">昵称 </span>
          </iv-input>
        </iv-col>
        <iv-col :xs="16" :sm="16" :md="12" :lg="11" style="padding-left: 0; padding-right: 0;">
          <iv-input v-model="email" placeholder="联系方式（邮箱或手机号）以评论" size="large">
            <iv-select v-model="select" slot="prepend" style="width: 80px">
              <iv-option value="email">邮箱</iv-option>
              <!--<iv-option value="mobile">手机号 </iv-option>-->
            </iv-select>
          </iv-input>
        </iv-col>
        <iv-col :xs="24" :sm="24" :md="6" :lg="7" class-name="iv-dropdown-link">
          <iv-dropdown>
            <iv-icon type="log-in"></iv-icon>
            或登录以评论
            <iv-icon type="arrow-down-b"></iv-icon>
            <iv-dropdown-menu slot="list">
              <iv-dropdown-item>菜单</iv-dropdown-item>
              <iv-dropdown-item>菜单</iv-dropdown-item>
              <iv-dropdown-item>菜单</iv-dropdown-item>
              <iv-dropdown-item disabled>菜单</iv-dropdown-item>
              <iv-dropdown-item divided>菜单</iv-dropdown-item>
            </iv-dropdown-menu>
          </iv-dropdown>
        </iv-col>
      </iv-row>
    </div>
    <mavon-editor v-model="origin_content"
                  class="editor-area" style="height: 100%; min-height: 50px; min-width: 200px; z-index: 9;"
                  :toolbarsFlag="toolbarsFlag"
                  :subfield="subfield"
                  :placeholder="placeholder"
                  :toolbars="toolbars"
                  @change="change"></mavon-editor>
    <div class="bottom-area">
      <div class="comment-tip">
        <a href="https://guides.github.com/features/mastering-markdown/" target="_blank">
          <iv-icon
            type="information-circled"></iv-icon>
          支持MarkDown</a>
      </div>
      <div class="buttons">
        <iv-button size="default" @click="send" :type="buttonType">发布</iv-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MavonEditor from 'mavon-editor';
  import 'mavon-editor/dist/css/index.css';
  import {loadFromLocal, saveToLocal} from '@/common/js/utils';
  // API
  import {getEmailCode, verifyEmailCode, addCommentInfo} from '@/api/api';

  export default {
    props: {
      post: {
        Type: Object,
        default: undefined
      },
      replyToComment: {
        Type: Object,
        default: undefined
      },
      theme: {
        Type: String,
        default: ''
      },
      subfield: {
        default: false
      },
      placeholder: {
        default: '输入评论内容...'
      }
    },
    data() {
      return {
        guest: undefined,
        reply_to: undefined,
        nickName: '',
        email: '',
        mobile: '',
        origin_content: '',
        select: 'email',
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
          undo: false, // 上一步
          redo: false, // 下一步
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
    computed: {
      buttonType: function () {
        return this.theme === 'dark-theme' ? 'warning' : 'primary';
      }
    },
    methods: {
      getLocalCommentUser() {
        if (loadFromLocal('comment_auth', 'email', undefined) !== undefined &&
          loadFromLocal('comment_auth', 'verified', false) &&
          loadFromLocal('comment_auth', 'author_id', undefined) !== undefined &&
          loadFromLocal('comment_auth', 'nick_name', undefined) !== undefined) {
          this.nickName = loadFromLocal('comment_auth', 'nick_name', '');
          this.email = loadFromLocal('comment_auth', 'email', '');
        }
      },
      comment_level: function () {
        if (this.replyToComment === undefined) return 0;
        return 1;
      },
      reply_to_author: function () {
        if (this.replyToComment === undefined) return null;
        return this.replyToComment.author.id;
      },
      parent_comment: function () {
        if (this.replyToComment === undefined) return null;
        if (this.replyToComment.parent_comment === null) return this.replyToComment.id;
        return this.replyToComment.parent_comment;
      },
      reply_to_comment: function () {
        if (this.replyToComment === undefined) return null;
        return this.replyToComment.id;
      },
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
      send() {
        if (this.nickName.length === 0) {
          this.$Notice.warning({
            title: '提示',
            desc: '您需要填写昵称'
          });
          return;
        }
        if (this.email.length === 0) {
          this.$Notice.warning({
            title: '提示',
            desc: '您需要填写您的邮箱'
          });
          return;
        }
        if (this.origin_content.length === 0) {
          this.$Notice.warning({
            title: '提示',
            desc: '您需要填写评论内容'
          });
          return;
        }
        console.log('replyToComment', this.replyToComment);
        if (!(loadFromLocal('comment_auth', 'email', '') === this.email &&
            loadFromLocal('comment_auth', 'verified', false) &&
            loadFromLocal('comment_auth', 'author_id', undefined) !== undefined &&
            loadFromLocal('comment_auth', 'nick_name', undefined) !== undefined)) {
          // 该邮箱在本地没有评论记录,需要验证邮箱
          var that = this;
          getEmailCode({
            nick_name: this.nickName,
            email: this.email
          }).then((response) => {
            var that = this;
            this.$Modal.confirm({
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
                    innerHTML: '已经向您的邮箱发送了验证码，请输入验证码验证邮箱有效性后再进行评论'
                  },
                  'class': {
                    'modal-message': true
                  }
                }));
                children.push(h('iv-input', {
                  props: {
                    value: this.value,
                    autofocus: true,
                    placeholder: '请输入验证码'
                  },
                  'class': {
                    'modal-input': true
                  },
                  on: {
                    input: (value) => {
                      this.email_code = value;
                    }
                  }
                }));
                return h('div', {}, children);
              },
              onOk: () => {
                verifyEmailCode({
                  params: {
                    email: that.email,
                    nick_name: that.nickName,
                    code: this.email_code
                  }
                }).then((response) => {
                  this.guest = response.data.guest;
                  saveToLocal('comment_auth', 'email', this.email);
                  saveToLocal('comment_auth', 'verified', true);
                  saveToLocal('comment_auth', 'author_id', this.guest);
                  saveToLocal('comment_auth', 'nick_name', this.nickName);
                  this.publish();
                }).catch(function (error) {
                  that.$Notice.error({
                    title: '验证码验证失败',
                    desc: error.error
                  });
                });
              }
            });
          }).catch(function (error) {
            that.$Notice.error({
              title: '验证码发送失败',
              desc: error.email
            });
          });
        } else {
          // 该邮箱在本地有评论记录,直接评论
          this.guest = loadFromLocal('comment_auth', 'author_id', undefined);
          this.publish();
        }
      },
      publish() {
        var that = this;
        addCommentInfo({
          detail: {
            origin_content: this.origin_content
          },
          author: this.guest,
          reply_to_author: this.reply_to_author(),
          comment_level: this.comment_level(),
          is_active: true,
          post: this.post.id,
          parent_comment: this.parent_comment(),
          reply_to_comment: this.reply_to_comment()
        }).then((response) => {
          // 清空评论框内容
          this.origin_content = '';
          this.$Notice.success({
            title: '提示',
            desc: '发送评论成功'
          });
          let comment = response.data;
          comment.author = {
            id: this.guest,
            nick_name: this.nickName
          };
          comment.reply_to_author = this.replyToComment ? this.replyToComment.author : null;
          this.$emit('publishedComment', comment);
        }).catch(function (error) {
          console.log(error);
          that.$Notice.error({
            title: '发送评论失败',
            desc: error.error
          });
        });
      }
    },
    mounted() {
      // 获取本地有效用户的信息
      this.getLocalCommentUser();
      // 监听屏幕大小
      var that = this;
      window.onresize = function temp() {
        that.listenWindowWidth();
      };
    },
    components: {
      'mavon-editor': MavonEditor.mavonEditor
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  #mavon-editor
    height 100%
    width 100%
    display flex
    flex-direction column
    .operate
      margin-bottom 15px
      .iv-dropdown-link
        display block
        height 36px
        line-height 36px
        text-align right
        font-size 15px
        color $color-main-primary
        &:hover
          cursor pointer
    .editor-area
      flex 1
    .bottom-area
      flex 0 0 40px
      height 40px
      display flex
      padding-top 15px
      justify-content: space-between
    &.dark-theme
      .operate
        margin-bottom 15px
        .iv-dropdown-link
          display block
          height 36px
          line-height 36px
          text-align right
          font-size 15px
          color $color-gradually-gray-61
          &:hover
            color $color-secondary-warning
            border-bottom 2px solid $color-secondary-warning
            cursor pointer
      .bottom-area
        .comment-tip
          a
            color $color-gradually-gray-61
            &:hover
              color $color-secondary-warning

  .modal-title
    font-size 22px
    font-weight 700
    text-align center
    padding-bottom 10px

  .modal-message
    font-size 16px
    line-height 28px
    text-align center
    padding-bottom 15px

  .modal-input
    padding 0 20px
</style>