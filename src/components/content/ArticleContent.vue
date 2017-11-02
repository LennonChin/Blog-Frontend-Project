<template>
  <div class="article-content">
    <article-page-header></article-page-header>
    <article-page-content>
      <article class="typo container" slot="content">
        <pre class="brush:javascript;toolbar:false">大学毕业不再住寝室之后，我发展了一个新的爱好，叫做做饭。每天下班回来有点累了，去厨房鼓捣点吃的补充体力，发生不开心的事情心情压抑，去厨房烧点喜欢的菜，不知不觉就平静下来。<br>&nbsp;<br>《食记百味》里面有一句话讲：食物是一种很厉害的东西，带有一种决定性的力量。食物于我是一种治愈，喜欢吃，胖一点也没什么关系。今天给大家推荐10部和食物有关的电影，希望你看了能有一个好心情。</pre>
        <p>&nbsp;</p>
        <p><strong>【1】《深夜食堂》</strong></p>
        <p>导演:&nbsp;松冈锭司</p>
        <p>编剧:&nbsp;真边克彦&nbsp;/&nbsp;小嶋健作&nbsp;/&nbsp;松冈锭司&nbsp;/&nbsp;安倍夜郎</p>
        <p>主演:&nbsp;小林薰&nbsp;/&nbsp;高冈早纪&nbsp;/&nbsp;柄本时生&nbsp;/&nbsp;多部未华子&nbsp;/&nbsp;余贵美子&nbsp;</p>
        <p><br></p>
        <p>
          这个电影延续了同名日剧的风格，开头就是：天色已晚，人们都赶在回家的路上，我的一天才刚开始，营业时间从深夜12点到次日7点，人们称这里为深夜食堂，菜单只有这些，可以随意点其他菜，能做的就尽量做是我的经营方针，你问有没有客人，其实还不少呢。</p>
        <p>&nbsp;</p>
        <p>
          电影里面有3个小故事，3道美食，以客人们在桌子下边发现一个骨灰坛为开始，以骨灰坛的主人上门认领为结束。期间穿插着靠山去世，因失去依靠而颓唐不已的小三玉子的故事、乡下女孩美知留因吃霸王餐上门认错反被老板收留的故事和爱上了志愿者明美的灾民谦三求婚未果一路追到东京的故事。</p>
        <p>&nbsp;</p>
        <p>
          剧版里面的熟悉的面孔也都会出现，大家在老板做的热气腾腾的食物里面参与着这些事情的发生，谈一谈、聊一聊，各自吃着各自的食物，下次光顾的时候还要问问上次发生的事情，不知不觉的这些事情也都过去了，像任何一个平静的夜晚，一切缓缓的逝去，但是有一些温暖柔软的部分却被留了下来。</p>
        <p>&nbsp;</p>
        <p>喜欢这篇文章的话欢迎你关注我的微信公众号：<strong>【北渺】</strong></p>
        <p><br></p>
        <p>希望能成为你的朋友。</p>
        <p><br></p>
      </article>
    </article-page-content>
    <article-page-footer></article-page-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader';
  import ArticlePageContent from '@/components/views/Article/ArticlePageContent';
  import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter';

  export default {
    components: {
      'article-page-header': ArticlePageHeader,
      'article-page-content': ArticlePageContent,
      'article-page-footer': ArticlePageFooter
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .article-content
    width auto
    @media screen and (min-width: 576px)
      margin 5px 5px 0 5px
    @media screen and (min-width: 768px)
      margin 10px 10px 0 10px
    @media screen and (min-width: 992px)
      margin 15px 35px 0 35px
    @media screen and (min-width: 1200px)
      margin 0 100px 0 445px
    @media screen and (min-width: 1366px)
      margin 0 150px 0 495px
</style>
