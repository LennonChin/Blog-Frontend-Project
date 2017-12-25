<template>
  <div class="simple-header">
    <div id="mobile-bar" v-if="responsiveRender(true, true, true, false)">
      <a class="menu-button" @click="showMobileMenu"></a>
      <router-link class="logo" to="/"></router-link>
    </div>
    <div id="header" v-if="responsiveRender(false, false, false, true)">
      <router-link id="logo" to="/">
        <img src="../../../assets/logo.png">
        <span>Diomedes</span>
      </router-link>
      <ul id="nav">
        <li class="nav-dropdown-container" v-for="category_level1 in this.categorys">
          <a class="nav-link"> {{ category_level1.name }} <span class="arrow"></span></a>
          <ul class="nav-dropdown" v-if="category_level1.sub_category.length > 0">
            <li>
              <ul>
                <li v-for="category_level2 in category_level1.sub_category">
                  <a href="" class="nav-link">{{category_level2.name}} </a>
                  <ul class="nav-dropdown">
                    <li v-for="category_level3 in category_level2.sub_category"><a href="" class="nav-link">{{category_level3.name}} </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
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
              <pre aria-hidden="true"
                   style="position: absolute; visibility: hidden; white-space: pre; font-family: system-ui; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre>
              <span class="aa-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-0"
                    style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;">
                <div class="aa-dataset-1"></div>
              </span>
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
  import {getCategorys} from '@/api/api';

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
        this.initHeaderMenu();
      });
    },
    methods: {
      initHeaderMenu() {
        getCategorys({
          params: {
            'level_min': 1,
            'level_max': 1
          }
        }).then((response) => {
          this.categorys = response.data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      showMobileMenu() {
        // 显示手机端的菜单
        var sidebar = this.$refs.sidebar;
        sidebar.toggleSideBar();
      }
    }
  }
  ;
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/header.styl";
</style>
