import renameFn from 'rename-fn'

import { validateInput } from './input.js'
import { parseOpts } from './options/main.js'
import { execCommand } from './exec.js'

// Create a Gulp task that fires a child process (command + arguments)
export const task = function(input, opts) {
  validateInput({ input })
  const optsA = parseOpts({ opts })

  const gulpTask = execCommand.bind(null, input, optsA)

  // Log the command and arguments as the inner function name
  renameFn(gulpTask, input)

  return gulpTask
}
