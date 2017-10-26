var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    srcPath: 'src/',
    devPath: 'build/',
    prdPath: 'dist/'
};

// 拷贝lib，把第三方依赖拷贝到开发和生产环境
gulp.task('lib', function() {
    gulp.src('bower_components/**/*.js')
    .pipe(gulp.dest(app.devPath + 'vendor'))
    .pipe(gulp.dest(app.prdPath + 'vendor'))
    .pipe($.connect.reload());
});

// 拷贝html，把src创建的html拷贝到开发和生产环境
gulp.task('html', function() {
    gulp.src(app.srcPath + '**/*.html')
    .pipe(gulp.dest(app.devPath))
    .pipe(gulp.dest(app.prdPath))
    .pipe($.connect.reload());
});

// 拷贝json，把src创建的json拷贝到开发和生产环境
gulp.task('json', function() {
    gulp.src(app.srcPath + 'data/**/*.json')
    .pipe(gulp.dest(app.devPath + 'data'))
    .pipe(gulp.dest(app.prdPath + 'data'))
    .pipe($.connect.reload());
});

// 拷贝css-less，把src创建的less拷贝到开发和生产环境
gulp.task('less', function() {
    gulp.src(app.srcPath + 'style/index.less')
    .pipe($.less())
    .pipe(gulp.dest(app.devPath + 'css'))
    .pipe($.cssmin())
    .pipe(gulp.dest(app.prdPath + 'css'))
    .pipe($.connect.reload());
});

// 拷贝js, 把src创建的js拷贝到开发和生产环境
gulp.task('js', function() {
    gulp.src(app.srcPath + 'script/**/*.js')
    .pipe($.concat('index.js'))
    .pipe(gulp.dest(app.devPath + 'js'))
    .pipe($.uglify())
    .pipe(gulp.dest(app.prdPath + 'js'))
    .pipe($.connect.reload());
});

// 拷贝image, 把src创建的image拷贝到开发和生产环境
gulp.task('image', function() {
    gulp.src(app.srcPath + 'image/**/*')
    .pipe(gulp.dest(app.devPath + 'image'))
    .pipe($.imagemin())
    .pipe(gulp.dest(app.prdPath + 'image'))
    .pipe($.connect.reload());
});

// 总任务
gulp.task('build',['image','js','less','lib','html','json']);

// 清除任务
gulp.task('clean',function() {
    gulp.src([app.devPath,app.prdPath])
    .pipe($.clean());
});

// 启动服务器
gulp.task('serve',['build'], function() {
    $.connect.server({
        root: [app.devPath],
        livereload: true,
        port:1234
    });

    open('http://localhost:1234');

// 自动构建
    gulp.watch('bower_components/**/*',['lib']);
    gulp.watch(app.srcPath + '**/*.html',['html']);
    gulp.watch(app.srcPath + 'data/**/*.json',['json']);
    gulp.watch(app.srcPath + 'style/index.less',['less']);
    gulp.watch(app.srcPath + 'script/**/*.js',['js']);
    gulp.watch(app.srcPath + 'image/**/*',['image']);
});

// 设置默认任务
gulp.task('default',['serve']);