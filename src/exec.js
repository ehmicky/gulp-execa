import isCi from 'is-ci'
import execa from 'execa'
import PluginError from 'plugin-error'

import { validateInput } from './input.js'
import { parseOpts } from './options.js'
import { printEcho } from './echo.js'

// Execute a shell command
// To create a Gulp task, one should not use `bind()` as it removes
// `Function.name`. Instead one should do `const taskName = () => exec(...)`
// We avoid `exec.shell()` as it leads to shell-specific input which is not
// cross-platform.
// We avoid using a single string as input and tokenizing it as it's difficult
// with whitespaces escaping. Also escaping is shell-specific, e.g. on Windows
// `cmd.exe` only use double quotes not single quotes.
export const exec = function(input, opts) {
  validateInput({ input })
  const optsA = parseOpts({ opts, defaultOpts })

  return execCommand(input, optsA)
}

const defaultOpts = { verbose: isCi }

// Fire the command with `execa()`
export const execCommand = async function(input, opts) {
  printEcho({ input, opts })

  try {
    return await execa(input, opts)
  } catch (error) {
    throw getError({ error })
  }
}

// Build a Gulp error
// TODO: when error is due to wrong input (not normal Execa error)
// Maybe using options.reject false?
// TODO: sometimes execa adds stdout|stderr, but we don't want that
// (maybe removes anything after first newline?)
const getError = function({ error }) {
  // By passing `error`, we make sure `execa` `error` properties are kept.
  // All error properties are summarized in the error message, i.e. we don't
  // need to print them.
  return new PluginError('gulp-execa', error, { showProperties: false })
}
