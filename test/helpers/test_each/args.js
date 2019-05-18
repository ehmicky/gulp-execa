import { fastCartesian } from './fast_cartesian.js'
import { isRepeat } from './input.js'

// Retrieve arguments passed to the main function for each iteration
export const getArgs = function(iterables) {
  const iterablesA = iterables.map(handleRepeat)
  const args = fastCartesian(...iterablesA)
  const argsA = args.map(invokeArgs)
  return argsA
}

// Using an integer is a shortcut for [0, 1, ...]
// This can be used together with functions to do fuzz testing.
const handleRepeat = function(iterable) {
  if (!isRepeat(iterable)) {
    return iterable
  }

  return Array.from({ length: iterable }, getIndex)
}

const getIndex = function(value, index) {
  return index
}

// If an argument is a function, its return value will be used instead.
// This can be used to generate random input for example (fuzzy testing).
const invokeArgs = function(eachArgs) {
  return eachArgs.map(invokeArg)
}

const invokeArg = function(arg) {
  if (typeof arg === 'function') {
    return arg()
  }

  return arg
}
