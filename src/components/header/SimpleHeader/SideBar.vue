<template>
  <div class="side-bar" :class="{ open: show }">
    <p class="site-name">Diomedes</p>
    <div class="sidebar-inner" id="sidebar-toc">
      <form id="search-form">
            <span class="autocomplete" style="position: relative; display: inline-block; direction: ltr;">
              <input type="text"
                     id="search-query-sidebar"
                     class="search-query st-default-search-input aa-input"
                     style="position: relative; vertical-align: top;">
            </span>
      </form>
      <p class="site-nav">网站导航
        <iv-switch v-model="showNav">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </iv-switch>
      </p>
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
      ...
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
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
    methods: {
      toggleSideBar() {
        this.show = !this.show;
      },
      refreshMenu() {
        /* eslint-disable */
//        new TOC('article-main-page', {
//          'level': 5,
//          'top': 200,
//          'class': 'list',
//          'targetId': 'sidebar-toc'
//        });
      }
    },
    mounted: function () {
      this.refreshMenu();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/sidebar.styl";
</style>
