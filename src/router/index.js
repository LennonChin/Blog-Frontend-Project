import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Index from '@/components/index/Index';

// 公共区域
import CommonHeader from '@/components/header/CommonHeader';
import CommonFooter from '@/components/footer/CommonFooter';

// 首页
import HomeContent from '@/components/content/HomeContent';
import ArticleContent from '@/components/content/ArticleContent';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'home',
          name: 'home',
          components: {
            header: CommonHeader,
            content: HomeContent,
            footer: CommonFooter
          }
        },
        {
          path: 'article',
          name: 'article',
          components: {
            header: CommonHeader,
            content: ArticleContent,
            footer: CommonFooter
          }
        }
      ]
    },
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    }
  ]
});
