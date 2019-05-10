import renameFn from 'rename-fn'

import { parseOpts } from './options.js'
import { execCommand } from './exec.js'

// Create a Gulp task
export const task = function(input, opts) {
  const optsA = { ...opts, ...FORCED_OPTS }
  const optsB = parseOpts(optsA)

  const gulpTask = execCommand.bind(null, input, optsB)

  // Log the command and arguments as the inner function name
  renameFn(gulpTask, input)

  return gulpTask
}

// The `echo` option is not needed since the function name shows it already
const FORCED_OPTS = { echo: false }
