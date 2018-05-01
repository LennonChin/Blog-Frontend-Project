<template>
  <div class="simple-header" v-if="siteInfo">
    <div id="mobile-bar" v-if="false">
      <a class="menu-button" @click="showMobileMenu"></a>
      <router-link class="logo" to="/"></router-link>
    </div>
    <div id="header">
      <router-link id="logo" to="/">
        <img :src="siteInfo.icon">
        <span>{{ siteInfo.name }}</span>
      </router-link>
      <ul id="nav">
        <!-- 搜索框 -->
        <li>
          <search-view></search-view>
        </li>
        <!-- 类别导航 -->
        <li class="nav-dropdown-container" v-for="category_level1 in allCategorysInfo">
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
    <!--<side-bar :categorys="allCategorysInfo" ref="sidebar"></side-bar>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapState,
    mapActions
  } from 'vuex';
  import SideBar from '@/components/header/SimpleHeader/SideBar';
  import SearchView from '@/components/views/Search/SearchView';

  export default {
    name: 'simple-header',
    data() {
      return {
        searchKeyWords: '',
        searchResult: []
      };
    },
    asyncData({store}) {
      return Promise.all([
        store.dispatch('base/GET_SITE_INFO'),
        store.dispatch('base/GET_ALL_CATEGORYS')
      ]);
    },
    mounted() {
      if (!this.$store.state.base.siteInfo) this.getSiteInfo();
      if (!this.$store.state.base.allCategorysInfo) this.getAllCategorys();
    },
    computed: {
      ...mapState({
        siteInfo: state => state.base.siteInfo,
        allCategorysInfo: state => state.base.allCategorysInfo
      })
    },
    methods: {
      ...mapActions({
        getSiteInfo: 'base/GET_SITE_INFO',
        getAllCategorys: 'base/GET_ALL_CATEGORYS'
      }),
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
      'side-bar': SideBar,
      'search-view': SearchView
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "stylus/header.styl";
  .demo-auto-complete-item {
    padding: 4px 0;
    border-bottom: 1px solid #F6F6F6;
  }

  .demo-auto-complete-group {
    font-size: 12px;
    padding: 4px 6px;
  }

  .demo-auto-complete-group span {
    color: #666;
    font-weight: bold;
  }

  .demo-auto-complete-group a {
    float: right;
  }

  .demo-auto-complete-count {
    float: right;
    color: #999;
  }

  .demo-auto-complete-more {
    display: block;
    margin: 0 auto;
    padding: 4px;
    text-align: center;
    font-size: 12px;
  }
</style>
