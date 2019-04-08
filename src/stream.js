import through from 'through2-concurrent'

import { exec } from './exec.js'

// Creates a stream to use in Gulp e.g.
//   src(...).pipe(stream(({ path }) => ['command', [path]]))
// This should not be used with commands that allow several files as arguments
// (through variadic arguments, globbing or directory recursion) as a single
// call to those functions would be more efficient that creating lots of
// child processes through streaming.
const execStream = function(mapFunc, opts) {
  const { maxConcurrency, ...optsA } = { ...DEFAULT_OPTS, ...opts }

  // `maxConcurrency` `through2` option is not specified because `gulp.src()`
  // always has a `highWaterMark` of `16` meaning only 16 files are processed
  // at a time in parallel. `maxConcurrency` can then only be used to decrease
  // that level of parallelism but `16` is already quite low.
  return through.obj(
    { maxConcurrency },
    execVinyl.bind(null, { mapFunc, opts: optsA }),
  )
}

const DEFAULT_OPTS = {
  // Without `pipe`, `vinyl.exec` does not get `stdout|stderr` properties.
  // Also we do not want to print to console by default because it would be
  // done on each iteration.
  stdout: 'pipe',
  stderr: 'pipe',
  // Prevents echoing by default because it would be done on each iteration.
  echo: false,
  // The default is 16 which is too low
  maxConcurrency: 100,
}

// eslint-disable-next-line max-params, promise/prefer-await-to-callbacks
const execVinyl = async function({ mapFunc, opts }, file, encoding, cb) {
  try {
    const input = await mapFunc(file)

    const result = await fireCommand({ input, opts })

    addToVinyl({ file, result })

    // eslint-disable-next-line promise/prefer-await-to-callbacks
    return cb(null, file)
  } catch (error) {
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    return cb(error)
  }
}

const fireCommand = function({ input, opts }) {
  // Returning `undefined` or invalid command skips it silently.
  // `file.exec` array will be pushed with `undefined`.
  if (typeof input !== 'string' || input.trim() === '') {
    return
  }

  return exec(input, opts)
}

const addToVinyl = function({ file, result }) {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.exec = [...(file.exec || []), result]
}

module.exports = {
  stream: execStream,
}
