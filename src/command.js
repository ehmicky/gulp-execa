import execa from 'execa'
import PluginError from 'plugin-error'

import { printEcho } from './echo.js'

// Fire the command with `execa()`
export const execCommand = async function(input, opts) {
  printEcho({ input, opts })

  try {
    return await execa(input, opts)
  } catch (error) {
    throw getError({ error })
  }
}

// Buld a Gulp error
// TODO: when error is due to wrong input (not normal Execa error)
// TODO: sometimes execa adds stdout|stderr, but we don't want that
// (maybe removes anything after first newline?)
export const getError = function({ error, error: { message } }) {
  // TODO: try passing `error` instead of `error.message`
  const errorA = new PluginError('gulp-execa', message, {
    showProperties: false,
  })
  // Keep `execa` error properties
  // eslint-disable-next-line fp/no-mutating-assign
  Object.assign(errorA, error)
  return errorA
}
