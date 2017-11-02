<template>
  <div class="article-list-cell">
    <a href="">
      <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
          <div class="text-wrapper">
            <h4 class="title"><router-link to="/article">{{article.title}}</router-link></h4>
            <p class="info"><span class="author">By / <a href="">{{article.author}}</a></span><span
                    class="publish-time">  At time / <a href="">{{article.publish_time}}</a></span></p>
            <div class="line border-1px"></div>
            <div class="tags hidden-md-and-down">
              <el-tag size="small">标签一</el-tag>
              <el-tag size="small" type="success">标签二</el-tag>
              <el-tag size="small" type="info">标签三</el-tag>
              <el-tag size="small" type="warning">标签四</el-tag>
              <el-tag size="small" type="danger">标签五</el-tag>
            </div>
            <p class="desc">{{article.desc}}<a href="">View More <i class="el-icon-caret-right"></i></a></p>
            <p class="operate_info">
              <span class="readings"><a href=""><i class="el-icon-view"></i> {{article.readings}} 阅读</a></span> |
              <span class="comments"><a href=""><i class="el-icon-news"></i> {{article.comments}} 评论</a></span> |
              <span class="likes"><a href=""><i class="el-icon-star-off"></i> {{article.likes}} 喜欢</a></span>
            </p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7" class="hidden-sm-and-down">
          <div class="img-wrapper">
            <img src="../../../assets/photowall/photowall_pic_2.jpg" alt="">
          </div>
        </el-col>
      </el-row>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      article: {
        Type: Object
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/index.styl";

  .article-list-cell
    margin-bottom 15px
    > a
      display block
      cursor default
      border 1px solid $color-border
      &:hover
        border 1px solid $color-border-hover
        box-shadow 2px 2px 3px $color-border
      .text-wrapper
        padding 30px 30px 0 30px
        text-align left
        @media only screen and (max-width: 768px)
          padding 15px 15px 0 15px
        .title
          font-size 23px
          font-weight 100
          line-height 29px
          a
            color $color-typegraphy-title
            cursor pointer
            &:hover
              color $color-typegraphy-title-hover
              text-decoration underline
        .info
          margin-top 10px
          font-size 14px
          line-height 18px
          font-weight 200
          a
            color: #777
            cursor pointer
            &:hover
              color $color-main-primary
              text-decoration underline
          .publish-time
            margin-left 20px
        .line
          width 50px
          margin-top 30px
          border-1px(rgba(7, 17, 27, 0.4))
          &::after
            margin-bottom 15px
        .tags
          margin: 8px 0
        .desc
          color #666
          font-size 14px
          line-height 20px
          font-weight 200
          a
            color $color-main-primary
            font-weight 500
            cursor pointer
            &:hover
              text-decoration underline
        .operate_info
          font-size 14px
          margin 15px 0
          span
            margin-right 10px
            + span
              margin-left 10px
            a
              cursor pointer
              &:hover
                color $color-main-primary
                text-decoration underline
      .img-wrapper
        padding-bottom: 70%
        width: 100%
        height: 0
        overflow hidden
        img
          width 100%
</style>
