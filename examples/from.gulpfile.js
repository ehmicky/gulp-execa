// Demo of the `from` option.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/from.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

import gulp from 'gulp'
import { stream } from 'gulp-execa'
import through from 'through2'

export default function task() {
  return (
    gulp
      .src('*.js')
      // Prints the number of lines of each file, including `stderr`
      .pipe(
        stream(({ path }) => `wc -l ${path}`, {
          result: 'replace',
          from: 'all',
        }),
      )
      .pipe(
        through.obj((file, encoding, func) => {
          console.log(file.contents.toString())
          // eslint-disable-next-line unicorn/no-null
          func(null, file)
        }),
      )
  )
}
