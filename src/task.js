import renameFn from 'rename-fn'

import { validateInput } from './input.js'
import { parseOpts } from './options.js'
import { execCommand } from './exec.js'

// Create a Gulp task that fires a child process (command + arguments)
export const task = function(input, opts) {
  validateInput({ input })
  const optsA = parseOpts({ opts, forcedOpts })

  const gulpTask = execCommand.bind(null, input, optsA)

  // Log the command and arguments as the inner function name
  renameFn(gulpTask, input)

  return gulpTask
}

// The `echo` option is not needed since the function name shows it already
const forcedOpts = { echo: false }
