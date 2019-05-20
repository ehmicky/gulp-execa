// Demo of the `stream()` method.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/stream.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

'use strict'

// Ignore the following line: this is only needed for internal purposes.
require('./utils.js')

const { src } = require('gulp')
const { stream } = require('gulp-execa')

module.exports.default = () =>
  src('**/*')
    .pipe(stream(({ path }) => `echo ${path}`, { echo: true }))
