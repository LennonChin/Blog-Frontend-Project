<template>
  <div class="sidebar" v-bind:class="{ open: showMobileSideBar }">
    <div class="sidebar-inner" id="sidebar-toc">
      <ul class="main-menu">
        <li>
          <form id="search-form">
            <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;"><input
                    type="text" id="search-query-sidebar" class="search-query st-default-search-input aa-input"
                    autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false"
                    aria-owns="algolia-autocomplete-listbox-2" dir="auto"
                    style="position: relative; vertical-align: top;"><pre aria-hidden="true"
                                                                          style="position: absolute; visibility: hidden; white-space: pre; font-family: system-ui; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre><span
                    class="aa-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-2"
                    style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;"><div
                    class="aa-dataset-3"></div></span></span>
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
            <li><h4>工具</h4></li>
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
                <li><a href="https://twitter.com/vuejs" class="nav-link" target="_blank">T菜单</a></li>
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
                <li><a href="https://opencollective.com/vuejs" target="_blank" class="nav-link">菜单</a></li>
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
      <!--<ul class="menu-root">-->
      <!--<li><h3>基础</h3></li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/installation.html" class="sidebar-link">安装</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/index.html" class="sidebar-link current">介绍</a>-->
      <!--<ul class="menu-sub">-->
      <!--<li><a class="section-link" data-scroll="" href="#Vue-js-是什么">Vue.js 是什么</a></li>-->
      <!--<li><a class="section-link" data-scroll="" href="#起步">起步</a></li>-->
      <!--<li><a class="section-link" data-scroll="" href="#声明式渲染">声明式渲染</a></li>-->
      <!--<li><a class="section-link" data-scroll="" href="#条件与循环">条件与循环</a></li>-->
      <!--<li><a class="section-link" data-scroll="" href="#处理用户输入">处理用户输入</a></li>-->
      <!--<li><a class="section-link active" data-scroll="" href="#组件化应用构建">组件化应用构建</a></li>-->
      <!--<ul>-->
      <!--<li><a class="section-link" data-scroll="" href="#与自定义元素的关系">与自定义元素的关系</a></li>-->
      <!--</ul>-->
      <!--<li><a class="section-link" data-scroll="" href="#准备好了吗？">准备好了吗？</a></li>-->
      <!--</ul>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/instance.html" class="sidebar-link">Vue 实例</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/syntax.html" class="sidebar-link">模板语法</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/computed.html" class="sidebar-link">计算属性和观察者</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/class-and-style.html" class="sidebar-link">Class 与 Style 绑定</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/conditional.html" class="sidebar-link">条件渲染</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/list.html" class="sidebar-link">列表渲染</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/events.html" class="sidebar-link">事件处理</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/forms.html" class="sidebar-link">表单输入绑定</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/components.html" class="sidebar-link">组件</a>-->
      <!--</li>-->
      <!--<li><h3>过渡 &amp; 动画</h3></li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/transitions.html" class="sidebar-link">进入/离开 &amp; 列表过渡</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/transitioning-state.html" class="sidebar-link">状态过渡</a>-->
      <!--</li>-->
      <!--<li><h3>可复用性 &amp; 组合</h3></li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/mixins.html" class="sidebar-link">混合</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/custom-directive.html" class="sidebar-link">自定义指令</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/render-function.html" class="sidebar-link">渲染函数 &amp; JSX</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/plugins.html" class="sidebar-link">插件</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/filters.html" class="sidebar-link">过滤器</a>-->
      <!--</li>-->
      <!--<li><h3>工具</h3></li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/deployment.html" class="sidebar-link">生产环境部署</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/single-file-components.html" class="sidebar-link">单文件组件</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/unit-testing.html" class="sidebar-link">单元测试</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/typescript.html" class="sidebar-link">TypeScript 支持</a>-->
      <!--</li>-->
      <!--<li><h3>规模化</h3></li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/routing.html" class="sidebar-link">路由</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/state-management.html" class="sidebar-link">状态管理</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/ssr.html" class="sidebar-link">服务端渲染</a>-->
      <!--</li>-->
      <!--<li><h3>内在</h3></li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/reactivity.html" class="sidebar-link">深入响应式原理</a>-->
      <!--</li>-->
      <!--<li><h3>迁移</h3></li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/migration.html" class="sidebar-link">从 Vue 1.x 迁移</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/migration-vue-router.html" class="sidebar-link">从 Vue Router 0.7.x 迁移</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/migration-vuex.html" class="sidebar-link">从 Vuex 0.6.x 迁移到 1.0</a>-->
      <!--</li>-->
      <!--<li><h3>更多</h3></li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/comparison.html" class="sidebar-link">对比其他框架</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/join.html" class="sidebar-link">加入 Vue.js 社区</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="/v2/guide/team.html" class="sidebar-link">认识团队</a>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>      <div class="list">-->

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TOC from '../../../common/js/MarkdownToc';

  export default {
    data() {
      return {
        'showMobileSideBar': false
      };
    },
    methods: {
      openSideBar() {
        this.showMobileSideBar = !this.showMobileSideBar;
      },
      refreshMenu() {
        /* eslint-disable */
        new TOC('article-main-page', {
          'level': 5,
          'top': 200,
          'class': 'list',
          'targetId': 'sidebar-toc'
        });
      }
    },
    mounted: function () {
      this.refreshMenu();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/sidebar.styl";
  .sidebar
    overscroll-behavior contain
</style>
