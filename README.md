# 

> ##### 技术选型：
> ##### 实现效果：

## 写在前面

-
  
## 线上预览


  [https://m](https://m)


## 主要功能

 **博客前端** 
- [x] 
**Koa服务端** 
- [x] 
**后台系统（代码未上传）**
- [x] 

## 技术栈
- [x] 

## 本地预览

  **下载** 

    git clone https://github.com/



## 项目截图

![截图](http://img.xmdeal.com/d/file/p/2018/11-23/1e3ddfd5d027e4084f2bf640f6455152.jpg "cv.png")

![截图](http://img.xmdeal.com/d/file/p/2018/11-23/47d96d9c701233442f105851564c9f4b.jpg "artical.png")

![截图](http://img.xmdeal.com/d/file/p/2018/11-23/13da6db977855da93f49e391911e7794.jpg "comment.png")

## 文件结构

```
BLOG
│  .babelrc
│  .gitignore
│  package-lock.json
│  package.json
│  README.en.md
│  README.md
│  tsconfig.json
│  yarn.lock
│  
├─config
│  │  env.js
│  │  paths.js
│  │  webpack.config.js
│  │  webpackDevServer.config.js
│  │  
│  └─jest
│          cssTransform.js
│          fileTransform.js
│                
├─public
│  │    favicon.ico
│  │    index.html
│  │    manifest.json
│  └─uploads
│      
├─scripts
│      build.js
│      start.js
│      test.js
│
├─server
│  ├─db
│  ├─routers
│  ├─utils
│  └─www
│      ├─static
│      │  ├─css
│      │  ├─js
│      │  └─media
│      └─uploads      
└─src
    │  bg.jpg
    │  declare_modules.d.ts
    │  font.less
    │  index.less
    │  index.tsx
    │  react-app-env.d.ts
    │  serviceWorker.ts
    │  
    ├─api
    │      api.js
    │      
    ├─components
    │  ├─Bjq
    │  │  │  bjq.less
    │  │  │  Bjq.tsx
    │  │  │  
    │  │  ├─CommentList
    │  │  │      commentlist.less
    │  │  │      CommentList.tsx
    │  │  │      
    │  │  └─img
    │  │          icons.png
    │  │          
    │  ├─Bottom
    │  │      bottom.less
    │  │      Bottom.tsx
    │  │      
    │  ├─Gotop
    │  │      gotop.less
    │  │      Gotop.tsx
    │  │      top.png
    │  │      
    │  ├─Header
    │  │      header.jpg
    │  │      header.less
    │  │      Header.tsx
    │  │      
    │  ├─List
    │  │      list.less
    │  │      List.tsx
    │  │      pic.jpg
    │  │      
    │  ├─Music
    │  │      bgm.mp3
    │  │      music.less
    │  │      music.png
    │  │      Music.tsx
    │  │      
    │  └─Toast
    │          toast.less
    │          Toast.tsx
    │          
    ├─containers
    │  ├─Comments
    │  │      Comments.tsx
    │  │      
    │  ├─Cv
    │  │      cv.less
    │  │      Cv.tsx
    │  │      
    │  ├─Detail
    │  │      content.txt
    │  │      detail.less
    │  │      Detail.tsx
    │  │      
    │  └─Home
    │          Home.tsx
    │          
    ├─reducer
    │      artical.redux.js
    │      comment.redux.js
    │      index.js
    │      user.redux.js
    │      
    └─routers
            routers.js
```
