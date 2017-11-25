<template>
  <div class="article-list-header">
    <classify-bar></classify-bar>
    <section-title :mainTitle="'文章列表'" :subTitle="'Articles'"></section-title>
  </div>
</template>

<script type="text/ecmascript-6">
  import SectionTitle from '@/components/views/SectionTitle';
  import ClassifyBar from '@/components/views/Classify/ClassifyBar';

  export default {
    components: {
      'section-title': SectionTitle,
      'classify-bar': ClassifyBar
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
