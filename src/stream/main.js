import { callbackify } from 'util'

import through from 'through2-concurrent'

import { parseOpts } from '../options.js'

import { getDefaultOpts, forcedOpts } from './options.js'
import { handleResult } from './result.js'

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

const cExecVinyl = async function({ mapFunc, opts, resultOpt }, file) {
  const input = await mapFunc(file)

  await handleResult({ file, input, opts, resultOpt })

  return file
}

const execVinyl = callbackify(cExecVinyl)
