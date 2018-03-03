# 前后端分离的博客项目-前端工程

> [English description](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/README.md)

> 该仓库存放了博客项目的前端代码，使用Vue.js搭建。

> 注1：当前Master分支已开始与后端进行数据联调，测试数据完整版本可以查看该版本：[6a10ff2](https://github.com/LennonChin/Blog-Frontend-Project/tree/6a10ff207e413c02d7e5eb810409144a65450e27)

> 注2：与该仓库配合的后端代码仓库链接在此[BlogBackendProject](https://github.com/LennonChin/BlogBackendProject)，后端代码使用Django + Xadmin + Django Rest Framework实现。

博客已上线，欢迎浏览：[https://blog.coderap.com/](https://blog.coderap.com/)

前端效果展示：

![首页](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/static/exhibition/frontend1.png)

![文章页](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/static/exhibition/frontend2.png)

![时间轴](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/static/exhibition/frontend3.png)

![文章详情页](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/static/exhibition/frontend4.png)

![评论区域](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/static/exhibition/frontend5.png)

![读书页](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/static/exhibition/frontend6.png)

## 整体技术栈

- [Vue.js ^2.5.6](https://github.com/vuejs/vue)
- [Vue-Router ^3.0.1](https://github.com/vuejs/vue-router)
- [Axios ^0.17.1](https://github.com/axios/axios)
- [iView UI ^2.7.3](https://github.com/iview/iview)
- [MavonEditor ^2.3.1](https://github.com/hinesboy/mavonEditor)
- [Tocbot ^4.0.0](https://github.com/tscanlin/tocbot)
- [Highlight.js ^9.12.0](https://github.com/isagalaev/highlight.js)
- [vue-awesome-swiper ^3.0.6](https://github.com/surmon-china/vue-awesome-swiper)

## 已实现的基本功能

目前已经开发了17个页面，基本满足常规博客需要。页面如下：

- 首页，路由`/`
- 文章首页，路由`/artices`
- 图集首页，路由`/albums`
- 电影首页，路由`/movies`
- 阅读首页，路由`/readings`
- 文章列表页，路由`/articles/category/:id`
- 图集列表页，路由`/albums/category/:id`
- 电影列表页，路由`/movies/category/:id`
- 阅读列表页，路由`/readings/category/:id`
- 书籍列表页，路由`/books/category/:id`
- 书籍笔记列表页，路由`/book/notes/category/:id`
- 文章详情页，路由`/article/:id`
- 图集浏览页，路由`/album/:id`
- 电影详情页，路由`/movie/:id`
- 书籍详情页，路由`/book/:id`
- 书籍笔记详情页，路由`/book/note/:id`
- 时间轴页，路由`/timeline`

目前普通页面的展示功能基本开发完成，需要接下来的测试以验证细节和Bug；文章详情页面已实现代码高亮、目录、评论等功能。

> 注：代码高亮使用了`Highlight.js`插件，并且为了减少打包体积定制了插件的JS包，定制插件存放在`./src/common/js/highlight.pack.js`，如有其他高亮需要请自行定制插件，[定制教程在此](http://highlightjs.readthedocs.io/en/latest/building-testing.html)

## 接下来将实现

1. 将考虑实现SSR服务端渲染。由于目前后端使用的Django Rest Framework，SSR的支持可能推后。
2. 接入GitHub、微信、微博、Facebook等第三方登录评论。
3. 前端页面Markdown编辑器接入七牛云存储以存放图片。（已完成）
4. 优化图集详情的展示效果。
5. 优化打包体积。

## 如何使用

1. clone本项目；
2. 安装node环境；
3. 在项目根目录下执行以下命令安装依赖：

``` bash
# install dependencies
npm install
```

4. 接下来，需要对项目做一定的后端支持配置：

> 注：你可以选择浏览该离线版本：[6a10ff2](https://github.com/LennonChin/Blog-Frontend-Project/tree/6a10ff207e413c02d7e5eb810409144a65450e27)，该版本虽然不完整，但展示了最基本的页面，所有数据皆为本地测试数据。

本项目后端使用Django + Xadmin + Django Rest Framework，代码仓库位于[BlogBackendProject](https://github.com/LennonChin/BlogBackendProject)，你需要按照该仓库代码进行线上配置；配置完后，请在本项目的`./src/api/api.js`文字中根据您的后端环境配置后端接口如下：

```javascript
// host：你的后端服务器地址
// port：你的后端服务器端口
// path：自定义路径
let localHost = 'http://host:port/path';
```

5. 以上配置完成后，运行以下命令进入开发环境：

```shell
# serve with hot reload at localhost:8080
npm run dev
```

或运行以下命令进行打包：

```shell
# build for production with minification
npm run build
```

## License

[Apache-2.0](https://opensource.org/licenses/Apache-2.0)

Copyright (c) 2016-present, LennonChin

