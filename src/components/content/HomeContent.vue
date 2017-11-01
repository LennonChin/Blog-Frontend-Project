<template>
  <div class="content">
    <div class="photowall-wrapper">
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import PhotoWall from '@/components/views/PhotoWall';
  import ArticleListCell from '@/components/views/ArticleListCell';
  import SectionTitle from '@/components/views/SectionTitle';
  import TopicCard from '@/components/views/TopicCard';
  import ArticlePageHeader from '@/components/views/ArticlePageHeader';
  import ArticlePageContent from '@/components/views/ArticlePageContent';

  export default {
    data() {
      return {
        articles: [
          {
            'id': 1,
            'title': '被太阳晒过的风 第四十四章',
            'author': '子夜晨星',
            'publish_time': '2017/10/22 17:57:08',
            'desc': '-1-见了男朋友回来之后喝了一杯没怎么泡好的红糖水和一杯满满的白开水。去上了次厕所，然后坐在床上的时候开始咳嗽不止，去洗了把脸，恍然地瞥见镜子中的自己看起来并不...',
            'readings': '148',
            'comments': '2',
            'likes': '20'
          },
          {
            'id': 2,
            'title': '被太阳晒过的风 第四十四章',
            'author': '子夜晨星',
            'publish_time': '2017/10/22 17:57:08',
            'desc': '-1-见了男朋友回来之后喝了一杯没怎么泡好的红糖水和一杯满满的白开水。去上了次厕所，然后坐在床上的时候开始咳嗽不止，去洗了把脸，恍然地瞥见镜子中的自己看起来并不...',
            'readings': '148',
            'comments': '2',
            'likes': '20'
          },
          {
            'id': 3,
            'title': '被太阳晒过的风 第四十四章',
            'author': '子夜晨星',
            'publish_time': '2017/10/22 17:57:08',
            'desc': '-1-见了男朋友回来之后喝了一杯没怎么泡好的红糖水和一杯满满的白开水。去上了次厕所，然后坐在床上的时候开始咳嗽不止，去洗了把脸，恍然地瞥见镜子中的自己看起来并不...',
            'readings': '148',
            'comments': '2',
            'likes': '20'
          },
          {
            'id': 4,
            'title': '被太阳晒过的风 第四十四章',
            'author': '子夜晨星',
            'publish_time': '2017/10/22 17:57:08',
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
      'article-page-content': ArticlePageContent
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    .photowall-wrapper
      margin-top 20px
      @media only screen and (max-width: 1140px)
        margin-top 15px
      @media only screen and (max-width: 576px)
        margin-top 5px
</style>
