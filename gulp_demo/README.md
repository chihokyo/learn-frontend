# Gulp个人超级快速入门

## 主要目标

**完成对一个页面的简单`scss`,`js`编译和浏览器热更新。**

但其实gulp还可以处理html，img，iconfont等等，主要还是看插件选择。

[Gulp Plugins插件搜索](https://gulpjs.com/plugins/)

总体来说`gulp`使用的是任务型task模式

配置任务-压缩文件-处理`css`，`js`实现热更新。就是这一个步骤。

给任务执行任务进行编译压缩等等。有很多插件。

```shell
npm gulp --version # 查看版本

npm gulp --tasks # 查看任务
```

## 步骤

### 1. 安装gulp

```shell
npm gulp --version # 查看版本
```

### 2. npm init -y 进行初始化

#### 安装一系列插件

```shell
npm install gulp-sass gulp-autoprefixer gulp-load-plugins gulp-uglify del
```

#### 修改package.json脚本

```json
{
  "name": "gulp_demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "gulp" // 这里npm run build 执行gulp命令
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "browser-sync": "^2.26.12", // 网页自动打开+热更新
    "del": "^5.1.0", // 删除文件夹
    "gulp": "^4.0.2", // gulp
    "gulp-autoprefixer": "^7.0.1", // 根据设置浏览器版本自动处理浏览器前缀,浏览器兼容问题
    "gulp-load-plugins": "^2.0.4", // 自动加载模块
    "gulp-sass": "^4.1.0", // 编译sass
    "gulp-uglify": "^3.0.2" // 压缩文件
  }
}
```

### 4.  新建 `gulpfile.js`

```javascript
// 解构调用
const { src, dest, series, watch} = require('gulp')
// gulp-uglify => plugins.uglify = require('gulp-uglify)
// 引入插件loader 这些只能引入gulp开头的插件 del这样的不行
const plugins = require('gulp-load-plugins')()
// 引入插件 del进行删除文件夹
const del = require('del')
// 引入插件 browserSync 浏览器热更新
const browserSync = require('browser-sync').create()
const reload = browserSync.reload


 // 压缩js uglify (翻译很好玩，让别人难以阅读)
function js (cb) {
    // 表示js文件下的所有js文件
    src('js/*.js')
        //　进入丑颜相机
        .pipe(plugins.uglify())
        // 输出目录
        .pipe(dest('./dist/js'))
        // 进行加载 详情参考gulp文档
        .pipe(reload({ stream: true }))
    // 不写cb callback 执行script的时候会出错
    cb()
}

// 对scss，less进行编译压缩，输出css文件
function css (cb) {
    src('css/*.scss')
        // 对文件进行编译 以下在官方都有配置信息
        .pipe(plugins.sass({ outputStyle: 'compressed'}))
        .pipe(plugins.autoprefixer({
            cascade:false,
            remove:false
        }))
        // 输出
        .pipe(dest('./dist/css'))
        .pipe(reload({ stream: true }))
    cb()
}

// 监听上面这些js，scss文件的变化
// 监视到变动之后，直接执行
function watcher () {
     watch('js/*.js', js)
     watch('css/*.scss', css)
}

// 删除dist目录
function clean (cb) {
    // 使用del进行清理
    del('./dist')
    cb()
}

function serve(cb) {
    // 初始化
    browserSync.init({
        server: {
            // 加载目录（目前就是当前目录）
            baseDir: './' 
        }
    })
    cb()
}

exports.scripts = js // 通过npx gulp js
exports.styles = css // 通过npx gulp css
exports.clean = clean // 通过npx gulp clean
// 传递一个task 任务数组 
// series 串行执行
// 执行npm run build 就按照这个顺序向下执行
exports.default = series([
    // 先进行clean
    clean,
    js,
    css,
    serve,
    watcher
])
```

### 5. 新建文件夹

新建 js下index.js,新建 css 下 index.scss 等等进行编译。

这样结束之后会生成一个dist文件夹里面是压缩过的文件。并且通过一系列的插件完成了对一个html文件的热更新。

执行步骤大概就是如下感觉。

```shell
$ npm run build

> gulp_demo@1.0.0 build /Users/Chihokyo/Code/learn-javascript/gulp_demo
> gulp

[17:27:58] Using gulpfile ~/gulp_demo/gulpfile.js
[17:27:58] Starting 'default'...
[17:27:58] Starting 'clean'...
[17:27:58] Finished 'clean' after 2.16 ms
[17:27:58] Starting 'js'...
[17:27:58] Finished 'js' after 104 ms
[17:27:58] Starting 'css'...
[17:27:59] Finished 'css' after 840 ms
[17:27:59] Starting 'serve'...
[17:27:59] Finished 'serve' after 17 ms
[17:27:59] Starting 'watcher'...
[Browsersync] 1 file changed (index.js)
[Browsersync] 1 file changed (index.css)
[Browsersync] Access URLs:
```

## 最后

顺便说一下，以前的古老写法还有不用函数执行任务的，而是使用`task()`这个函数。

```javascript
// 官方推荐
function js (cb) {
  src()
  .pipe()
  .pipe()
}
// 以前的写法
gulp.task('js', function(){
  gulp.src()
  .pipe()
})
```

