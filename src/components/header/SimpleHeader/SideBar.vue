<template>
  <div class="side-bar" @touchmove.prevent :class="{ open: show }">
    <div class="main-area" @touchmove.stop>
      <div class="top-wrapper" @click.prevent>
        <div class="top-area">
          <img :src="siteInfo.background" alt="">
          <div class="site-info">
            <h1 class="site-name">{{ siteInfo.name }}</h1>
            <h1 class="site-desc">{{ siteInfo.desc }}</h1>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav">
            <p><i-icon type="map"></i-icon> 网站导航</p>
            <i-switch v-model="showNav">
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
          </div>
          <ul class="nav-menu" :class="{'hide': !showNav}">
            <!-- 类别导航 -->
            <li class="nav-dropdown-container" v-for="category_level1 in allCategorysInfo">
              <i-icon type="minus-round"></i-icon>&nbsp;
              <router-link class="nav-link" :to="rootRouterLink(category_level1)">
                {{ category_level1.name }} <span class="arrow"></span>
              </router-link>
              <ul class="nav-dropdown" v-if="category_level1.sub_category.length > 0">
                <li v-for="category_level2 in category_level1.sub_category">
                  <i-icon type="minus-round"></i-icon>
                  <router-link class="nav-link" :to="routerLink(category_level2)">
                    {{category_level2.name}}
                  </router-link>
                  <ul class="nav-dropdown">
                    <li v-for="category_level3 in category_level2.sub_category">
                      <i-icon type="minus-round"></i-icon>&nbsp;
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
              <i-icon type="minus-round"></i-icon>&nbsp;
              <router-link class="nav-link" :to="navigation.url" :target="navigation.target">
                {{ navigation.name }}
              </router-link>
            </li>
          </ul>
          <div class="sidebar-toc-list" ref="list">
            <div class="site-nav">
              <p><i-icon type="ios-flower-outline"></i-icon> 文章目录</p>
            </div>
            <div id="sidebar-toc" class="list"  @click.prevent></div>
          </div>
        </div>
      </div>
      <div class="sidebar-operate-area" @click.stop>
        <i-switch @on-change="toggleTheme" v-model="isDark">
          <span slot="open">夜</span>
          <span slot="close">日</span>
        </i-switch>
      </div>
    </div>
    <div class="mask" @click.prevent="toggleSideBar"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapState,
    mapMutations
  } from 'vuex';

  // mixin
  import {mixin} from '@/common/js/utils';

  export default {
    name: 'side-bar',
    props: {
      categorys: {
        Type: Array,
        default: []
      }
    },
    data() {
      return {
        show: false,
        showNav: false
      };
    },
    mixins: [mixin],
    computed: {
      ...mapState({
        siteInfo: state => state.base.siteInfo,
        bloggerInfo: state => state.base.bloggerInfo,
        siteTheme: state => state.base.siteTheme
      }),
      isDark: {
        get: function () {
          return this.siteTheme === 'dark';
        },
        set: function(newTheme) {
          this.updateSiteTheme(newTheme);
        }
      }
    },
    methods: {
      ...mapMutations({
        updateSiteTheme: 'base/UPDATE_SITE_THEME'
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
      // sidebar打开时调用，用于防止滚动穿透
      afterOpen(className) {
        this.scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop;
        document.body.classList.add(className);
        document.body.style.top = -this.scrollTop + 'px';
      },
      // sidebar关闭时调用，用于防止滚动穿透
      beforeClose(className) {
        document.body.classList.remove(className);
        document.scrollingElement.scrollTop = this.scrollTop;
        document.body.scrollTop = this.scrollTop;
        document.body.style.top = '';
      },
      toggleSideBar() {
        this.show = !this.show;
        // 控制遮罩弹出后防止滚动穿透问题
        if (this.show) {
          this.afterOpen('scroll-control');
        } else {
          this.beforeClose('scroll-control');
        }
      },
      toggleTheme(isDark) {
        this.updateSiteTheme(isDark ? 'dark' : 'default');
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "./stylus/sidebar.styl";
</style>
