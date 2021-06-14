// Demo of the `exec()` method.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/exec.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

'use strict'

const { exec } = require('gulp-execa')

module.exports.default = async () => {
  await exec('npm --version')
}
