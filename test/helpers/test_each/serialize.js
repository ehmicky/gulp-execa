import { inspect } from 'util'

import { isPlainObject } from './utils.js'

// Serialize an argument so it can be used in the names
export const serializeParam = function(arg) {
  if (hasName(arg)) {
    return arg.name
  }

  if (typeof arg === 'string') {
    return arg
  }

  if (typeof arg === 'function') {
    return serializeFunction(arg)
  }

  return inspect(arg, INSPECT_OPTS)
}

// `{ name }` can be used to override the serialization logic
const hasName = function(arg) {
  return (
    isPlainObject(arg) && typeof arg.name === 'string' && arg.name.trim() !== ''
  )
}

const serializeFunction = function(func) {
  if (func.name === '') {
    return 'function'
  }

  return func.name
}

// Make names short and on a single line
const INSPECT_OPTS = {
  breakLength: Infinity,
  depth: 1,
  maxArrayLength: 3,
  compact: true,
}
