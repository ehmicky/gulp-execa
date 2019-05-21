import { inspect } from 'util'

import { isPlainObject } from './utils.js'

// Serialize an argument so it can be used in the names
export const serializeParam = function(param) {
  if (hasName(param)) {
    return param.name
  }

  if (typeof param === 'string') {
    return param
  }

  if (typeof param === 'function') {
    return serializeFunction(param)
  }

  return inspect(param, INSPECT_OPTS)
}

// `{ name }` can be used to override the serialization logic
const hasName = function(param) {
  return (
    isPlainObject(param) &&
    typeof param.name === 'string' &&
    param.name.trim() !== ''
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
