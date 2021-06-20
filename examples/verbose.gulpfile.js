// Demo of the `verbose` option.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/verbose.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

import { task } from 'gulp-execa'

// Does not print the command nor output to the console
export default task('npm --version', { verbose: false })
