// Demo of the `maxConcurrency` option.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/max_concurrency.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

// eslint-disable-next-line filenames/match-exported
import gulp from 'gulp'
import { stream } from 'gulp-execa'

export default function task() {
  return gulp.src('*.js').pipe(
    // Only one command will be fired at once
    stream(({ path }) => `echo ${path}`, { echo: true, maxConcurrency: 1 }),
  )
}
