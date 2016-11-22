//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),//本地安装 gulp-less
    htmlmin = require('gulp-htmlmin'),//压缩html 本地安装 gulp-htmlmin
    cssmin = require('gulp-minify-css'),//压缩css 本地安装 gulp-minify-css
    notify = require('gulp-notify'),//处理异常 本地安装 gulp-plumber(出现异常并不终止watch事件) gulp-notify（提示我们出现了错误）
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload');//更新代码页面自动刷新 cnpm install gulp-livereload --save-dev

//压缩html
gulp.task('testHtml', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/**/*.html')//该任务针对的文件
        .pipe(htmlmin(options))//该任务调用的模块
        .pipe(gulp.dest('dist'))//将会在dist下生成压缩后的html
        .pipe(livereload());//更新
});


//定义一个testLess任务（将less文件编译为css，然后再压缩）
gulp.task('testLess', function () {
    gulp.src('src/**/*.less') //该任务针对的文件
        .pipe(plumber({errorHandler:notify.onError('Error:<%= error.message %>')}))//检查
        .pipe(less()) //该任务调用的模块
        .pipe(cssmin())//编译后压缩css
        .pipe(gulp.dest('dist')) //将会在src/css下生成index.css
        .pipe(livereload());//更新
});

gulp.task('testWatch',function () {
    livereload.listen();
    gulp.watch('src/**/*.less',['testLess']);//当所有less文件发生改变时，调用testLess
    gulp.watch('src/**/*.html',['testHtml']);//当所有html文件发生改变时，调用html
});


gulp.task('default',['testLess', 'testHtmlmin']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径