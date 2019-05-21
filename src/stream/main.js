import { callbackify } from 'util'

import through from 'through2-concurrent'

import { parseOpts } from '../options/main.js'
import { throwError, handleError } from '../error.js'
import { isPlainObject } from '../utils.js'

import { getDefaultOpts, forcedOpts } from './options.js'
import { setResult } from './result.js'

// Creates a stream that fires child processes on each file:
//   gulp.src(...).pipe(stream(({ path }) => `command ${path}`))
export const stream = function(getInput, opts) {
  const eGetInput = handleGetInput({ getInput })

  const defaultOpts = getDefaultOpts({ opts })
  const { maxConcurrency, result: resultOpt, ...optsA } = parseOpts({
    opts,
    defaultOpts,
    forcedOpts,
  })

  return through.obj(
    { maxConcurrency },
    execVinyl.bind(null, { getInput: eGetInput, opts: optsA, resultOpt }),
  )
}

const handleGetInput = function({ getInput }) {
  if (typeof getInput !== 'function') {
    throwError(`Option 'getInput' must be a function: ${getInput}`)
  }

  return handleError(getInput)
}

const cExecVinyl = async function({ getInput, opts, resultOpt }, file) {
  const { input, opts: optsA } = await getFileInput({ getInput, file, opts })

  await setResult({ file, input, opts: optsA, resultOpt })

  return file
}

const execVinyl = callbackify(cExecVinyl)

// `getInput()` can either return the command as string, or the
// command + its options as object.
const getFileInput = async function({ getInput, file, opts }) {
  const result = await getInput(file)

  if (isPlainObject(result)) {
    const { command, ...fileOpts } = result
    return { input: command, opts: { ...opts, ...fileOpts } }
  }

  if (typeof result === 'string') {
    return { input: result, opts }
  }

  return { opts }
}
