<template>
  <div class="timeline-header">
    <classify-menu></classify-menu>
    <section-title :mainTitle="'存档时光'"
                   :subTitle="'Timeline'"
                   :menus="menus"
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
    data() {
      return {
        menus: [
          {title: '顺序', selectedTitle: '逆序', selected: true, method: 'sorted'},
          {title: '评论最多', selected: false, method: 'mostComment'},
          {title: '推荐', selected: false, method: 'recommend'}
        ]
      };
    },
    methods: {
      titleControl(params) {
        this.$emit('titleControl', params);
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
