import { callbackify } from 'util'

import through from 'through2-concurrent'

import { isValidInput } from './input.js'
import { parseOpts } from './options.js'
import { execCommand, streamCommand } from './exec.js'

// Creates a stream to use in Gulp e.g.
//   src(...).pipe(stream(({ path }) => ['command', [path]]))
// This should not be used with commands that allow several files as arguments
// (through variadic arguments, globbing or directory recursion) as a single
// call to those functions would be more efficient that creating lots of
// child processes through streaming.
export const stream = function(mapFunc, opts) {
  const { maxConcurrency, ...optsA } = parseOpts({
    opts,
    defaultOpts,
    forcedOpts,
  })
  const { result: resultOpt, ...optsB } = addDefaultOpts({ opts: optsA })

  return through.obj(
    { maxConcurrency },
    execVinyl.bind(null, { mapFunc, opts: optsB, resultOpt }),
  )
}

const defaultOpts = {
  // We use `through2-concurrent` because `through2` processes files serially
  // The default is 16 which is too low
  maxConcurrency: 100,
  // What to do with the result, among 'save', 'overwrite' or 'stream'
  result: 'overwrite',
}

const forcedOpts = {
  // Prevents by default because it would be done on each iteration.
  // Also without `stdout|stderr: pipe`, `vinyl.execa` does not get
  // `stdout|stderr|all` properties and `vinyl.contents` cannot be updated.
  verbose: false,
}

const addDefaultOpts = function({ opts, opts: { result } }) {
  const encoding = ['overwrite', 'stream'].includes(result)
    ? { encoding: 'buffer' }
    : {}
  const stripFinalNewline =
    result === 'overwrite' ? { stripFinalNewline: false } : {}
  return { ...encoding, ...stripFinalNewline, ...opts }
}

const cExecVinyl = async function({ mapFunc, opts, resultOpt }, file) {
  const input = await mapFunc(file)

  // Returning `undefined` or invalid command skips it silently.
  // `file.execa` array will be pushed with `undefined`.
  if (isValidInput({ input })) {
    await handleResult[resultOpt]({ file, input, opts })
  }

  return file
}

const execVinyl = callbackify(cExecVinyl)

const saveResult = async function({ file, file: { execa = [] }, input, opts }) {
  const result = await execCommand(input, opts)
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.execa = [...execa, result]
}

const overwriteResult = async function({ file, input, opts }) {
  const { all } = await execCommand(input, opts)
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.contents = all
}

const streamResult = function({ file, input, opts }) {
  const { all } = streamCommand(input, opts)
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.contents = all
}

const handleResult = {
  save: saveResult,
  overwrite: overwriteResult,
  stream: streamResult,
}
