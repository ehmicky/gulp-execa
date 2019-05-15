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
  const defaultOpts = getDefaultOpts({ opts })
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

const getDefaultOpts = function({ opts: { result = 'replace' } = {} }) {
  return {
    // This is too verbose if done on each iteration
    verbose: false,
    // We use `through2-concurrent` because `through2` processes files serially
    // The default is 16 which is too low
    maxConcurrency: 100,
    // What to do with the result. Either 'save' or 'replace'
    result: 'replace',
    // With `result: 'replace'` which stream to use: `stdout`, `stderr` or `all`
    from: 'stdout',
    ...resultDefaultOpts[result],
  }
}

const resultDefaultOpts = {
  // `save` should retrieve output as string, but this is not needed for
  // `replace`. Same thing with final newline stripping.
  replace: { encoding: 'buffer', stripFinalNewline: false },
}

const forcedOpts = {
  // Forces piping stdout|stderr because:
  //  - `inherit` would be too verbose if done on each iteration.
  //  - `save` mode would not get `stdout|stderr|all` properties.
  //  - `replace` mode would not work.
  stdout: 'pipe',
  stderr: 'pipe',
  // `stdio` cannot be combined with `stdout|stderr` (`forcedOpts`) with execa
  stdio: undefined,
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

// If the `file` already uses streams, we do it as well as it's more efficient.
// This is done usually by using `gulp.src(..., { buffer: false })`
// Otherwise we don't since many Gulp plugins don't support `file.contents`
// being a stream.
const replaceResult = function({ file, input, opts }) {
  if (file.isStream()) {
    return streamResult({ file, input, opts })
  }

  return overwriteResult({ file, input, opts })
}

const streamResult = function({ file, input, opts, opts: { from } }) {
  const execaResult = streamCommand(input, opts)
  const { [from]: result } = execaResult

  // Make stream fail if the command fails
  execaResult.catch(error => result.emit('error', error))

  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.contents = result
}

const overwriteResult = async function({ file, input, opts, opts: { from } }) {
  const { [from]: result } = await execCommand(input, opts)
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.contents = result
}

const handleResult = {
  save: saveResult,
  replace: replaceResult,
}
