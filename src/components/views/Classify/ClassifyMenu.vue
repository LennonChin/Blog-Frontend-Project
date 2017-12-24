<template>
  <div class="classify-bar" v-if="categorys !== undefined">
    <p class="level level-one">
      <span class="title">方向：</span>
      <span class="class">
        <a class="active" data-level="1" @click="choseLevel(categorys[0].parent_category, $event)">全部</a>
        <a class="name" :id="'id' + category_level1.id" :data-level="category_level1.category_type"
           @click="choseLevel(category_level1, $event)"
           v-for="category_level1 in this.categorys" :key="category_level1.id">{{ category_level1.name }}</a>
      </span>
    </p>
    <p class="level level-two" v-if="sub_category !== undefined">
      <span class="title">分类：</span>
      <span class="class">
        <a class="active" data-level="2" @click="choseLevel(sub_category[0].parent_category, $event)">全部</a>
        <a class="name" :id="'id' + category_level2.id" :data-level="category_level2.category_type"
           @click="choseLevel(category_level2, $event)"
           v-for="category_level2 in this.sub_category" :key="category_level2.id">{{ category_level2.name }}</a>
      </span>
    </p>
    <p class="level level-three" v-if="sub_sub_category !== undefined">
      <span class="title">类型：</span>
      <span class="class">
        <a class="active" data-level="3" @click="choseLevel(sub_sub_category[0].parent_category, $event)">全部</a>
        <a class="name" :id="'id' + category_level3.id" :data-level="category_level3.category_type"
           @click="choseLevel(category_level3, $event)"
           v-for="category_level3 in this.sub_sub_category" :key="category_level3.id">{{ category_level3.name }}</a>
      </span>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCategorys} from '@/api/api';

  export default {
    props: {
      defaultCategory: {
        Type: Number,
        default: null
      }
    },
    data() {
      return {
        categorys: undefined,
        sub_category: undefined,
        sub_sub_category: undefined,
        selected_category: undefined,
        selected_recursive_categorys: []
      };
    },
    created() {
      this.getDatas();
    },
    updated() {
      // 更新样式
      this.selected_recursive_categorys.map((id) => {
        let target = document.getElementById('id' + id);
        let pNode = target.parentNode;
        let activeNode = pNode.querySelector('.active');
        if (activeNode) {
          activeNode.classList.remove('active');
        }
        target.classList.add('active');
      });
      // 清除数据，避免与原有的点击事件造成冲突
      this.selected_recursive_categorys = [];
    },
    methods: {
      choseLevel(category, event) {
        // 更新子菜单
        let level = parseInt(event.target.dataset.level);
        if (category instanceof Object) {
          this.selectCategory(category.id);
          if (level > 0) {
            // 选择了某个类别
            if (category.sub_category && category.sub_category.length > 0) {
              if (level === 1) {
                this.sub_category = category.sub_category;
                this.sub_sub_category = undefined;
              } else if (level === 2) {
                this.sub_sub_category = category.sub_category;
              }
            } else {
              // 点击了全部
              if (level === 1) {
                this.sub_category = undefined;
                this.sub_sub_category = undefined;
              } else if (level === 2) {
                this.sub_sub_category = undefined;
              }
            }
          }
        } else {
          // 选择了第一级的全部
          if (level === 1) {
            this.sub_category = undefined;
            this.sub_sub_category = undefined;
          } else if (level === 2) {
            this.sub_sub_category = undefined;
          }
          this.selectCategory(category);
        }
        // 更新样式
        let pNode = event.target.parentNode;
        let activeNode = pNode.querySelector('.active');
        if (activeNode) {
          activeNode.classList.remove('active');
        }
        event.target.classList.add('active');
      },
      setDefaultCategory(categoryId) {
        let recursiveCategorys = [];
        let recursiveCategoryIds = [];
        if (categoryId === null || categoryId === undefined) return;
        var recursiveCategory = function (categorys, selectCategoryId) {
          for (let index = 0; index < categorys.length; index++) {
            let category = categorys[index];
            if (category.id === selectCategoryId) {
              recursiveCategorys.push(category);
              recursiveCategoryIds.push(category.id);
              return category;
            } else if (category.sub_category && category.sub_category.length > 0) {
              let result = recursiveCategory(category.sub_category, selectCategoryId);
              if (result) {
                recursiveCategorys.push(category);
                recursiveCategoryIds.push(category.id);
                return result;
              }
            }
          }
        };
        this.selected_category = recursiveCategory(this.categorys, categoryId);
        recursiveCategorys = recursiveCategorys.reverse();
        recursiveCategoryIds = recursiveCategoryIds.reverse();
        if (recursiveCategorys[0]) this.sub_category = recursiveCategorys[0].sub_category;
        if (recursiveCategorys[1]) this.sub_sub_category = recursiveCategorys[1].sub_category;
        this.selected_recursive_categorys = recursiveCategoryIds;
      },
      selectCategory(categoryId) {
        this.$emit('selectCategory', categoryId);
      },
      getDatas() {
        getCategorys({
          params: {
            'level_min': 1,
            'level_max': 1
          }
        }).then((response) => {
          this.categorys = response.data;
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    watch: {
      categorys: function (newCategorys) {
        if (newCategorys) {
          this.setDefaultCategory(this.defaultCategory);
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/index.styl";
  @import "../../../common/stylus/theme.styl";

  .classify-bar
    .level
      display flex
      padding 15px 0
      font-size 15px
      line-height 22px
      border-bottom 1px solid $color-border
      .title
        display inline-block
        flex 0 0 60px
        width 60px
        font-size 17px
        line-height 22px
        padding 4px 0
        font-weight 700
      .class
        a
          display inline-block
          margin-right 4px
          padding 3px 8px
          margin-bottom 2px
          font-weight 100
          border-radius $border-radius
          color $color-gradually-gray-31
          &.name
            &:hover
              color $color-main-primary
          &.active
            color $color-gradually-gray-101
            background $color-gradually-gray-31


</style>
