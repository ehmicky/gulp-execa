import { serializeParam } from './serialize.js'

// Retrieve unique test names for each iteration.
// To customize names inside a specific iterable, add `name` properties to it,
// for example with `Array.map()`.
// To customize whole names, generate them inside the iterated function using
// all values.
export const addNames = function({ index, indexes, params }) {
  const names = params.map(getArgName)
  const name = names.join(' ')
  return { name, names, index, indexes, params }
}

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
