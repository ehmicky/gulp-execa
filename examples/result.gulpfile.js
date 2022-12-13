// Demo of the `result` option.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/result.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

import gulp from 'gulp'
import { stream } from 'gulp-execa'
import through from 'through2'

export default () =>
  gulp
    .src('*.js')
    // Prints the number of lines of each file
    .pipe(stream(({ path }) => `wc -l ${path}`, { result: 'save' }))
    .pipe(
      through.obj((file, encoding, func) => {
        console.log(file.execa[0].stdout)
        // eslint-disable-next-line unicorn/no-null
        func(null, file)
      }),
    )
