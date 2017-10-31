<template>
  <div class="header">
    <div class="header-nav">
      <el-row :gutter="8" type="flex" justify="space-between">
        <el-col :xs="4" :sm="2" :md="2" :lg="2" :xl="2">
          <div class="logo">
            <i class="el-icon-setting"></i>
          </div>
        </el-col>
        <el-col :xs="15" :sm="19" :md="6" :lg="9" :xl="9">
          <div class="search" style="margin-top: 10px;">
            <el-input placeholder="请输入内容" v-model="search_content" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :md="16" :lg="13" :xl="13" class="hidden-sm-and-down">
          <div class="menu">
            <el-menu mode="horizontal" @select="handleSelect" style="border-bottom: none;">
              <el-menu-item index="1">处理中心</el-menu-item>
              <el-menu-item index="2">订单管理</el-menu-item>
              <el-menu-item index="3">订单管理</el-menu-item>
              <el-menu-item index="4">订单管理</el-menu-item>
              <el-submenu index="5">
                <template slot="title">工作台1</template>
                <el-menu-item index="5-1">选项1</el-menu-item>
                <el-menu-item index="5-2">选项2</el-menu-item>
                <el-menu-item index="5-3">选项3</el-menu-item>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">工作台2</template>
                <el-menu-item index="6-1">选项1</el-menu-item>
                <el-menu-item index="6-2">选项2</el-menu-item>
                <el-menu-item index="6-3">选项3</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :xs="5" :sm="3" :md="0" class="hidden-md-and-up">
          <el-dropdown style="margin-top: 10px;">
            <el-button type="Success">
              <i class="el-icon-menu"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        search_content: '',
        search_category: ''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/base.styl";
  .header
    padding-top 20px
    @media only screen and (max-width: 1140px)
      padding-top 15px
    @media only screen and (max-width: 576px)
      padding-top 5px
    .header-nav
      .logo
        height 61px
        line-height 90px
        vertical-align middle
        font-size 0
        .el-icon-setting
          font-size 40px;
          color #409EFF
      .search
        .el-select
          width 100px
</style>
