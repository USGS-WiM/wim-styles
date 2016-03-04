'use strict';

//load dependencies
var gulp = require('gulp'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    del= require('del'),
    semver = require('semver'),
	less = require('gulp-less');

//get current app version
var version = require('./package.json').version;

//function for version lookup and tagging
function increment(release) {
    //get new version number
    var newVer = semver.inc(version, release);

    // get all the files to bump version in 
    return gulp.src(['./package.json', './bower.json'])
        // bump the version number in those files 
        .pipe(bump({ type: release }))
        // save it back to filesystem 
        .pipe(gulp.dest('./'))
        // commit the changed version number
        .pipe(git.commit('Release v' + newVer))
        // **tag it in the repository** 
        //.pipe(git.tag('v' + newVer));
        .pipe(git.tag('v' + newVer, 'Version message', function (err) {
            if (err) throw err;
    }));
}

//tasks for version tags
gulp.task('patch', ['dist'], function () { return increment('patch'); });
gulp.task('feature', ['dist'], function () { return increment('minor'); });
gulp.task('release', ['dist'], function () { return increment('major'); });

gulp.task('push', function () {
    console.info('Pushing...');
    return git.push('upstream', 'master', { args: " --tags" }, function (err) {
        if (err) {
            console.error(err);
            throw err;
        } else {
            console.info('done pushing to github!');
        }
    });
});

//less compilation
gulp.task('less-template', function () {
    return gulp.src(['template/less/base.less'])
        .pipe(less())
        .pipe(gulp.dest('template/css'))
});

gulp.task('less-core', function () {
    return gulp.src(['core/less/base.less'])
        .pipe(less())
        .pipe(gulp.dest('core/css'))
});

// Clean
gulp.task('clean', function (cb) {
    del([
      'css/**'
    ], cb);
});

// build dist
gulp.task('dist', ['less-template', 'less-core']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('dist');
});