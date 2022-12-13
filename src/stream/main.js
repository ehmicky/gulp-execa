import { callbackify } from 'node:util'

import isPlainObj from 'is-plain-obj'
import through from 'through2-concurrent'

import { throwError } from '../error.js'
import { parseOpts } from '../options/main.js'

import { getDefaultOpts, forcedOpts } from './options.js'
import { setResult } from './result.js'

// Creates a stream that fires child processes on each file:
//   gulp.src(...).pipe(stream(({ path }) => `command ${path}`))
export const stream = (getInput, opts) => {
  validateGetInput(getInput)

  const defaultOpts = getDefaultOpts({ opts })
  const {
    maxConcurrency,
    result: resultOpt,
    ...optsA
  } = parseOpts({
    opts,
    defaultOpts,
    forcedOpts,
  })

  return through.obj(
    { maxConcurrency },
    execVinyl.bind(undefined, { getInput, opts: optsA, resultOpt }),
  )
}

const validateGetInput = (getInput) => {
  if (typeof getInput !== 'function') {
    throwError(`Option 'getInput' must be a function: ${getInput}`)
  }
}

const cExecVinyl = async ({ getInput, opts, resultOpt }, file) => {
  const { input, opts: optsA } = await getFileInput({ getInput, file, opts })

  await setResult({ file, input, opts: optsA, resultOpt })

  return file
}

const execVinyl = callbackify(cExecVinyl)

// `getInput()` can either return the command as string, or the
// command + its options as object.
const getFileInput = async ({ getInput, file, opts }) => {
  const result = await getInputResult({ getInput, file })

  if (isPlainObj(result)) {
    const { command, ...fileOpts } = result
    return { input: command, opts: { ...opts, ...fileOpts } }
  }

  if (typeof result === 'string') {
    return { input: result, opts }
  }

  return { opts }
}

const getInputResult = ({ getInput, file }) => {
  try {
    return getInput(file)
  } catch (error) {
    throwError(error)
  }
}
