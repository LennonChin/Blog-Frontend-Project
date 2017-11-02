<template>
  <div class="home-content">
    <photo-wall></photo-wall>
    <section-title :mainTitle="'文章'" :subTitle="'Articles'"></section-title>
    <article-list-cell v-for="article in articles" :article="article" :key="article.title"></article-list-cell>
    <section-title :mainTitle="'主题'" :subTitle="'Topics'"></section-title>
    <div class="topic-cards">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <topic-card></topic-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <topic-card></topic-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <topic-card></topic-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <topic-card></topic-card>
        </el-col>
      </el-row>
    </div>
    <archive-list-time-title :date="'2017年'" :count="'200'"></archive-list-time-title>
    <archive-list-time-title :date="'10月'" :count="'200'" :dateType="'month'"></archive-list-time-title>
    <archive-list-cell v-for="article in articles" :article="article" :key="article.title"></archive-list-cell>
    <archive-list-time-title :date="'9月'" :count="'200'" :dateType="'month'"></archive-list-time-title>
    <archive-list-cell v-for="article in articles" :article="article" :key="article.title"></archive-list-cell>
    <archive-list-time-title :date="'8月'" :count="'200'" :dateType="'month'"></archive-list-time-title>
    <archive-list-cell v-for="article in articles" :article="article" :key="article.title"></archive-list-cell>
    <archive-list-time-title :date="'2016年'" :count="'200'"></archive-list-time-title>
    <archive-list-time-title :date="'12月'" :count="'200'" :dateType="'month'"></archive-list-time-title>
    <archive-list-cell v-for="article in articles" :article="article" :key="article.title"></archive-list-cell>
    <archive-list-time-title :date="'11月'" :count="'200'" :dateType="'month'"></archive-list-time-title>
    <archive-list-cell v-for="article in articles" :article="article" :key="article.title"></archive-list-cell>
    <archive-list-time-title :date="'10月'" :count="'200'" :dateType="'month'"></archive-list-time-title>
    <archive-list-cell v-for="article in articles" :article="article" :key="article.title"></archive-list-cell>
  </div>
</template>

<script type="text/ecmascript-6">
  import PhotoWall from '@/components/views/PhotoWall';
  import ArticleListCell from '@/components/views/Article/ArticleListCell';
  import SectionTitle from '@/components/views/SectionTitle';
  import TopicCard from '@/components/views/TopicCard';
  import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader';
  import ArticlePageContent from '@/components/views/Article/ArticlePageContent';
  import ArchiveListTimeTitle from '@/components/views/Archive/ArchiveListTimeTitle';
  import ArchiveListCell from '@/components/views/Archive/ArchiveListCell';

  export default {
    data() {
      return {
        articles: [
          {
            'id': 1,
            'title': '被迫向现实低头，再爱也只能到此为止',
            'author': '男孩与榴莲',
            'publish_time': '2017-10-22 17:57:08',
            'desc': '-1-见了男朋友回来之后喝了一杯没怎么泡好的红糖水和一杯满满的白开水。去上了次厕所，然后坐在床上的时候开始咳嗽不止，去洗了把脸，恍然地瞥见镜子中的自己看起来并不...',
            'readings': '148',
            'comments': '2',
            'likes': '20'
          },
          {
            'id': 2,
            'title': '我曾经喜欢过一个人',
            'author': '不能吃糖的0240',
            'publish_time': '2017-10-22 17:57:08',
            'desc': '-1-见了男朋友回来之后喝了一杯没怎么泡好的红糖水和一杯满满的白开水。去上了次厕所，然后坐在床上的时候开始咳嗽不止，去洗了把脸，恍然地瞥见镜子中的自己看起来并不...',
            'readings': '148',
            'comments': '2',
            'likes': '20'
          },
          {
            'id': 3,
            'title': '离开你以后我还是很喜欢很喜欢你',
            'author': 'JUNE.',
            'publish_time': '2017-10-22 17:57:08',
            'desc': '-1-见了男朋友回来之后喝了一杯没怎么泡好的红糖水和一杯满满的白开水。去上了次厕所，然后坐在床上的时候开始咳嗽不止，去洗了把脸，恍然地瞥见镜子中的自己看起来并不...',
            'readings': '148',
            'comments': '2',
            'likes': '20'
          },
          {
            'id': 4,
            'title': '思念如马，自别离，未停蹄！相思若柳，飘满城，尽飞絮！',
            'author': '每日小情书',
            'publish_time': '2017-10-22 17:57:08',
            'desc': '-1-见了男朋友回来之后喝了一杯没怎么泡好的红糖水和一杯满满的白开水。去上了次厕所，然后坐在床上的时候开始咳嗽不止，去洗了把脸，恍然地瞥见镜子中的自己看起来并不...',
            'readings': '148',
            'comments': '2',
            'likes': '20'
          }
        ]
      };
    },
    components: {
      'photo-wall': PhotoWall,
      'article-list-cell': ArticleListCell,
      'section-title': SectionTitle,
      'topic-card': TopicCard,
      'article-page-header': ArticlePageHeader,
      'article-page-content': ArticlePageContent,
      'archive-list-time-title': ArchiveListTimeTitle,
      'archive-list-cell': ArchiveListCell
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home-content
    width auto
    @media only screen and (max-width: 576px)
      margin 5px 5px 0 5px
    @media screen and (min-width: 576px)
      margin 10px 10px 0 10px
    @media screen and (min-width: 900px)
      margin 15px 35px 0 35px
    @media screen and (min-width: 1140px)
      width 1140px
      margin 15px auto 0
      margin-bottom 200px
</style>
