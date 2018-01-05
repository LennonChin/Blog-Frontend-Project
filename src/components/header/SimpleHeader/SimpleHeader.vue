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
    created: function () {
      this.initHeaderMenu();
    },
    methods: {
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
      initHeaderMenu() {
        getCategorys({
          params: {
            'level_min': 1,
            'level_max': 1
          }
        }).then((response) => {
          this.categorys = response.data.results;
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
