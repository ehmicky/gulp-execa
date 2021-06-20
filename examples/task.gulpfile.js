// Demo of the `task()` method.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/task.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

import { task } from 'gulp-execa'

export default task('npm --version')
