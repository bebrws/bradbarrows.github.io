var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');

// Original: https://raw.githubusercontent.com/Oxyyx/pixi_gulp_typescript/master/gulpfile.js
// Based on the docs at:  https://www.typescriptlang.org/docs/handbook/gulp.html
// For TS  
/*
gulp.task('default', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'], 
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
        presets: ['es2015'],
        extensions: ['.ts']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});
*/

gulp.task('default', ['build-js']);

gulp.task('watchjs', function () {
    // Endless stream mode
    gutil.log('Watching JS from mainEntryPoint.js');
    return gulp.watch('./src/mainEntryPoint.js', ['build-js']);
});

gulp.task('build-js', function () {
    gutil.log('Building JS from mainEntryPoint.js');
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/mainEntryPoint.js'], 
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
        presets: ['es2015'],
        extensions: ['.ts', '.js']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.identityMap())
    //.pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});