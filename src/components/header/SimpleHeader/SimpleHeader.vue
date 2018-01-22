<template>
  <div class="simple-header">
    <div id="mobile-bar" v-if="responsiveRender(true, true, true, false)">
      <a class="menu-button" @click="showMobileMenu"></a>
      <router-link class="logo" to="/"></router-link>
    </div>
    <div id="header" v-if="responsiveRender(false, false, false, true)">
      <router-link id="logo" to="/">
        <img :src="this.siteInfo.icon">
        <span>{{ this.siteInfo.name }}</span>
      </router-link>
      <ul id="nav">
        <!-- 类别导航 -->
        <li class="nav-dropdown-container" v-for="category_level1 in this.categorys">
          <router-link class="nav-link" :to="rootRouterLink(category_level1)">
            {{ category_level1.name }} <span class="arrow"></span>
          </router-link>
          <ul class="nav-dropdown" v-if="category_level1.sub_category.length > 0">
            <li v-for="category_level2 in category_level1.sub_category">
              <router-link class="nav-link" :to="routerLink(category_level1, category_level2.id)">
                {{category_level2.name}}
              </router-link>
              <ul class="nav-dropdown">
                <li v-for="category_level3 in category_level2.sub_category">
                  <router-link class="nav-link" :to="routerLink(category_level1, category_level3.id)">
                    {{category_level3.name}}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <!-- 自定义的导航 -->
        <li class="nav-dropdown-container" v-for="navigation in this.siteInfo.navigations">
          <a class="nav-link" :href="navigation.url">
            {{ navigation.name }}
          </a>
        </li>
        <!-- 搜索框 -->
        <li>
          <form id="search-form">
            <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
              <input type="text"
                     id="search-query-nav"
                     class="search-query st-default-search-input aa-input"
                     autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list"
                     aria-expanded="false"
                     aria-owns="algolia-autocomplete-listbox-0" dir="auto"
                     style="position: relative; vertical-align: top;"/>
            </span>
          </form>
        </li>
      </ul>
    </div>
    <sidebar :categorys="this.categorys" v-if="responsiveRender(true, true, true, false)" ref="sidebar"></sidebar>
  </div>
</template>

<script type="text/ecmascript-6">
  import SideBar from '@/components/header/SimpleHeader/SideBar';
  import {getSiteInfo, getCategorys} from '@/api/api';
  import {saveToLocal, loadFromLocal} from '@/common/js/utils';

  export default {
    data() {
      return {
        categorys: [],
        siteInfo: []
      };
    },
    created: function () {
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
        }).catch(function (error) {
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
        }).catch(function (error) {
          console.log(error);
        });
      },
      rootRouterLink(category) {
        let router = {};
        router.name = category.code;
        return router;
      },
      routerLink(category, categoryId) {
        let router = {};
        router.name = category.code + '/category';
        router.params = {};
        router.params['categoryId'] = categoryId;
        return router;
      },
      showMobileMenu() {
        // 显示手机端的菜单
        var sidebar = this.$refs.sidebar;
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
</style>
