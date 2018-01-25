<template>
  <div class="book-catalog" :class="{'open': showMoreToc}">
    <ul class="book-toc-list">
      <li class="book-toc-list-item">
        <a class="book-toc-link">
          <iv-tool-tip placement="right" :content="'已读'">
            <iv-icon type="android-checkbox-outline"></iv-icon>
          </iv-tool-tip>
          序言 真诚之心 丨 珍妮弗·霍曼斯
        </a>
      </li>
      <li class="book-toc-list-item">
        <a class="book-toc-link">
          <iv-tool-tip placement="right" :content="'已读'">
            <span><iv-icon type="android-checkbox-outline"></iv-icon></span>
          </iv-tool-tip>
          第一部分 1989：我们的时代
          <iv-tool-tip placement="right" :content="'笔记已完成'">
            <iv-icon type="ios-compose"></iv-icon>
          </iv-tool-tip>
        </a>
        <ul class="book-toc-list is-collapsible">
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'已读'">
                <iv-icon type="android-checkbox-outline"></iv-icon>
              </iv-tool-tip>
              第1章 每况愈下
              <iv-tool-tip placement="right" :content="'笔记已完成'">
                <iv-icon type="ios-compose"></iv-icon>
              </iv-tool-tip>
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'已读'">
                <iv-icon type="android-checkbox-outline"></iv-icon>
              </iv-tool-tip>
              第2章 欧洲幻梦
              <iv-tool-tip placement="right" :content="'笔记已完成'">
                <iv-icon type="ios-compose"></iv-icon>
              </iv-tool-tip>
            </a>
          </li>
          <li class="book-toc-list-item"><a class="book-toc-link">
            <iv-tool-tip placement="right" :content="'已读'">
              <iv-icon type="android-checkbox-outline"></iv-icon>
            </iv-tool-tip>
            第3章 罪行与过失
          </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'已读'">
                <iv-icon type="android-checkbox-outline"></iv-icon>
              </iv-tool-tip>
              第4章 “冷战”为何奏效
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'已读'">
                <iv-icon type="android-checkbox-outline"></iv-icon>
              </iv-tool-tip>
              第5章 自由与弗里多尼亚国
            </a>
          </li>
        </ul>
      </li>
      <li class="book-toc-list-item"><a class="book-toc-link">
        <iv-tool-tip placement="right" :content="'未读'">
          <iv-tool-tip placement="right" :content="'未读'">
            <iv-icon type="android-checkbox-outline-blank"></iv-icon>
          </iv-tool-tip>
        </iv-tool-tip>
        第二部分 大屠杀和犹太人
      </a>
        <ul class="book-toc-list is-collapsible">
          <li class="book-toc-list-item">
            <a class="book-toc-link is-active-link">
              <iv-tool-tip placement="right" :content="'正在读'">
                <iv-icon type="play"></iv-icon>
              </iv-tool-tip>
              第6章 此路不通
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第7章 另求他途
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第8章 游说团体非阴谋
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第9章 在战后欧洲谈“邪恶问题”
            </a>
          </li>
        </ul>
      </li>
      <li class="book-toc-list-item">
        <a class="book-toc-link">
          <iv-tool-tip placement="right" :content="'未读'">
            <iv-icon type="android-checkbox-outline-blank"></iv-icon>
          </iv-tool-tip>
          第三部分 “9·11”事件和世界新秩序
        </a>
        <ul class="book-toc-list is-collapsible">
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第14章 论《鼠疫》
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第15章 美国最大的敌人是自己
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第16章 我们生活的方式
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第17章 海外的反美国主义
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第18章 世界新秩序 260
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第19章 联合国已穷途末路了吗？
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第20章 我们学到了什么？
            </a>
          </li>
        </ul>
      </li>
      <li class="book-toc-list-item">
        <a class="book-toc-link">
          <iv-tool-tip placement="right" :content="'未读'">
            <iv-icon type="android-checkbox-outline-blank"></iv-icon>
          </iv-tool-tip>
          第四部分 我们如今的生活方式
        </a>
        <ul class="book-toc-list is-collapsible">
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第21章 铁路的荣光
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第22章 让火车回归！
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第23章 创新的破坏
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第24章 社会民主主义的生与死
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第25章 世代的平衡—与丹尼尔·朱特的对话
            </a>
          </li>
        </ul>
      </li>
      <li class="book-toc-list-item">
        <a class="book-toc-link">
          <iv-tool-tip placement="right" :content="'未读'">
            <iv-icon type="android-checkbox-outline-blank"></iv-icon>
          </iv-tool-tip>
          第五部分 我们终有一死</a>
        <ul class="book-toc-list is-collapsible">
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第26章 弗朗索瓦·孚雷（1927—1997）
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第27章 阿莫斯·埃隆（1926—2009）
            </a>
          </li>
          <li class="book-toc-list-item">
            <a class="book-toc-link">
              <iv-tool-tip placement="right" :content="'未读'">
                <iv-icon type="android-checkbox-outline-blank"></iv-icon>
              </iv-tool-tip>
              第28章 莱谢克·科拉科夫斯基（1927—2009）
            </a>
          </li>
        </ul>
      </li>
      <li class="book-toc-list-item">
        <a class="book-toc-link">
          <iv-tool-tip placement="right" :content="'未读'">
            <iv-icon type="android-checkbox-outline-blank"></iv-icon>
          </iv-tool-tip>
          注释
        </a>
      </li>
      <li class="book-toc-list-item">
        <a class="book-toc-link">
          <iv-tool-tip placement="right" :content="'未读'">
            <iv-icon type="android-checkbox-outline-blank"></iv-icon>
          </iv-tool-tip>
          历年发表的托尼·朱特文章与评论列表
        </a>
      </li>
      <li class="book-toc-list-item">
        <a class="book-toc-link">
          <iv-tool-tip placement="right" :content="'未读'">
            <iv-icon type="android-checkbox-outline-blank"></iv-icon>
          </iv-tool-tip>
          索引
        </a>
      </li>
    </ul>
    <a class="toggle-more" @click="openToc" v-if="showToggleMoreMenu">
      <span style="z-index: 10;">
        {{ showMoreToc ? '收起目录' : '展开查看所有目录' }}
        <iv-icon :type="showMoreToc ? 'chevron-up' : 'chevron-down'"></iv-icon>
      </span>
      <div class="mask" style="z-index: 9;"></div>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        showMoreToc: false,
        showToggleMoreMenu: false
      };
    },
    mounted() {
      this.$nextTick(() => {
        let toc = document.querySelector('.book-catalog ul');
        if (toc && toc.clientHeight >= 360) {
          console.log(toc.clientHeight);
          this.showToggleMoreMenu = true;
        } else {
          this.showToggleMoreMenu = false;
        }
      });
    },
    methods: {
      openToc() {
        this.showMoreToc = !this.showMoreToc;
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .book-catalog
    li
      list-style: none
    .book-toc-list
      margin: 0;
      padding-left: 25px
      overflow-y: hidden
    > .book-toc-list
      max-height 360px
      padding-left 8px
    .book-toc-list-item
      a.book-toc-link
        height: 100%
        line-height 30px
        padding 5px 0
        color $color-gradually-gray-31
        i
          font-size 16px
        &.is-active-link
          font-weight: 700
          color $color-main-primary
        &:hover
          color $color-main-primary
    &.is-collapsible
      max-height: 1000px;
      overflow: hidden;
      transition: all 300ms ease-in-out
    &.is-collapsed
      max-height: 0
    .toggle-more
      position relative
      display block
      color $color-main-primary
      background-color transparent
      margin-top -40px
      padding 60px 0 10px
      text-align center
      span
        position relative
      .mask
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        opacity 1
        background-image linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1));
  &.open
    > .book-toc-list
      max-height inherit
      overflow hidden
      transition all 300ms ease-in-out
    .toggle-more
      .mask
        opacity 0
</style>
