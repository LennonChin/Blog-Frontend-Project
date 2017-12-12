/* eslint-disable */
var Toc = function Toc(id, options) {
  this.el = document.getElementById(id);
  if (!this.el) return;
  this.options = options || {};
  this.tocLevel = parseInt(options.level) || 0;
  this.tocClass = options['class'] || 'toc';
  this.tocTop = parseInt(options.top) || 0;
  this.elChilds = this.el.children;
  if (!this.elChilds.length) return;
  this._init();
};

Toc.prototype._init = function () {
  this._collectTitleElements();
  // this._createToc();
  this._createTocContent();
  this._showToc();
};

// 收集所有的H标签
Toc.prototype._collectTitleElements = function () {
  this._elTitlesNames = [];
  this.titleElements = [];
  for (var i = 1; i < 7; i++) {
    if (this.el.getElementsByTagName('h' + i).length) {
      this._elTitlesNames.push('h' + i);
    }
  }

  this._elTitlesNames.length = this._elTitlesNames.length > this.tocLevel ? this.tocLevel : this._elTitlesNames.length;

  for (var j = 0; j < this.elChilds.length; j++) {
    this._elChildName = this.elChilds[j].tagName.toLowerCase();
    if (this._elTitlesNames.toString().match(this._elChildName)) {
      this.titleElements.push(this.elChilds[j]);
    }
  }
};

Toc.prototype._createTocContent = function () {
  this._elTitleElementsLen = this.titleElements.length;
  if (!this._elTitleElementsLen) return;
  this.tocContent = '';
  this._tempLists = [];

  var url = location.origin + location.pathname;
  for (var i = 0; i < this._elTitleElementsLen; i++) {
    var j = i + 1;
    this._elTitleElement = this.titleElements[i];
    this._elTitleElementName = this._elTitleElement.tagName;
    this._elTitleElementText = this._elTitleElement.innerHTML;
    let elTitleElementId = this._elTitleElement.id;
    this.tocContent += '<li class="' + elTitleElementId + '"><a href="' + url + '#' + elTitleElementId + '">' + this._elTitleElementText + '</a>';

    if (j !== this._elTitleElementsLen) {
      this._elNextTitleElementName = this.titleElements[j].tagName;
      if (this._elTitleElementName !== this._elNextTitleElementName) {
        var checkColse = false;
        var y = 1;
        for (var t = this._tempLists.length - 1; t >= 0; t--) {
          if (this._tempLists[t].tagName === this._elNextTitleElementName) {
            checkColse = true;
            break;
          }
          y++;
        }

        if (checkColse) {
          this.tocContent += new Array(y + 1).join('</li></ul>');
          this._tempLists.length = this._tempLists.length - y;// 更新栈的长度。
        } else {
          this._tempLists.push(this._elTitleElement);
          this.tocContent += '<ul>';
        }
      } else {
        this.tocContent += '</li>';
      }
    } else {
      if (this._tempLists.length) {
        this.tocContent += new Array(this._tempLists.length + 1).join('</li></ul>');
      } else {
        this.tocContent += '</li>';
      }
    }
  }
  this.toc = document.createElement('ul');
  this.toc.setAttribute('class', this.tocClass);
  this.toc.innerHTML = this.tocContent;
};

Toc.prototype._createToc = function () {
  this.headers = this.titleElements;

  // 获取header的总个数
  let headersLength = this.headers.length;
  if (this.headersLength === 0) return;
  // var url = location.origin + location.pathname;

  // 最外层ul
  let containerUlNode = document.createElement('ul');
  containerUlNode.classList.add(this.tocClass);

  let lastestLevel = 0;
  let lastestLiNode = null;

  for (let currentIndex = 0; currentIndex < headersLength; currentIndex++) {

    let currentHeader = this.headers[currentIndex];
    let currentHeaderText = currentHeader.innerHTML;
    // 当前header的级别
    let currentHeaderLevel = parseInt(currentHeader.tagName.toLowerCase().charAt(1));

    if (currentHeaderLevel === lastestLevel) {
      // 当前级别与上一个相等,用上一个li的父元素添加当前li
      if (lastestLiNode) {
        let liNode = document.createElement('li');
        let aNode = document.createElement('a');
        aNode.innerHTML = currentHeaderText;
        lastestLiNode.parentNode.appendChild(liNode);
        // 记录最后一个li
        lastestLiNode = liNode;
      }
    }

    if (currentHeaderLevel > lastestLevel) {
      // 当前级别比上一个小
      // 如果只隔了一个级别,比如之前为h3,现在为h4,先查询上一个li中有没有ul
      if (currentHeaderLevel - lastestLevel === 1) {
        if (!lastestLiNode) {
          // 第一个创建的li
          let liNode = document.createElement('li');
          containerUlNode.appendChild(liNode);
          // 记录最后一个li
          lastestLiNode = liNode;
        }
        if (lastestLiNode.childNodes.length > 0 && lastestLiNode.childNodes[lastestLiNode.childNodes.length - 1].tagName.toLowerCase() === 'ul') {
          // 如果有就用该ul添加
          let liNode = document.createElement('li');
          let aNode = document.createElement('a');
          aNode.innerHTML = currentHeaderText;
          lastestLiNode.childNodes[lastestLiNode.childNodes.length - 1].appendChild(liNode);
          // 记录最后一个li
          lastestLiNode = liNode;
        } else {
          // 如果没有有就新增ul并添加
          let ulNode = document.createElement('ul');
          lastestLiNode.appendChild(ulNode);
          let liNode = document.createElement('li');
          let aNode = document.createElement('a');
          aNode.innerHTML = currentHeaderText;
          ulNode.appendChild(liNode);
          // 记录最后一个li
          lastestLiNode = liNode;
        }
      }

      // 如果只隔了多个级别,比如之前为h3,现在为h6,则遍历构建
      if (currentHeaderLevel - lastestLevel > 1) {

      }
    }

    if (currentHeaderLevel < lastestLevel) {
      // 当前级别比上一个小,比如之前为h5,现在为h2
    }

    lastestLevel = currentHeaderLevel;
  }
  console.log(containerUlNode);
};

Toc.prototype._showToc = function () {
  if (!this.options.targetId) {
    // 没有传入目标id，追加到生成目录的div内
    this.el.appendChild(this.toc);
  } else {
    // 有传入目标id，直接在目标id内生成div
    document.getElementById(this.options.targetId).appendChild(this.toc);
  }
};

export default Toc;
