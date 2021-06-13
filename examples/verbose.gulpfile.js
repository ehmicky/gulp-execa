// Demo of the `verbose` option.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/verbose.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

// eslint-disable-next-line node/no-extraneous-import
import { task } from 'gulp-execa'

// Does not print the command nor output to the console
// eslint-disable-next-line import/no-default-export
export default task('npm --version', { verbose: false })
