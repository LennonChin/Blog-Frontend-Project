<template>
  <div class="book-catalog">
    <ul class="book-toc-list">
      <li class="book-toc-list-item"><a href="#_1" class="book-toc-link node-name--H1 ">序言 真诚之心 丨 珍妮弗·霍曼斯</a>
      </li>
      <li class="book-toc-list-item"><a href="#_1" class="book-toc-link node-name--H1 ">第一部分 1989：我们的时代</a>
        <ul class="book-toc-list is-collapsible">
          <li class="book-toc-list-item"><a class="book-toc-link is-active-link">第1章 每况愈下</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第2章 欧洲幻梦</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第3章 罪行与过失</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第4章 “冷战”为何奏效</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第5章 自由与弗里多尼亚国</a></li>
        </ul>
      </li>
      <li class="book-toc-list-item"><a class="book-toc-link">第二部分 大屠杀和犹太人</a>
        <ul class="book-toc-list is-collapsible">
          <li class="book-toc-list-item"><a class="book-toc-link">第6章 此路不通</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第7章 另求他途</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第8章 游说团体非阴谋</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第9章 在战后欧洲谈“邪恶问题”</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第10章 “既成”虚构</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第11章 以色列须放弃民族神话</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第12章 没有陈词滥调的以色列</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第13章 还要做什么？</a></li>
        </ul>
      </li>
      <li class="book-toc-list-item"><a class="book-toc-link">第三部分 “9·11”事件和世界新秩序</a>
        <ul class="book-toc-list is-collapsible">
          <li class="book-toc-list-item"><a class="book-toc-link">第14章 论《鼠疫》</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第15章 美国最大的敌人是自己</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第16章 我们生活的方式</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第17章 海外的反美国主义</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第18章 世界新秩序 260</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第19章 联合国已穷途末路了吗？</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第20章 我们学到了什么？</a></li>
        </ul>
      </li>
      <li class="book-toc-list-item"><a class="book-toc-link">第四部分 我们如今的生活方式</a>
        <ul class="book-toc-list is-collapsible">
          <li class="book-toc-list-item"><a class="book-toc-link">第21章 铁路的荣光</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第22章 让火车回归！</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第23章 创新的破坏</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第24章 社会民主主义的生与死</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第25章 世代的平衡—与丹尼尔·朱特的对话</a></li>
        </ul>
      </li>
      <li class="book-toc-list-item"><a class="book-toc-link">第五部分 我们终有一死</a>
        <ul class="book-toc-list is-collapsible">
          <li class="book-toc-list-item"><a class="book-toc-link">第26章 弗朗索瓦·孚雷（1927—1997）</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第27章 阿莫斯·埃隆（1926—2009）</a></li>
          <li class="book-toc-list-item"><a class="book-toc-link">第28章 莱谢克·科拉科夫斯基（1927—2009）</a></li>
        </ul>
      </li>
      <li class="book-toc-list-item"><a class="book-toc-link">注释</a></li>
      <li class="book-toc-list-item"><a class="book-toc-link">历年发表的托尼·朱特文章与评论列表</a></li>
      <li class="book-toc-list-item"><a class="book-toc-link">索引</a></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

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
      padding-left 8px
    .book-toc-list-item
      a.book-toc-link
        height: 100%
        line-height 30px
        padding 5px 0
        color $color-gradually-gray-31
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


</style>
