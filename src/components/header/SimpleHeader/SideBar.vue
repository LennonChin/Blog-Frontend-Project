<template>
  <div class="side-bar" @click.prevent="toggleSideBar" @touchmove.stop.prevent :class="{ open: show }">
    <div class="top-wrapper" @click.stop @touchmove.stop>
      <h1 class="site-name">Diomedes</h1>
      <div class="sidebar-menus">
        <div class="site-nav">
          <p>网站导航</p>
          <i-switch v-model="showNav">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </div>
        <ul class="nav-menu" :class="{'hide': !showNav}">
          <li class="nav-dropdown-container" v-for="category_level1 in this.categorys">
            <a class="nav-link">{{ category_level1.name }}</a> <span class="arrow"> </span>
            <ul class="nav-dropdown" v-if="category_level1.sub_category.length > 0">
              <li>
                <ul>
                  <li v-for="category_level2 in category_level1.sub_category">
                    <a href="" class="nav-link">{{ category_level2.name }}</a>
                    <ul class="nav-dropdown">
                      <li v-for="category_level3 in category_level2.sub_category"><a href="" class="nav-link">{{category_level3.name}} </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <div class="sidebar-toc-list" ref="list">
          <div class="site-nav">
            <p>文章目录</p>
          </div>
          <div id="sidebar-toc"></div>
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
</template>

<script type="text/ecmascript-6">
  import {
    mapState,
    mapMutations
  } from 'vuex';
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
    computed: {
      ...mapState({
        siteInfo: state => state.base.siteInfo,
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
      toggleSideBar() {
        this.show = !this.show;
      },
      toggleTheme(isDark) {
        this.updateSiteTheme(isDark ? 'dark' : 'default');
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "stylus/sidebar.styl";
</style>
