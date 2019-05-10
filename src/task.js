import isCi from 'is-ci'
import renameFn from 'rename-fn'

import { parseOpts } from './options.js'
import { execCommand } from './exec.js'

// Create a Gulp task
export const task = function(input, opts) {
  const optsA = parseOpts({ opts, defaultOpts, forcedOpts })

  const gulpTask = execCommand.bind(null, input, optsA)

  // Log the command and arguments as the inner function name
  renameFn(gulpTask, input)

  return gulpTask
}

const defaultOpts = { verbose: isCi }
// The `echo` option is not needed since the function name shows it already
const forcedOpts = { echo: false }
