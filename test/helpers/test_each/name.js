import { serializeArg } from './serialize.js'

// Retrieve unique test names for each iteration.
// To customize names inside a specific iterable, add `name` properties to it,
// for example with `Array.map()`.
// To customize whole names, generate them inside the iterated function using
// all values.
export const getNames = function(args) {
  return args.map(getName).map(fixDuplicate)
}

const getName = function(args) {
  const argNames = args.map(getArgName)
  const name = argNames.join(' ')
  return name
}

const getArgName = function(arg) {
  const argName = serializeArg(arg)
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
const fixDuplicate = function(name, index, names) {
  if (!isDuplicate(name, index, names)) {
    return name
  }

  return `${name} (${index})`
}

const isDuplicate = function(name, index, names) {
  return names.some((nameA, indexA) => nameA === name && index !== indexA)
}
