import { callbackify } from 'util'
import { Buffer } from 'buffer'

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
    forcedOpts,
  })

  return through.obj(
    { maxConcurrency },
    execVinyl.bind(null, { mapFunc, opts: optsA, resultOpt }),
  )
}

const defaultOpts = {
  // We use `through2-concurrent` because `through2` processes files serially
  // The default is 16 which is too low
  maxConcurrency: 100,
  // What to do with the result, among 'save', 'overwrite' or 'stream'
  result: 'save',
}

const forcedOpts = {
  // Prevents by default because it would be done on each iteration.
  // Also without `stdout|stderr: pipe`, `vinyl.execa` does not get
  // `stdout|stderr|all` properties and `vinyl.contents` cannot be updated.
  verbose: false,
}

const cExecVinyl = async function({ mapFunc, opts, resultOpt }, file) {
  const input = await mapFunc(file)

  const childProcess = fireCommand({ input, opts })

  await handleResult[resultOpt]({ file, childProcess })

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

const saveResult = async function({
  file,
  file: { execa = [] },
  childProcess,
}) {
  const result = await childProcess
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.execa = [...execa, result]
}

const overwriteResult = async function({ file, childProcess }) {
  const { all } = await childProcess
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.contents = Buffer.from(all)
}

const streamResult = function({ file, childProcess }) {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.contents = childProcess.all
}

const handleResult = {
  save: saveResult,
  overwrite: overwriteResult,
  stream: streamResult,
}
