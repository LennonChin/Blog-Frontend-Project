<template>
  <div class="simple-header" v-if="siteInfo">
    <div id="mobile-bar">
      <a class="menu-button" @click="showMobileMenu"></a>
      <router-link class="logo" to="/"></router-link>
      <a class="search-button"></a>
    </div>
    <div id="header">
      <router-link id="logo" to="/">
        <img :src="siteInfo.icon">
        <div class="info">
          <span class="name">{{ siteInfo.name }}</span>
          <span class="desc">{{ siteInfo.desc }}</span>
        </div>
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
          <router-link class="nav-link" :to="navigation.url" :target="navigation.target">
            {{ navigation.name }}
          </router-link>
        </li>
        <li>
          <i-switch @on-change="toggleTheme">
            <span slot="open">夜</span>
            <span slot="close">日</span>
          </i-switch>
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
        siteInfo: state => state.base.siteInfo
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
      },
      toggleTheme(isDark) {
        if (isDark) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
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
</style>
