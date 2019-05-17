import { fastCartesian } from './fast_cartesian.js'

// Retrieve arguments passed to the main function for each iteration
export const getArgs = function(iterables) {
  const args = fastCartesian(...iterables)
  const argsA = args.map(invokeArgs)
  return argsA
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
