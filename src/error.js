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
  return new PluginError({ ...PLUGIN_ERROR_OPTS, ...opts, error: errorA })
}

const PLUGIN_ERROR_OPTS = {
  plugin: 'gulp-execa',
  showProperties: false,
  showStack: true,
}