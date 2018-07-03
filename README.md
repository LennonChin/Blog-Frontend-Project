# Front and back end of the separation of the blog project - front-end project

> Supported SSR Now.

Blog has been online ，welcome to browse：[https://blog.coderap.com/](https://blog.coderap.com/)

> [中文版说明](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/README_zh-cn.md)

> The warehouse holds the front end code for the blog project, built using Vue.js.

> Note 1: The current Master branch has begun data interworking with the backend. The full version of the test data can be viewed in this version: [6a10ff2](https://github.com/LennonChin/Blog-Frontend-Project/tree/6a10ff207e413c02d7e5eb810409144a65450e27)

> Note 2: The backend code repository linked with this repository is linked here [BlogBackendProject](https://github.com/LennonChin/BlogBackendProject) and the backend code is implemented using Django + Xadmin + Django Rest Framework.

## Front effect display

### PC Platform

![Home Page](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/readme/exhibition/PC_1.gif)

![Article Page](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/readme/exhibition/PC_2.gif)

![Article List Page](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/readme/exhibition/PC_3.gif)

![Timeline](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/readme/exhibition/PC_4.gif)

### Mobile Platform

![Mobile effect](https://github.com/LennonChin/Blog-Frontend-Project/blob/master/readme/exhibition/MOBILE_1.png)

## The overall technology stack

- [Vue.js ^2.5.6](https://github.com/vuejs/vue)
- [Vue-Router ^3.0.1](https://github.com/vuejs/vue-router)
- [Vuex ^3.0.1](https://github.com/vuejs/vuex)
- [Axios ^0.17.1](https://github.com/axios/axios)
- [iView UI ^2.14.2](https://github.com/iview/iview)
- [MavonEditor ^2.4.16](https://github.com/hinesboy/mavonEditor)
- [Tocbot ^4.1.1](https://github.com/tscanlin/tocbot)
- [vue-i18n ^8.0.0](https://github.com/kazupon/vue-i18n)
- [vue-awesome-swiper ^3.1.2](https://github.com/surmon-china/vue-awesome-swiper)

## Achieved basic functions

Has now developed 17 pages, basically meet the needs of conventional blog. The page is as follows:

- Homepage, Routing`/`
- Article Home, Routing`/artices`
- Gallery Homepage, Routing`/albums`
- Movie Homepage, routing`/movies`
- Reading Homepage, routing`/readings`
- Article List page, route`/articles/category/:id`
- Album list page, route`/albums/category/:id`
- Movie list page, route`/movies/category/:id`
- Reading list page, route`/readings/category/:id`
- Book list page, route`/books/category/:id`
- Book note list page, route`/book/notes/category/:id`
- Article details page, route`/article/:id`
- Album browsing page, routing`/album/:id`
- Movie details page, route`/movie/:id`
- Book details page, route`/book/:id`
- Book note details page, route`/book/note/:id`
- Timeline page, route`/timeline`

At present, the development of ordinary pages basically completed the development, the need for the next test to verify the details and Bug; article details page has achieved code highlighting, catalogs, reviews and other functions.

> Note: ~~The code highlighting `Highlight.js` plug-in, and in order to reduce the packaging volume customize the plug-in JS package, custom plug-ins stored in`./src/common/js/highlight.pack.js`, if you need other highlights please Custom plug-ins, [custom tutorials here](http://highlightjs.readthedocs.io/en/latest/building-testing.html)~~. Now I removed highlight.js, replaced by using Pygments at backend, to improved render effect at frontend.

## The next will be achieved

- [x]  Will consider implementing SSR server rendering. ~~Due to the current backend Django Rest Framework, SSR support may be postponed. SSR support for some necessary pages is developing now.~~SSR can already work now.
- [ ]  Access GitHub, WeChat, Weibo, Facebook and other third-party login comments.
- [x] front-end page Markdown editor access Qiniu Cloud Storage to store pictures. (Completed)
- [ ]  Optimize the details of the gallery display.
- [ ]  Optimize packaging volume.

## How to use

1. Clone this project
2. Install the node environment
3. In the project root directory, execute the following command to install the dependencies:

```shell
# install dependencies
npm install
```

4. Next, you need to do some backend support for the project configuration:

> Note: You can choose to browse the offline version: [6a10ff2](https://github.com/LennonChin/Blog-Frontend-Project/tree/6a10ff207e413c02d7e5eb810409144a65450e27), this version is not complete, but shows the most basic page, all the data are local test data.

The backend of this project uses Django + Xadmin + Django Rest Framework. The code repository is located at [BlogBackendProject](https://github.com/LennonChin/BlogBackendProject). You need to configure it online according to the repository code. After configuring, please refer to the `./src/api/client-api.js` and `./src/api/client-api.js` files in this project your interface configurations of both client environment and SSR environment, my configurations as follows:

```javascript
// client-api.js
const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'https://localhost:8000/api/' : 'https://blog.coderap.com/api/'
});

// server-api.js
const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'https://localhost:8000/api/' : 'http://localhost/api/'
});
```

5. After the above configuration is completed, run the following command to enter the development environment:

```shell
# serve with hot reload at localhost: 9999
npm run dev
```

Or run the following command to package:

```shell
# build for production with minification
npm run build
```

## License

[Apache-2.0](https://opensource.org/licenses/Apache-2.0)

Copyright (c) 2016-present, LennonChin