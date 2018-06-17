<template>
  <div class="side-bar" @touchmove.stop.prevent :class="{ open: show }">
    <div class="main-area">
      <div class="top-wrapper" @touchmove.stop>
        <div class="top-area">
          <img :src="siteInfo.background" alt="">
          <div class="site-info">
            <h1 class="site-name">{{ siteInfo.name }}</h1>
            <h1 class="site-desc">{{ siteInfo.desc }}</h1>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav">
            <p><i-icon type="map"></i-icon> {{ $t('others.siteNav') }}</p>
            <i-switch v-model="showNav">
              <span slot="open">{{ $t('others.open') }}</span>
              <span slot="close">{{ $t('others.close') }}</span>
            </i-switch>
          </div>
          <ul class="nav-menu" :class="{'hide': !showNav}">
            <!-- 类别导航 -->
            <li class="nav-dropdown-container" v-for="category_level1 in allCategorysInfo">
              <i-icon type="minus-round"></i-icon>&nbsp;
              <router-link class="nav-link" :to="rootRouterLink(category_level1)">
                {{ category_level1[resolveI18N('name')] }} <span class="arrow"></span>
              </router-link>
              <ul class="nav-dropdown" v-if="category_level1.sub_category.length > 0">
                <li v-for="category_level2 in category_level1.sub_category">
                  <i-icon type="minus-round"></i-icon>
                  <router-link class="nav-link" :to="routerLink(category_level2)">
                    {{category_level2[resolveI18N('name')]}}
                  </router-link>
                  <ul class="nav-dropdown">
                    <li v-for="category_level3 in category_level2.sub_category">
                      <i-icon type="minus-round"></i-icon>&nbsp;
                      <router-link class="nav-link" :to="routerLink(category_level3)">
                        {{category_level3[resolveI18N('name')]}}
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
                {{ navigation[resolveI18N('name')] }}
              </router-link>
            </li>
          </ul>
          <div class="sidebar-toc-list" ref="list">
            <div class="site-nav">
              <p><i-icon type="ios-flower-outline"></i-icon> {{ $t('article.typeName') + $t('others.toc') }}</p>
            </div>
            <div id="sidebar-toc" class="list"  @click.prevent></div>
          </div>
        </div>
      </div>
      <div class="sidebar-operate-area" @click.stop>
        <i-button-group size="small">
          <i-button style="width:30px;" type="ghost" :icon="isDark ? 'android-sunny' : 'ios-moon'" @click="toggleTheme">
          </i-button>
          <i-button style="width:40px;" type="ghost" @click="toggleLanguage">
            {{ $i18n.locale === 'EN' ? '中文' : 'EN' }}
          </i-button>
        </i-button-group>
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
      isDark: function () {
        return this.siteTheme === 'dark';
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
      toggleSideBar() {
        this.show = !this.show;
      },
      toggleLanguage() {
        if (this.$i18n.locale === 'CN') {
          this.$i18n.locale = 'EN';
        } else if (this.$i18n.locale === 'EN') {
          this.$i18n.locale = 'CN';
        }
      },
      toggleTheme() {
        this.updateSiteTheme(this.siteTheme === 'dark' ? 'default' : 'dark');
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "./stylus/sidebar.styl";
</style>
