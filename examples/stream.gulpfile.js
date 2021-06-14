// Demo of the `stream()` method.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/stream.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

'use strict'

const { src, dest } = require('gulp')
const { stream } = require('gulp-execa')

module.exports.default = () =>
  src('*.js')
    .pipe(stream(({ path }) => `sort ${path}`))
    .pipe(dest('sorted'))
