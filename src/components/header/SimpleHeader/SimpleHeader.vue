<template>
  <div class="simple-header" v-if="siteInfo">
    <div id="mobile-bar" v-if="responsiveRender(true, true, true, false)">
      <a class="menu-button" @click="showMobileMenu"></a>
      <router-link class="logo" to="/"></router-link>
    </div>
    <div id="header" v-if="responsiveRender(false, false, false, true)">
      <router-link id="logo" to="/">
        <img :src="siteInfo.icon">
        <span>{{ siteInfo.name }}</span>
      </router-link>
      <ul id="nav">
        <!-- 搜索框 -->
        <li>
          <iv-auto-complete
            v-model="searchKeyWords"
            icon="ios-search"
            placeholder="输入搜索内容"
            @on-search="search"
            @on-select="selectSearchResult"
            style="width:300px">
            <div class="demo-auto-complete-item" v-for="(values, key) in searchResult">
              <div class="demo-auto-complete-group">
                <span>{{ key }}</span>
                <a href="https://www.google.com/search?q=iView" target="_blank">更多</a>
              </div>
              <iv-option v-for="(value, index) in values.slice(0, 5)" :value="value.title" :key="index">
                <span class="demo-auto-complete-title">{{ value.title }}</span>
                <span class="demo-auto-complete-count">{{ value.add_time | socialDate }}</span>
              </iv-option>
              <a href="" target="_blank" class="demo-auto-complete-more" v-if="values.length > 5">查看所有结果</a>
            </div>
          </iv-auto-complete>
        </li>
        <!-- 类别导航 -->
        <li class="nav-dropdown-container" v-for="category_level1 in categorys">
          <router-link class="nav-link" :to="rootRouterLink(category_level1)">
            {{ category_level1.name }} <span class="arrow"></span>
          </router-link>
          <ul class="nav-dropdown" v-if="category_level1.sub_category.length > 0">
            <li v-for="category_level2 in category_level1.sub_category">
              <router-link class="nav-link" :to="routerLink(category_level2)">
                {{category_level2.name}}
              </router-link>
              <ul class="nav-dropdown">
                <li v-for="category_level3 in category_level2.sub_category">
                  <router-link class="nav-link" :to="routerLink(category_level3)">
                    {{category_level3.name}}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <!-- 自定义的导航 -->
        <li class="nav-dropdown-container" v-for="navigation in siteInfo.navigations">
          <a class="nav-link" :href="navigation.url">
            {{ navigation.name }}
          </a>
        </li>
      </ul>
    </div>
    <sidebar :categorys="this.categorys" v-if="responsiveRender(true, true, true, false)" ref="sidebar"></sidebar>
  </div>
</template>

<script type="text/ecmascript-6">
  import SideBar from '@/components/header/SimpleHeader/SideBar';
  import {getSiteInfo, getCategorys, search} from '@/api/api';
  import {saveToLocal, loadFromLocal} from '@/common/js/utils';

  export default {
    data() {
      return {
        categorys: [],
        siteInfo: [],
        searchKeyWords: '',
        searchResult: []
      };
    },
    created: function () {
      // 如果后台控制了强制刷新，即强制刷新
      if (window.__force_refresh__) {
        console.log('重新请求category_info');
        this.getCategorys();
        console.log('重新请求site_info');
        this.getSiteInfo();
        return;
      }
      // 分类信息
      let categoryInfo = loadFromLocal('site', 'category_info', null);
      if (categoryInfo) {
        let expireTime = categoryInfo['expire_time'];
        let nowTimestamp = Date.parse(new Date());
        if (expireTime !== null && nowTimestamp - expireTime > 24 * 3600 * 1000) {
          console.log('重新请求category_info');
          this.getCategorys();
        } else {
          this.categorys = categoryInfo['category_info'];
        }
      } else {
        console.log('重新请求category_info');
        this.getCategorys();
      }

      // 网站信息
      let siteInfo = loadFromLocal('site', 'site_info', null);
      if (siteInfo) {
        let expireTime = categoryInfo['expire_time'];
        let nowTimestamp = Date.parse(new Date());
        if (expireTime !== null && nowTimestamp - expireTime > 24 * 3600 * 1000) {
          console.log('重新请求site_info');
          this.getSiteInfo();
        } else {
          this.siteInfo = siteInfo['site_info'];
        }
      } else {
        console.log('重新请求site_info');
        this.getSiteInfo();
      }
    },
    methods: {
      getCategorys() {
        getCategorys({
          params: {
            level_min: 1,
            level_max: 1,
            is_tab: true
          }
        }).then((response) => {
          this.categorys = response.data.results;
          // 将分类信息保存到本地，避免多次请求
          let categoryInfo = {
            'expire_time': Date.parse(new Date()),
            'category_info': this.categorys
          };
          saveToLocal('site', 'category_info', categoryInfo);
        }).catch((error) => {
          console.log(error);
        });
      },
      getSiteInfo() {
        getSiteInfo({
          params: {
            'is_active': true
          }
        }).then((response) => {
          this.siteInfo = response.data[0];
          // 将站点信息保存到本地，避免多次请求
          let siteInfo = {
            'expire_time': Date.parse(new Date()),
            'site_info': this.siteInfo
          };
          saveToLocal('site', 'site_info', siteInfo);
        }).catch((error) => {
          console.log(error);
        });
      },
      search() {
        console.log(this.searchKeyWords);
        if (this.searchKeyWords.length === 0) {
          return;
        }
        search({
          params: {
            'title__contains': this.searchKeyWords
          }
        }).then((response) => {
          this.searchResult = response.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      selectSearchResult(link) {
        window.open(link, '_blank');
      },
      rootRouterLink(category) {
        let router = {};
        router.name = category.category_type;
        return router;
      },
      routerLink(category) {
        let router = {};
        router.name = category.category_type;
        router.params = {};
        router.params['id'] = category.id;
        return router;
      },
      showMobileMenu() {
        // 显示手机端的菜单
        let sidebar = this.$refs.sidebar;
        sidebar.toggleSideBar();
      }
    },
    components: {
      'sidebar': SideBar
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "stylus/header.styl";
  .demo-auto-complete-item{
    padding: 4px 0;
    border-bottom: 1px solid #F6F6F6;
  }
  .demo-auto-complete-group{
    font-size: 12px;
    padding: 4px 6px;
  }
  .demo-auto-complete-group span{
    color: #666;
    font-weight: bold;
  }
  .demo-auto-complete-group a{
    float: right;
  }
  .demo-auto-complete-count{
    float: right;
    color: #999;
  }
  .demo-auto-complete-more{
    display: block;
    margin: 0 auto;
    padding: 4px;
    text-align: center;
    font-size: 12px;
  }
</style>
