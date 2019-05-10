import renameFn from 'rename-fn'

import { execBind } from './exec.js'

// Create a Gulp task
export const task = function(input, opts) {
  const gulpTask = execBind(input, { ...opts, ...FORCED_OPTS })

  // Log the command and arguments as the inner function name
  renameFn(gulpTask, input)

  return gulpTask
}

// The `echo` option is not needed since the function name shows it already
const FORCED_OPTS = { echo: false }
