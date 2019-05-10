import { callbackify } from 'util'

import through from 'through2-concurrent'

import { isValidInput } from './input.js'
import { parseOpts } from './options.js'
import { execCommand } from './exec.js'

// Creates a stream to use in Gulp e.g.
//   src(...).pipe(stream(({ path }) => ['command', [path]]))
// This should not be used with commands that allow several files as arguments
// (through variadic arguments, globbing or directory recursion) as a single
// call to those functions would be more efficient that creating lots of
// child processes through streaming.
export const stream = function(mapFunc, opts) {
  const { maxConcurrency, ...optsA } = parseOpts({ opts, defaultOpts })

  // `maxConcurrency` `through2` option is not specified because `gulp.src()`
  // always has a `highWaterMark` of `16` meaning only 16 files are processed
  // at a time in parallel. `maxConcurrency` can then only be used to decrease
  // that level of parallelism but `16` is already quite low.
  return through.obj(
    { maxConcurrency },
    execVinyl.bind(null, { mapFunc, opts: optsA }),
  )
}

const defaultOpts = {
  // Prevents by default because it would be done on each iteration.
  // Also without `stdout|stderr: pipe`, `vinyl.exec` does not get
  // `stdout|stderr` properties.
  verbose: false,
  // The default is 16 which is too low
  maxConcurrency: 100,
}

const cExecVinyl = async function({ mapFunc, opts }, file) {
  const input = await mapFunc(file)

  const result = await fireCommand({ input, opts })

  addToVinyl({ file, result })

  return file
}

const execVinyl = callbackify(cExecVinyl)

const fireCommand = function({ input, opts }) {
  // Returning `undefined` or invalid command skips it silently.
  // `file.exec` array will be pushed with `undefined`.
  if (!isValidInput({ input })) {
    return
  }

  return execCommand(input, opts)
}

const addToVinyl = function({ file, result }) {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.exec = [...(file.exec || []), result]
}
