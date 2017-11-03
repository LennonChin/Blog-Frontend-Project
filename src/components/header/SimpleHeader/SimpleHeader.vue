<template>
  <div class="simple-header">
    <div id="mobile-bar">
      <a class="menu-button" ref="menubutton"></a>
      <router-link class="logo" to="/home"></router-link>
    </div>
    <div id="header">
      <router-link id="logo" to="/home">
        <img src="../../../assets/logo.png">
        <span>Diomedes</span>
      </router-link>
      <ul id="nav">
        <li>
          <form id="search-form">
        <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;"><input
          type="text" id="search-query-nav" class="search-query st-default-search-input aa-input"
          autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false"
          aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;"><pre
          aria-hidden="true"
          style="position: absolute; visibility: hidden; white-space: pre; font-family: system-ui; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre><span
          class="aa-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-0"
          style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;"><div
          class="aa-dataset-1"></div></span></span>
          </form>
        </li>
        <li class="nav-dropdown-container learn">
          <a class="nav-link current">菜单</a><span class="arrow"></span>
          <ul class="nav-dropdown">
            <li>
              <ul>
                <li><a href="/v2/guide/" class="nav-link current">菜单</a></li>
                <li><a href="/v2/api/" class="nav-link">菜单</a></li>
                <li><a href="/v2/style-guide/" class="nav-link">菜单</a></li>
                <li><a href="/v2/examples/" class="nav-link">菜单</a></li>
              </ul>
            </li>
          </ul>
        </li>

        <li class="nav-dropdown-container ecosystem">
          <a class="nav-link">菜单</a><span class="arrow"></span>
          <ul class="nav-dropdown">
            <li><h4>菜单</h4></li>
            <li>
              <ul>
                <li><a href="https://forum.vuejs.org/" class="nav-link" target="_blank">菜单</a></li>
                <li><a href="https://chat.vuejs.org/" class="nav-link" target="_blank">菜单</a></li>
              </ul>
            </li>
            <li><h4>菜单</h4></li>
            <li>
              <ul>
                <li><a href="https://github.com/vuejs/vue-devtools" class="nav-link" target="_blank">菜单</a></li>
                <li><a href="https://vuejs-templates.github.io/webpack" class="nav-link" target="_blank">菜单</a>
                </li>
                <li><a href="https://vue-loader.vuejs.org" class="nav-link" target="_blank">菜单</a></li>
              </ul>
            </li>
            <li><h4>菜单</h4></li>
            <li>
              <ul>
                <li><a href="https://router.vuejs.org/" class="nav-link" target="_blank">菜单</a></li>
                <li><a href="https://vuex.vuejs.org/" class="nav-link" target="_blank">菜单</a></li>
                <li><a href="https://ssr.vuejs.org/" class="nav-link" target="_blank">菜单</a></li>
              </ul>
            </li>
            <li><h4>菜单</h4></li>
            <li>
              <ul>
                <li><a href="https://github.com/vuejs/roadmap" class="nav-link" target="_blank">菜单</a></li>
                <li><a href="https://twitter.com/vuejs" class="nav-link" target="_blank">菜单</a></li>
                <li><a href="https://medium.com/the-vue-point" class="nav-link" target="_blank">菜单</a></li>
                <li><a href="https://vuejobs.com/?ref=vuejs" class="nav-link" target="_blank">菜单</a></li>
              </ul>
            </li>
            <li><h4>菜单</h4></li>
            <li>
              <ul>
                <li><a href="https://github.com/vuejs" class="nav-link" target="_blank">菜单</a></li>
                <li><a href="https://curated.vuejs.org/" class="nav-link" target="_blank">菜单</a></li>
                <li><a href="https://github.com/vuejs/awesome-vue" class="nav-link" target="_blank">菜单</a></li>
              </ul>
            </li>
          </ul>
        </li>

        <li>
          <a href="/v2/guide/team.html" class="nav-link team">菜单</a>
        </li>
        <li class="nav-dropdown-container support-vue">
          <a class="nav-link">菜单</a><span class="arrow"></span>
          <ul class="nav-dropdown">
            <li>
              <ul>
                <li><a href="https://vue.threadless.com" target="_blank" class="nav-link">菜单</a></li>
                <li><a href="https://stickeroverflow.org/blog/vue-donation/" target="_blank" class="nav-link">菜单</a>
                </li>
                <li><a href="https://opencollective.com/vuejs" target="_blank" class="nav-link">菜单</a>
                </li>
                <li><a href="https://www.patreon.com/evanyou" target="_blank" class="nav-link">菜单</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li class="nav-dropdown-container language">
          <a class="nav-link">菜单</a><span class="arrow"></span>
          <ul class="nav-dropdown">
            <li><a href="https://vuejs.org/v2/guide/index.html" class="nav-link" target="_blank">菜单</a></li>
            <li><a href="https://jp.vuejs.org/v2/guide/index.html" class="nav-link" target="_blank">菜单</a></li>
            <li><a href="https://ru.vuejs.org/v2/guide/index.html" class="nav-link" target="_blank">菜单</a></li>
            <li><a href="https://kr.vuejs.org/v2/guide/index.html" class="nav-link" target="_blank">菜单</a></li>
            <li><a href="https://br.vuejs.org/v2/guide/index.html" class="nav-link" target="_blank">菜单</a></li>
            <li><a href="https://fr.vuejs.org/v2/guide/index.html" class="nav-link" target="_blank">菜单</a></li>
          </ul>
        </li>

        <li><a href="https://github.com/vuejs/cn.vuejs.org/" target="_blank" class="nav-link contribute">菜单</a></li>

      </ul>
    </div>
    <sidebar ref="sidebar"></sidebar>
  </div>
</template>

<script type="text/ecmascript-6">
  import SideBar from '@/components/header/SimpleHeader/SideBar';

  export default {
    components: {
      'sidebar': SideBar
    },
    mounted: function () {
      this.$nextTick(function () {
        this.initMobileMenu();
      });
    },
    methods: {
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
