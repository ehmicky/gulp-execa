import keepFuncProps from 'keep-func-props'

// Like Lodash pickBy()
export const pickBy = function(object, condition) {
  const pairs = Object.entries(object).filter(([key, value]) =>
    condition(value, key),
  )
  return Object.fromEntries(pairs)
}

// Is a plain object, including `Object.create(null)`
export const isPlainObject = function(val) {
  return (
    typeof val === 'object' &&
    val !== null &&
    (val.constructor === Object || val.constructor === undefined)
  )
}

// Wrap a function with a error handler
const kAddErrorHandler = function(func, errorHandler) {
  return errorHandledFunc.bind(null, func, errorHandler)
}

export const addErrorHandler = keepFuncProps(kAddErrorHandler)

const errorHandledFunc = function(func, errorHandler, ...args) {
  try {
    const retVal = func(...args)

    // Works for async functions as well
    // eslint-disable-next-line promise/prefer-await-to-then
    return retVal && typeof retVal.then === 'function'
      ? retVal.catch(error => errorHandler(error, ...args))
      : retVal
  } catch (error) {
    return errorHandler(error, ...args)
  }
}
