// Demo of the `task()` method.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/task.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

// eslint-disable-next-line node/no-extraneous-import
import gulp from 'gulp-execa'

// eslint-disable-next-line import/no-default-export
export default gulp.task('npm --version')
