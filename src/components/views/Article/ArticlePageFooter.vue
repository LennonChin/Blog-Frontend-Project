<template>
    <div class="article-page-footer">
        <el-alert title="版权声明，此文章为原创作品，转载务必保留本文地址及原作者。" type="warning" show-icon :closable="false">
        </el-alert>
        <div class="operate_menu">
            <el-row :gutter="0">
                <el-col :span="3">
                    <el-button type="primary" icon="el-icon-star-off" plain round>喜欢</el-button>
                </el-col>
                <el-col :span="21">
                </el-col>
            </el-row>
        </div>
        <div class="comment-menu">
            <el-form ref="form" label-width="80px">
                <el-input placeholder="请输入评论主题" class="comment-menu-item"></el-input>
                <el-input
                  type="textarea"
                  :rows="15"
                  placeholder="请输入评论内容" class="comment-menu-item">
                </el-input>
                <p class="comment-menu-item"><a href="https://guides.github.com/features/mastering-markdown/" target="_blank"><i class="el-icon-info"></i> 可以使用MarkDown语法</a></p>
                <el-button type="primary" @click="onSubmit" class="comment-menu-item">发布评论</el-button>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../common/stylus/theme.styl";

    .article-page-footer
        text-align left
        height 200px
        .operate_menu
            margin-top 30px
        .comment-menu
            margin-top 30px
            .comment-menu-item
                margin-bottom 20px
            p.comment-menu-item
                a
                    font-size 14px
                    &:hover
                        color $color-main-primary

</style>
