import execa from 'execa'
import PluginError from 'plugin-error'

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
  const optsA = parseOpts(opts)
  return execCommand(input, optsA)
}

// Same but delayed.
// Options are parsed right away, in case there are validation errors.
export const execBind = function(input, opts) {
  const optsA = parseOpts(opts)
  return execCommand.bind(null, input, optsA)
}

// Fire the command with `execa()`
const execCommand = async function(input, opts) {
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
