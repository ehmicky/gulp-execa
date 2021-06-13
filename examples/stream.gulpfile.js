// Demo of the `stream()` method.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/stream.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

// eslint-disable-next-line filenames/match-exported
import { src, dest } from 'gulp'
// eslint-disable-next-line node/no-extraneous-import
import { stream } from 'gulp-execa'

// eslint-disable-next-line import/no-default-export
export default function task() {
  return src('*.js')
    .pipe(stream(({ path }) => `sort ${path}`))
    .pipe(dest('sorted'))
}
