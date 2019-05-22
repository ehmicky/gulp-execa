import renameFn from 'rename-fn'

import { addErrorHandler } from './utils.js'
import { validateInput } from './input.js'
import { parseOpts } from './options/main.js'
import { execCommand } from './exec.js'

// Create a Gulp task that fires a child process (command + arguments)
const eTask = function(input, opts) {
  validateInput({ input })
  const optsA = parseOpts({ opts })

  const gulpTask = execCommand.bind(null, input, optsA)

  // Log the command and arguments as the task name.
  // This does not work when this is the top-level task.
  renameFn(gulpTask, input)

  return gulpTask
}

// Since Node 12.3.0, uncaught exceptions also print their properties when they
// are instances of custom errors. This makes input|options validation errors
// of `task()` (which are likely to become uncaught exceptions) not print as
// nicely. We fix this by rethrowing the error but with a normal `Error`.
const handleTask = function(error) {
  const errorA = new Error(error.message)
  // eslint-disable-next-line fp/no-mutation
  errorA.stack = error.stack
  throw errorA
}

export const task = addErrorHandler(eTask, handleTask)
