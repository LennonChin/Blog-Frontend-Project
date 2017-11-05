<template>
  <div class="comment-list-cell">
    <el-row>
      <el-col :xs="cellSpan('xs')" :sm="cellSpan('sm')" :md="cellSpan('md')" :lg="cellSpan('lg')" :xl="cellSpan('xl')">
        <div class="comment-main">
          <el-row :gutter="10">
            <el-col :xs="cellLeftSpan('xs')" :sm="cellLeftSpan('sm')" :md="cellLeftSpan('md')"
                    :lg="cellLeftSpan('lg')" :xl="cellLeftSpan('xl')">
              <div class="avatar">
                <img src="../../../assets/avatar.jpeg" alt="">
              </div>
            </el-col>
            <el-col :xs="cellRightSpan('xs')" :sm="cellRightSpan('sm')" :md="cellRightSpan('md')"
                    :lg="cellRightSpan('lg')" :xl="cellRightSpan('xl')">
              <div class="content">
                <p class="title">
                  <span class="name"><a href="">MyName</a></span>
                  <span class="name-tag">Mod</span>
                  <span class="reply-icon"><i class="el-icon-caret-right"></i></span>
                  <span class="reply-name"><a href="">CrossoverJie</a></span>
                  <span class="time">2 days age</span>
                </p>
                <p class="comment-content">
                  针对于这种情况只能尽可能的保证可用吧。对于C多个进程的情况，各个MQ都有方法处理重复消费，或者是本身的消费支持幂等也能解决，而且数据库也可能挂了哦。</p>
                <div class="operate-area">
                  <span class="like"><i class="el-icon-arrow-up"></i></span>
                  <span class="unlike"><i class="el-icon-arrow-down"></i></span>
                  <span class="reply"><a @click="showEditor = !showEditor"><i class="el-icon-edit"></i> 回复</a></span>
                  <span class="share"><a href=""><i class="el-icon-share"></i> 分享</a></span>
                </div>
                <div class="comment-area" v-show="showEditor">
                  <div class="reply-editor" :class="{spread: spreadEditor}">
                    <mavon-editor @valueChanged="valueChanged"></mavon-editor>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import MavonEditor from '@/components/views/MavonEditor';

  const CELL_LEFT_SPAN = {
    'xs': 3,
    'sm': 3,
    'md': 2,
    'lg': 2,
    'xl': 2
  };
  const CELL_RIGHT_SPAN = {
    'xs': 24 - CELL_LEFT_SPAN['xs'],
    'sm': 24 - CELL_LEFT_SPAN['sm'],
    'md': 24 - CELL_LEFT_SPAN['md'],
    'lg': 24 - CELL_LEFT_SPAN['lg'],
    'xl': 24 - CELL_LEFT_SPAN['xl']
  };

  export default {
    props: {
      commentLevel: {
        default: 0
      },
      date: '',
      count: '',
      tipText: {
        default: 'View All'
      }
    },
    data() {
      return {
        showEditor: false,
        spreadEditor: false
      };
    },
    methods: {
      cellSpan(size) {
        var span = {};
        span['offset'] = CELL_LEFT_SPAN[size] * this.commentLevel;
        span['span'] = 24 - span['offset'];
        return span;
      },
      cellLeftSpan(size) {
        var span = {};
        span['span'] = CELL_LEFT_SPAN[size];
        return span;
      },
      cellRightSpan(size) {
        var span = {};
        span['span'] = CELL_RIGHT_SPAN[size];
        return span;
      },
      valueChanged(flag) {
        this.spreadEditor = flag;
      }
    },
    components: {
      'mavon-editor': MavonEditor
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .comment-list-cell
    position relative
    text-align left
    .avatar
      img
        border-radius $border-radius
        width 100%
    .content
      margin-top 5px
      .title
        font-size 0
        margin-bottom 5px
        line-height 18px
        .name
          a
            font-size 15px
            color $color-main-primary
            font-weight 700
            &:hover
              text-decoration underline
        .name-tag
          font-size 12px
          background-color $color-secondary-info
          padding 2px 5px
          margin 0 5px
          color #fff
          border-radius $border-radius
        .reply-icon
          font-size 15px
          color $light
        .reply-name
          font-size 15px
          margin 0 5px
          a
            color $light
            &:hover
              color $color-main-primary
              text-decoration underline

      .comment-content
        font-size 16px
        line-height 24px
    .operate-area
      margin-top 8px
      font-size 14px
      span + span
        margin-left 10px
      .like, .unlike
        color $light
        font-weight 700
      .reply
        cursor pointer
    .comment-area
      margin-bottom 10px
      .reply-editor
        margin-top 15px
        height 150px
        transition height 0.7s
        &.spread
          height 250px
      p.comment-tip
        a
          font-size 14px
          &:hover
            color $color-main-primary
</style>
