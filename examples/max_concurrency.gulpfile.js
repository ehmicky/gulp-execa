// Demo of the `maxConcurrency` option.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/max_concurrency.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

'use strict'

// Ignore the following line: this is only needed for internal purposes.
require('./utils.js')

const { src } = require('gulp')
const { stream } = require('gulp-execa')

module.exports.default = () =>
  src('*.js').pipe(
    // Only one command will be fired at once
    stream(({ path }) => `echo ${path}`, { echo: true, maxConcurrency: 1 }),
  )
