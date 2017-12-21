<template>
  <div class="timeline-header">
    <classify-menu></classify-menu>
    <section-title :mainTitle="'存档时光'"
                   :subTitle="'Timeline'"
                   :menus="[{title: '最新', method: 'new'}, {title: '评论最多', method: 'mostComment'}, {title: '推荐', method: 'recommend'}]"
                   :withRefresh="true"
                   :withTimeSelect="true"
                   @titleControl="titleControl">
    </section-title>
  </div>
</template>

<script type="text/ecmascript-6">
  import SectionTitle from '@/components/views/SectionTitle/SectionTitle';
  import ClassifyMenu from '@/components/views/Classify/ClassifyMenu';

  export default {
    methods: {
      titleControl(params) {
        console.log(params);
      }
    },
    components: {
      'section-title': SectionTitle,
      'classify-menu': ClassifyMenu
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
