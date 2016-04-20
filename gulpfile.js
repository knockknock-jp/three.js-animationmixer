var gulp = require('gulp');
var plumber = require('gulp-plumber');
var cache = require('gulp-cached');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var webpack = require('gulp-webpack');
var webserver = require('gulp-webserver');
var runsequence = require('run-sequence');

gulp.task('jade', function () {
    return gulp
        .src(['./src/jade/**/*.jade'])
        .pipe(cache('jade'))
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./build/'))
        .on('error', console.error.bind(console))
});
gulp.task('sass', function () {
    return gulp
        .src(['./src/scss/**/*.scss'])
        .pipe(cache('sass'))
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./build/'))
        .on('error', console.error.bind(console))
});
gulp.task('babel', function() {
    return gulp
        .src(['./src/babel/**/*.es6'])
        .pipe(cache('babel'))
        .pipe(plumber())
        .pipe(babel({presets: ['es2015']}))
        .pipe(rename({extname: '.js'}))
        .pipe(gulp.dest('./src/babel/'))
        .on('error', console.error.bind(console))
});
gulp.task('webpack', function() {
    return gulp
        .src(['./src/babel/**/*.js'])
        .pipe(cache('webpack'))
        .pipe(plumber())
        .pipe(webpack({
            entry: {
                'Main': ['./src/babel/Main.js'],
                'LegoManMesh': ['./src/babel/animation/mixer/LegoMan.js'],
                'Controller': ['./src/babel/controller/Controller.js']
            },
            output: {
                filename: "app.js"
            },
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }]
            }
        }))
        .pipe(gulp.dest('./build/js/'))
        .on('error', console.error.bind(console))
});
gulp.task('copy', function() {
    return gulp
        .src(['./src/assets/**', '!./src/assets/**/*.blend'])
        .pipe(cache('copy'))
        .pipe(gulp.dest('./build/'));
});
gulp.task('watch', function () {
    gulp
        .watch(['./src/jade/**/*.jade'], ['jade'])
        .on('change', function(event) {console.log(event.path + ' : ' + event.type);});
    gulp
        .watch(['./src/scss/**/*.scss'], ['sass'])
        .on('change', function(event) {console.log(event.path + ' : ' + event.type);});
    gulp
        .watch(['./src/babel/**/*.es6'], ['babel'])
        .on('change', function(event) {console.log(event.path + ' : ' + event.type);});
    gulp
        .watch(['./src/babel/**/*.js'], ['webpack'])
        .on('change', function(event) {console.log(event.path + ' : ' + event.type);});
    gulp
        .watch(['./src/assets/**'], ['copy'])
        .on('change', function(event) {console.log(event.path + ' : ' + event.type);})
});
gulp.task('webserver', function() {
    return gulp
        .src(['./build/'])
        .pipe(webserver({host: 'localhost', port: 8000, livereload: true, open: false}))
});
gulp.task('webserver:example', function() {
    return gulp
        .src(['./example/'])
        .pipe(webserver({host: 'localhost', port: 8000, livereload: true, open: false}))
});

gulp.task('default', function(cb) {
    return runsequence(
        ['jade', 'sass', 'babel'],
        ['webpack', 'copy'],
        'watch',
        'webserver',
        cb
    );
});