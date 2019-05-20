import { inspect } from 'util'

import { isPlainObject } from './utils.js'

// Serialize an argument so it can be used as a suffix
export const serializeArg = function(arg) {
  if (hasSuffix(arg)) {
    return arg.suffix
  }

  if (typeof arg === 'string') {
    return arg
  }

  if (typeof arg === 'function') {
    return serializeFunction(arg)
  }

  return inspect(arg, INSPECT_OPTS)
}

// `{ suffix }` can be used to override the default suffix
const hasSuffix = function(arg) {
  return (
    isPlainObject(arg) &&
    typeof arg.suffix === 'string' &&
    arg.suffix.trim() !== ''
  )
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
