import { callbackify } from 'util'

import through from 'through2-concurrent'

import { parseOpts } from '../options.js'

import { getDefaultOpts, forcedOpts } from './options.js'
import { setResult } from './result.js'

// Creates a stream that fires child processes on each file:
//   gulp.src(...).pipe(stream(({ path }) => `command ${path}`))
export const stream = function(getInput, opts) {
  const defaultOpts = getDefaultOpts({ opts })
  const { maxConcurrency, result: resultOpt, ...optsA } = parseOpts({
    opts,
    defaultOpts,
    forcedOpts,
  })

  return through.obj(
    { maxConcurrency },
    execVinyl.bind(null, { getInput, opts: optsA, resultOpt }),
  )
}

const cExecVinyl = async function({ getInput, opts, resultOpt }, file) {
  // We don't wrap exceptions with `plugin-error` because this would be a user
  // error, not a plugin error
  const input = await getInput(file)

  await setResult({ file, input, opts, resultOpt })

  return file
}

const execVinyl = callbackify(cExecVinyl)
