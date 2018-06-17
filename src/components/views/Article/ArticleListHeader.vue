<template>
  <div class="article-list-header">
    <classify-menu @selectCategory="selectCategory"></classify-menu>
    <section-title :mainTitle="$t('article.typeName') + $t('others.list')" :subTitle="'Articles'"></section-title>
  </div>
</template>

<script type="text/ecmascript-6">
  import SectionTitle from '@/components/views/SectionTitle/SectionTitle';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';

  export default {
    name: 'article-list-header',
    methods: {
      selectCategory(categoryId) {
        this.$emit('selectCategory', categoryId);
      }
    },
    components: {
      'section-title': SectionTitle,
      'classify-menu': ClassifyMenu
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">

</style>
