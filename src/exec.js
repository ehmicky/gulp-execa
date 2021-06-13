import execa from 'execa'

import { printEcho } from './echo.js'
import { throwError } from './error.js'
import { validateInput } from './input.js'
import { parseOpts } from './options/main.js'

// Execute a child process (command + arguments)
export const exec = function (input, opts) {
  validateInput(input)
  const optsA = parseOpts({ opts })

  return execCommand(input, optsA)
}

// Fire the command with `execa.command()` in promise mode
export const execCommand = async function (input, opts) {
  printEcho({ input, opts })

  try {
    return await execa.command(input, opts)
  } catch (error) {
    throwError(error)
  }
}

// Fire the command with `execa.command()` in stream mode
export const streamCommand = function (input, opts) {
  printEcho({ input, opts })

  try {
    return execa.command(input, opts)
    /* c8 ignore start */
  } catch (error) {
    // At the moment, `execa` never throws synchronously.
    // This is just a safety catch in case it has a bug.
    throwError(error)
  }
  /* c8 ignore stop */
}
