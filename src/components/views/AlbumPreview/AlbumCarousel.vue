<template>
  <div class="album-carousel">
    <span id="prevTop" class="btn prev" @click="prev" @onmouseover="onmouseover" @onmouseout="onmouseout"></span>
    <span id="nextTop" class="btn next" @click="next" @onmouseover="onmouseover" @onmouseout="onmouseout"></span>
    <div class="preview-box">
      <div id="picBox" class="picBox">
        <ul ref="picBox">
          <li>
            <a href="#" target="_blank">
              <img src="../../../assets/photowall/photowall_pic_1.jpg">
            </a>
          <li>
            <a href="#" target="_blank">
              <img src="../../../assets/photowall/photowall_pic_2.jpg">
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img src="../../../assets/photowall/photowall_pic_3.jpg">
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img src="../../../assets/photowall/photowall_pic_4.jpg">
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img src="../../../assets/photowall/photowall_pic_5.jpg">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="thumb-box">
      <span id="prev" class="btn prev" @click="prev" @onmouseover="onmouseover" @onmouseout="onmouseout"></span>
      <span id="next" class="btn next" @click="next" @onmouseover="onmouseover" @onmouseout="onmouseout"></span>
      <div id="listBox" class="listBox">
        <ul ref="listBox">
          <li class="on"><img src="../../../assets/photowall/photowall_pic_1.jpg"></li>
          <li><img src="../../../assets/photowall/photowall_pic_2.jpg"></li>
          <li><img src="../../../assets/photowall/photowall_pic_3.jpg"></li>
          <li><img src="../../../assets/photowall/photowall_pic_4.jpg"></li>
          <li><img src="../../../assets/photowall/photowall_pic_5.jpg"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        index: 0,
        timer: setInterval(this.autoPlay, 4000),
        picBox: null,
        listBox: null
      };
    },
    methods: {
      prev() {
        this.index--;
        this.index = this.index === -1 ? this.len2 - 1 : this.index;
        this.Change();
      },
      next() {
        this.index++;
        this.index = this.index === this.len2 ? 0 : this.index;
        this.Change();
      },
      onmouseover() {
        clearInterval(this.timer);
      },
      onmouseout() {
        this.timer = setInterval(this.autoPlay, 4000);
      },
      G(s) {
        return document.getElementById(s);
      },
      getStyle(obj, attr) {
        if (obj.currentStyle) {
          return obj.currentStyle[attr];
        } else {
          return getComputedStyle(obj, false)[attr];
        }
      },
      Animate(el, options) {
        if (el.timer) {
          clearInterval(el.timer);
        }
        let that = this;
        el.timer = setInterval(function () {
          for (let attr in options) {
            let iCur = parseInt(that.getStyle(el, attr));
            if (!iCur) iCur = 0;
            let iSpeed = (options[attr] - iCur) / 5;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            el.style[attr] = iCur + iSpeed + 'px';
            if (iCur === options[attr]) {
              clearInterval(el.timer);
            }
          }
        }, 30);
      },
      Change() {
        // 获取两个ul

        let num = 5;
        let num2 = Math.ceil(num / 2);

        this.Animate(this.picBox.el, {
          left: -this.index * this.picBox.liWidth
        });

        if (this.index < num2) {
          this.Animate(this.listBox.el, {
            left: 0
          });
        } else if (this.index + num2 <= this.listBox.lis.length) {
          this.Animate(this.listBox.el, {
            left: -(this.index - num2 + 1) * this.listBox.liWidth
          });
        } else {
          this.Animate(this.listBox.el, {
            left: -(this.listBox.lis.length - num) * this.listBox.liWidth
          });
        }

        for (let i = 0; i < this.listBox.lis.length; i++) {
          this.listBox.lis[i].className = '';
          if (i === this.index) {
            this.listBox.lis[i].className = 'on';
          }
        }
      },
      autoPlay() {
        this.index++;
        this.index = this.index === this.listBox.lis.length ? 0 : this.index;
        this.Change();
      },
      initPreview() {
        // 初始化一些值
        this.picBox = {};
        this.picBox.el = this.$refs.picBox;
        this.picBox.lis = this.picBox.el.getElementsByTagName('li');
        this.picBox.liWidth = this.picBox.lis[0].offsetWidth;

        this.listBox = {};
        this.listBox.el = this.$refs.listBox;
        this.listBox.lis = this.listBox.el.getElementsByTagName('li');
        this.listBox.liWidth = this.listBox.lis[0].offsetWidth;

        // 宽度
        this.picBox.el.style.width = this.picBox.lis.length * this.picBox.liWidth + 'px';
        this.listBox.el.style.width = this.listBox.lis.length * this.listBox.liWidth + 'px';

        var that = this;
        Object.keys(this.picBox.lis).forEach(function (key) {
          that.picBox.lis[key].style.width = that.picBox.liWidth + 'px';
        });

        console.log(this.picBox.lis[0].offsetWidth);
        console.log(this.listBox.lis[0].offsetWidth);

        for (let i = 0; i < this.listBox.liCount; i++) {
          this.listBox.lis[i].index = i;
          let that = this;
          this.listBox.lis[i].onclick = function () {
            that.index = this.index;
            this.Change();
          };
        }
      }
    },
    mounted() {
      this.initPreview();
    }
  };
</script>`

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .album-carousel
    position: relative
    width: 100%
    margin: 15px auto 0
    background #000
    #prevTop, #nextTop
      display: none
    .preview-box
      width: 100%;
      height: 600px
      .picBox
        position: relative;
        width: 100%;
        height: 100%
        overflow: hidden;
        ul
          width 100%;
          height: 100%;
          li
            position: relative;
            float: left;
            width: 100%;
            height: 100%
            a
              display: block;
              width: 100%;
              height: 100%
              text-align: center;
              img
                max-height: 100%;
                max-width: 100%;
                vertical-align: middle;
    .thumb-box
      width: 100%;
      height: 120px;
      margin-top: 12px;
      position: relative;
      #prev
        position: absolute;
        height: 48px;
        width: 24px;
        left: 11px;
        top: 35px;
        background: url(../../../assets/photowall/prevBtn.png) no-repeat;
        cursor: pointer;
        z-index: 99;
      #next
        position: absolute;
        height: 48px;
        width: 25px;
        top: 35px;
        right: 11px;
        background: url(../../../assets/photowall/nextBtn.png) no-repeat;
        cursor: pointer;
        z-index: 99;
      .listBox
        position: relative;
        width: 100%
        height: 100%;
        padding 5px
        overflow: hidden;
        ul
          width 100%
          height: 100%;
          li
            float left
            width: 140px;
            height: 100%;
            cursor: pointer;
            padding 2px
            img
              border 1px solid #000;
              width: 100%;
              height: 100%;
            &.on
              img
                border 1px solid #fff;
                width: 100%;
                height: 100%;
              i
                display: block;
</style>
