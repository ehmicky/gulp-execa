// Parse and validate main input
export const parseInput = function(inputArgs) {
  const iterables = inputArgs.slice(0, -1)

  const func = inputArgs[inputArgs.length - 1]
  validateFunc(func)

  return { iterables, func }
}

const validateFunc = function(func) {
  if (typeof func !== 'function') {
    throw new TypeError(`Last argument must be a function: ${func}`)
  }
}
