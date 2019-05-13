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
  const { maxConcurrency, result: resultOpt, ...optsA } = parseOpts({
    opts,
    defaultOpts,
  })

  return through.obj(
    { maxConcurrency },
    execVinyl.bind(null, { mapFunc, opts: optsA, resultOpt }),
  )
}

const defaultOpts = {
  // Prevents by default because it would be done on each iteration.
  // Also without `stdout|stderr: pipe`, `vinyl.execa` does not get
  // `stdout|stderr|all` properties.
  verbose: false,
  // We use `through2-concurrent` because `through2` processes files serially
  // The default is 16 which is too low
  maxConcurrency: 100,
  // What to do with the result, among 'save', 'overwrite', 'stream' or 'create'
  result: 'save',
}

const cExecVinyl = async function({ mapFunc, opts, resultOpt }, file) {
  const input = await mapFunc(file)

  const result = await fireCommand({ input, opts })

  handleResult[resultOpt]({ file, result })

  return file
}

const execVinyl = callbackify(cExecVinyl)

const fireCommand = function({ input, opts }) {
  // Returning `undefined` or invalid command skips it silently.
  // `file.execa` array will be pushed with `undefined`.
  if (!isValidInput({ input })) {
    return
  }

  return execCommand(input, opts)
}

const saveResult = function({ file, file: { execa = [] }, result }) {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.execa = [...execa, result]
}

const handleResult = {
  save: saveResult,
}
