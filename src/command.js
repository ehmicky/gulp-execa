import execa from 'execa'

import { printEcho } from './echo.js'
import { getError } from './error.js'

// Fire the command with `execa()`
export const execCommand = async function(input, opts) {
  printEcho({ input, opts })

  try {
    return await execa(input, opts)
  } catch (error) {
    throw getError({ error, input, opts })
  }
}
