<template>
  <div class="simple-header">
    <div id="mobile-bar">
      <a class="menu-button" ref="menubutton"></a>
      <router-link class="logo" to="/"></router-link>
    </div>
    <div id="header">
      <router-link id="logo" to="/">
        <img src="../../../assets/logo.png">
        <span>Diomedes</span>
      </router-link>
      <ul id="nav">
        <li>
          <form id="search-form">
            <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;"><input
                    type="text" id="search-query-nav" class="search-query st-default-search-input aa-input"
                    autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false"
                    aria-owns="algolia-autocomplete-listbox-0" dir="auto"
                    style="position: relative; vertical-align: top;"><pre
                    aria-hidden="true"
                    style="position: absolute; visibility: hidden; white-space: pre; font-family: system-ui; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre><span
                    class="aa-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-0"
                    style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;"><div
                    class="aa-dataset-1"></div></span></span>
          </form>
        </li>
        <li class="nav-dropdown-container" v-for="category_level1 in this.categorys">
          <a class="nav-link"> {{ category_level1.name }}</a><span class="arrow"> </span>
          <ul class="nav-dropdown" v-if="category_level1.sub_category.length > 0">
            <li>
              <ul>
                <li v-for="category_level2 in category_level1.sub_category"><a href="/v2/guide/" class="nav-link">
                  {{category_level2.name}} </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <sidebar :categorys="this.categorys" ref="sidebar"></sidebar>
  </div>
</template>

<script type="text/ecmascript-6">
  import SideBar from '@/components/header/SimpleHeader/SideBar';
  import {getCategory} from '@/api/api';

  export default {
    data() {
      return {
        categorys: []
      };
    },
    components: {
      'sidebar': SideBar
    },
    mounted: function () {
      this.$nextTick(function () {
        this.initMobileMenu();
        this.initHeaderMenu();
      });
    },
    methods: {
      initHeaderMenu() {
        getCategory({
          params: {
            'level_min': 1,
            'level_max': 1
          }
        }).then((response) => {
          console.log(response);
          this.categorys = response.data;
          console.log('categorys', this.categorys);
        }).catch(function (error) {
          console.log(error);
        });
      },
      initMobileMenu() {
        // 显示手机端的菜单
        var sidebar = this.$refs.sidebar;
        this.$refs.menubutton.addEventListener('click', function () {
          sidebar.openSideBar();
        });
      }
    }
  }
  ;
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/header.styl";

  // 900px是小导航栏和大导航栏切换的阈值
</style>
