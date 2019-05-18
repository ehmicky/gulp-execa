// Parse and validate main input
export const parseInput = function(inputArgs) {
  const iterables = inputArgs.slice(0, -1)
  iterables.forEach(validateIterable)

  const func = inputArgs[inputArgs.length - 1]
  validateFunc(func)

  return { iterables, func }
}

const validateIterable = function(iterable) {
  if (iterable[Symbol.iterator] === undefined && !isRepeat(iterable)) {
    throw new TypeError(`Argument must be an iterable or a positive integer: ${iterable}`)
  }
}

export const isRepeat = function(iterable) {
  return Number.isInteger(iterable) && iterable >= 0
}

const validateFunc = function(func) {
  if (typeof func !== 'function') {
    throw new TypeError(`Last argument must be a function: ${func}`)
  }
}
