import PluginError from 'plugin-error'

import { addErrorHandler } from './utils.js'

// Wrap a function with an error handler
export const handleError = function(func, opts) {
  return addErrorHandler(func, error => throwError(error, opts))
}

export const throwError = function(error, opts) {
  throw createError(error, opts)
}

export const streamError = function(stream, error, opts) {
  stream.emit('error', createError(error, opts))
}

// Build a Gulp error, so it prints better.
// By passing `error`, we make sure `error` properties (e.g. from `execa`)
// are kept. They are not printed though, as error message should be enough.
const createError = function(error, opts) {
  const errorA = error instanceof Error ? error : new Error(error)
  fixStack(errorA)
  return new PluginError('gulp-execa', errorA, {
    ...PLUGIN_ERROR_OPTS,
    ...opts,
  })
}

const PLUGIN_ERROR_OPTS = { showProperties: false, showStack: true }

// `plugin-error` repeats the error message by printing both `error.message`
// and the first line of `error.stack`. We remove that last one.
const fixStack = function(error) {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  error.stack = error.stack.split('\n').slice(1).join('\n')
}
