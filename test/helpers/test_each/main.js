import { parseInput, isRepeat } from './input.js'
import { fastCartesian } from './fast_cartesian.js'
import { serializeParam } from './serialize.js'

// Repeat a function with a combination of arguments.
// Meant for test-driven development.
export const testEach = function(...inputArgs) {
  const { iterables, func } = parseInput(inputArgs)

  const iterablesA = iterables.map(handleIterables)
  const loops = fastCartesian(...iterablesA)
  return loops
    .map(handleLoop)
    .map(fixDuplicate)
    .map(loop => callFunc(loop, func))
}

const handleIterables = function(iterable) {
  return handleRepeat(iterable).map(packParamIndex)
}

// Using an integer is a shortcut for [0, 1, ...]
// This can be used together with functions to do fuzz testing.
const handleRepeat = function(iterable) {
  if (isRepeat(iterable)) {
    return Array.from({ length: iterable }, getRepeatIndex)
  }

  return [...iterable]
}

const getRepeatIndex = function(value, index) {
  return index
}

const packParamIndex = function(param, index) {
  return { index, param }
}

const unpackIndex = function({ index }) {
  return index
}

const unpackParam = function({ param }) {
  return param
}

const handleLoop = function(loop, index) {
  const indexes = loop.map(unpackIndex)
  const params = loop.map(unpackParam).map(invokeFunc)
  const names = params.map(getArgName)
  const name = names.join(' ')
  return { name, names, index, indexes, params }
}

// If an argument is a function, its return value will be used instead.
// This can be used to generate random input for example (fuzzy testing).
// It will be fired with all the arguments of this iteration. This allows for
// arguments to be computed based on the value of other arguments.
const invokeFunc = function(param, index, params) {
  if (typeof param !== 'function') {
    return param
  }

  return param(...params)
}

// Retrieve unique test names for each iteration.
// To customize names inside a specific iterable, add `name` properties to it,
// for example with `Array.map()`.
// To customize whole names, generate them inside the iterated function using
// all values.
const getArgName = function(param) {
  const argName = serializeParam(param)
  const argNameA = argName.trim()
  const argNameB = truncateName(argNameA)
  return argNameB
}

// Make names short by truncating them
const truncateName = function(argName) {
  if (argName.length <= MAX_NAME_LENGTH) {
    return argName
  }

  const argNameA = argName.slice(0, MAX_NAME_LENGTH)
  return `${argNameA}...`
}

const MAX_NAME_LENGTH = 60

// Ensure names are unique by appending the index when we find duplicates
const fixDuplicate = function(loop, index, loops) {
  if (!isDuplicate(loop, loops)) {
    return loop
  }

  const { name } = loop
  const nameA = `${name} (${index})`
  return { ...loop, name: nameA }
}

const isDuplicate = function(loop, loops) {
  return loops.some(
    loopA => loopA.name === loop.name && loopA.index !== loop.index,
  )
}

// Return the value so that:
//  - can use `Promise.all(results)` if `func` is async
//  - user can retrieve `params`, `indexes`, etc. by returning them
const callFunc = function({ name, names, index, indexes, params }, func) {
  return func({ name, names, index, indexes }, ...params)
}
