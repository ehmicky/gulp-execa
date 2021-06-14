// Demo of the `echo` option.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/echo.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

'use strict'

const { task } = require('gulp-execa')

// Does not print the command to the console
module.exports.default = task('npm --version', { echo: false })
