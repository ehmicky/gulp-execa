// Demo of the `task()` method.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/task.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

'use strict'

const { task } = require('gulp-execa')

module.exports.default = task('npm --version')
