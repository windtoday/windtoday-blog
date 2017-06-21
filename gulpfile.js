'use strict'
const browserSync = require('browser-sync').create()
const child = require('child_process')
const gutil = require('gulp-util')
const gulp = require('gulp')

gulp.task('jekyll', () => {
  const jekyll = child.spawn('bundle', [
    'exec',
    'jekyll',
    'serve',
    '--watch',
    '--incremental',
    '--drafts'
  ])

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message))
  }

  jekyll.stdout.on('data', jekyllLogger)
  jekyll.stderr.on('data', jekyllLogger)
})

gulp.task('serve', () => {
  browserSync.init({
    files: [
      '_site/**',
      '_config.yml'
    ],
    port: 4000,
    server: {
      baseDir: '_site'
    }
  })
})

gulp.task('default', ['jekyll', 'serve'])
