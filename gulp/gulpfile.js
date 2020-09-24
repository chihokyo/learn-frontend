/**
 * 项目简介
 * 初步了解gulp的流程
 * 完成对一个页面的简单编译和热更新
 */

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


exports.scripts = js
exports.styles = css
exports.clean = clean
// 传递一个task 任务数组 
// series 串行执行
exports.default = series([
    // 先进行clean
    clean,
    js,
    css,
    serve,
    watcher
])