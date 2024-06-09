import { execa, parseCommandString } from 'execa'

import { printEcho } from './echo.js'
import { throwError } from './error.js'
import { validateInput } from './input.js'
import { parseOpts } from './options/main.js'

// Execute a child process (command + arguments)
export const exec = (input, opts) => {
  validateInput(input)
  const optsA = parseOpts({ opts })

  return execCommand(input, optsA)
}

// Fire the command with `execaCommand()` in promise mode
export const execCommand = async (input, opts) => {
  printEcho({ input, opts })

  try {
    return await execaCommand(input, opts)
  } catch (error) {
    throwError(error)
  }
}

// Fire the command with `execaCommand()` in stream mode
export const streamCommand = (input, opts) => {
  printEcho({ input, opts })

  try {
    return execaCommand(input, opts)
    /* c8 ignore start */
  } catch (error) {
    // At the moment, `execa` never throws synchronously.
    // This is just a safety catch in case it has a bug.
    throwError(error)
  }
  /* c8 ignore stop */
}

const execaCommand = (input, opts) => {
  const [command, ...args] = parseCommandString(input)
  return execa(command, args, opts)
}
