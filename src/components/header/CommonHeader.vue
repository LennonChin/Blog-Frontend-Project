<template>
  <div class="header">
    <div class="header-nav">
      <el-row :gutter="20">
        <el-col :span="1">
          <div class="logo">
            <i class="el-icon-setting"></i>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="menu">
            <el-menu :default-active="activeIndex" class="" mode="horizontal" @select="handleSelect"
                     style="border-bottom: none;">
              <el-menu-item index="1">处理中心</el-menu-item>
              <el-menu-item index="2">订单管理</el-menu-item>
              <el-menu-item index="3">订单管理</el-menu-item>
              <el-menu-item index="4">订单管理</el-menu-item>
              <el-submenu index="5">
                <template slot="title">工作台</template>
                <el-menu-item index="5-1">选项1</el-menu-item>
                <el-menu-item index="5-2">选项2</el-menu-item>
                <el-menu-item index="5-3">选项3</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="search" style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="search_content" class="input-with-select">
              <el-select v-model="search_category" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
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
    background #fff
    width 100%
    .header-nav
      width 1140px
      margin 0 auto
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
