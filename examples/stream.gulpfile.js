// Demo of the `stream()` method.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/stream.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

import gulp from 'gulp'
import { stream } from 'gulp-execa'

export default () =>
  gulp
    .src('*.js')
    .pipe(stream(({ path }) => `sort ${path}`))
    .pipe(gulp.dest('sorted'))
