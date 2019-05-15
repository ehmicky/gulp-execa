import execa from 'execa'
import PluginError from 'plugin-error'

import { validateInput } from './input.js'
import { parseOpts } from './options/main.js'
import { printEcho } from './echo.js'

// Execute a child process (command + arguments)
export const exec = function(input, opts) {
  validateInput({ input })
  const optsA = parseOpts({ opts })

  return execCommand(input, optsA)
}

// Fire the command with `execa()` in promise mode
export const execCommand = async function(input, opts) {
  printEcho({ input, opts })

  try {
    return await execa(input, opts)
    // Build a Gulp error, so it prints better.
    // By passing `error`, we make sure `execa` `error` properties are kept.
    // All error properties are summarized in the error message, i.e. we don't
    // need to print them.
    // There are two ways `execa()` can throw:
    //   - invalid parameters, where core Node.js will throw a plain error.
    //   - anything else (exit code !== 0, process killed, timeout, runtime
    //     error, stream error) will throw an execa-specific richer error.
  } catch (error) {
    throw new PluginError('gulp-execa', error, { showProperties: false })
  }
}

// Fire the command with `execa()` in stream mode
export const streamCommand = function(input, opts) {
  printEcho({ input, opts })

  return execa(input, opts)
}
