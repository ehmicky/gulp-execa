import { inspect } from 'util'

import { isPlainObject } from './utils.js'

// Serialize an argument so it can be used as a suffix
export const serializeArg = function(arg) {
  // `{ suffix }` can be used to override the default suffix
  if (isPlainObject(arg) && typeof arg.suffix === 'string') {
    return arg.suffix
  }

  return serializeValue(arg)
}

const serializeValue = function(value) {
  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'function') {
    return serializeFunction(value)
  }

  return inspect(value, INSPECT_OPTS)
}

const serializeFunction = function(func) {
  if (func.name === '') {
    return 'function'
  }

  return func.name
}

// Make suffix short and on a single line
const INSPECT_OPTS = {
  breakLength: Infinity,
  depth: 1,
  maxArrayLength: 3,
  compact: true,
}
