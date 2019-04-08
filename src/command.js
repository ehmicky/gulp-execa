import execa from 'execa'

import { printEcho } from './echo.js'
import { splitInput } from './split.js'
import { getError } from './error.js'

// Fire the command with `execa()`
export const execCommand = async function(input, opts) {
  printEcho({ input, opts })

  const { command, args } = splitInput({ input })

  try {
    return await execa(command, args, opts)
  } catch (error) {
    const errorA = getError({ error, input, opts })
    throw errorA
  }
}
