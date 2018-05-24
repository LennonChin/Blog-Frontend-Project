<template>
  <div class="simple-header" v-if="siteInfo">
    <div id="mobile-bar" :class="{show: showHeader}">
      <router-link class="logo" to="/"></router-link>
      <transition name="fade">
        <div class="search-area" v-show="showMobileSearchView">
          <search-view></search-view>
        </div>
      </transition>
      <a class="menu-button" @click="showMobileMenu"></a>
      <a class="search-button" @click="showSearchView"></a>
    </div>
    <div id="header" class="show">
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
        <li class="nav-dropdown-container" v-for="category_level1 in allCategorysInfo" v-if="category_level1.is_tab">
          <router-link class="nav-link" :to="rootRouterLink(category_level1)">
            {{ category_level1.name }} <span class="arrow"></span>
          </router-link>
          <ul class="nav-dropdown" v-if="category_level1.sub_category.length > 0">
            <li v-for="category_level2 in category_level1.sub_category" v-if="category_level2.is_tab">
              <router-link class="nav-link" :to="routerLink(category_level2)">
                {{category_level2.name}}
              </router-link>
              <ul class="nav-dropdown">
                <li v-for="category_level3 in category_level2.sub_category" v-if="category_level3.is_tab">
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
          <a class="nav-link" :href="navigation.url" :target="navigation.target">
            {{ navigation.name }}
          </a>
        </li>
        <li>
          <i-switch @on-change="toggleTheme" v-model="isDark">
            <span slot="open">夜</span>
            <span slot="close">日</span>
          </i-switch>
        </li>
      </ul>
    </div>
    <side-bar :categorys="allCategorysInfo" ref="sidebar"></side-bar>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';
  import SideBar from '@/components/header/SimpleHeader/SideBar';
  import SearchView from '@/components/views/Search/SearchView';
  import {loadFromLocal, mixin} from '@/common/js/utils';

  export default {
    name: 'simple-header',
    data() {
      return {
        searchKeyWords: '',
        searchResult: [],
        showHeader: true,
        showMobileSearchView: false
      };
    },
    mixins: [mixin],
    asyncData({store}) {
      return Promise.all([
        store.dispatch('base/GET_SITE_INFO'),
        store.dispatch('base/GET_ALL_CATEGORYS')
      ]);
    },
    mounted() {
      if (!this.$store.state.base.siteInfo) this.getSiteInfo();
      if (!this.$store.state.base.allCategorysInfo) this.getAllCategorys();
      // 获取皮肤信息
      this.checkTheme();
      // 监听滑动事件，以隐藏或显示header
      document.addEventListener('touchstart', this.touchStart, false);
      document.addEventListener('touchmove', this.touchMove, false);
      document.addEventListener('touchend', this.touchEnd, false);
      if (document.addEventListener) {
        // firefox
        document.addEventListener('DOMMouseScroll', this.scroll, false);
      }
      // 滚动滑轮触发scrollFunc方法  //ie 谷歌
      window.onmousewheel = document.onmousewheel = this.scroll;
    },
    beforeDestroy() {
      // 删除监听事件
      document.removeEventListener('touchstart', this.touchStart, false);
      document.removeEventListener('touchmove', this.touchMove, false);
      document.removeEventListener('touchend', this.touchEnd, false);
      if (document.removeEventListener) {
        // firefox
        document.removeEventListener('DOMMouseScroll', this.scroll, false);
      }
      // 滚动滑轮触发scrollFunc方法  //ie 谷歌
      window.onmousewheel = document.onmousewheel = null;
    },
    computed: {
      ...mapState({
        siteInfo: state => state.base.siteInfo,
        siteTheme: state => state.base.siteTheme
      }),
      isDark: {
        get: function () {
          return this.siteTheme === 'dark';
        },
        set: function (newTheme) {
          this.updateSiteTheme(newTheme);
        }
      }
    },
    methods: {
      ...mapMutations({
        updateSiteTheme: 'base/UPDATE_SITE_THEME'
      }),
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
      touchStart(evt) {
        try {
          let touch = evt.touches[0]; // 获取第一个触点
          let x = Number(touch.pageX); // 页面触点X坐标
          let y = Number(touch.pageY); // 页面触点Y坐标
          // 记录触点初始位置
          this.startX = x;
          this.startY = y;
        } catch (e) {
          console.log(e.message);
        }
      },
      touchMove(evt) {
        try {
          let touch = evt.touches[0]; // 获取第一个触点
          let y = Number(touch.pageY); // 页面触点Y坐标
          // 判断滑动方向
          if (y - this.startY > 0) {
            this.toggleHeader('up');
            // console.log('下滑了！');
          } else {
            this.toggleHeader('down');
            // console.log('上滑了！');
          }
        } catch (e) {
          console.log(e.message);
        }
      },
      touchEnd(evt) {
        try {
          let touch = evt.touches[0]; // 获取第一个触点
          let y = Number(touch.pageY); // 页面触点Y坐标
          // 判断滑动方向
          if (y - this.startY > 0) {
            this.toggleHeader('down');
            // console.log('下滑了！');
          } else {
            this.toggleHeader('up');
            // console.log('上滑了！');
          }
        } catch (e) {
          console.log(e.message);
        }
      },
      scroll (e) {
        e = e || window.event;
        if (e.wheelDelta) {
          // 判断浏览器IE，谷歌滑轮事件
          if (e.wheelDelta > 0) {
            // 当滑轮向上滚动时
            this.toggleHeader('up');
            // console.log('滑轮向上滚动');
          }
          if (e.wheelDelta < 0) {
            // 当滑轮向下滚动时
            this.toggleHeader('down');
            // console.log('滑轮向下滚动');
          }
        } else if (e.detail) {
          // Firefox滑轮事件
          if (e.detail > 0) {
            // 当滑轮向上滚动时
            this.toggleHeader('up');
            // console.log('滑轮向上滚动');
          }
          if (e.detail < 0) {
            // 当滑轮向下滚动时
            this.toggleHeader('down');
            // console.log('滑轮向下滚动');
          }
        }
      },
      toggleHeader(direction) {
        if (direction === 'down') {
          if (this.showHeader) {
            this.showHeader = false;
          }
        } else if (direction === 'up') {
          if (!this.showHeader) {
            this.showHeader = true;
          }
        }
      },
      showMobileMenu() {
        // 显示手机端的菜单
        let sidebar = this.$refs.sidebar;
        sidebar.toggleSideBar();
      },
      showSearchView() {
        this.showMobileSearchView = !this.showMobileSearchView;
      },
      checkTheme() {
        const theme = loadFromLocal('siteConfig', 'theme', 'default');
        this.updateSiteTheme(theme);
      },
      toggleTheme(isDark) {
        this.updateSiteTheme(isDark ? 'dark' : 'default');
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
