import { serializeParam } from './serialize.js'

// Retrieve unique test names for each loop.
// To customize a specific iterable's names, add `name` properties to it,
// for example with `Array.map()`.
// To customize whole names, generate them using the iterated function
// parameters.
export const addNames = function({ index, indexes, params }) {
  const names = params.map(getName)
  const name = names.join(' ')
  return { name, names, index, indexes, params }
}

const getName = function(param) {
  const name = serializeParam(param)
  const nameA = truncateName(name)
  return nameA
}

// Make names short by truncating them
const truncateName = function(name) {
  if (name.length <= MAX_NAME_LENGTH) {
    return name
  }

  const start = name.slice(0, TRUNCATE_START_LENGTH)
  const end = name.slice(name.length - TRUNCATE_END_LENGTH)
  return `${start}...${end}`
}

const MAX_NAME_LENGTH = 60
const TRUNCATE_START_LENGTH = Math.ceil((MAX_NAME_LENGTH - 3) / 2)
const TRUNCATE_END_LENGTH = Math.floor((MAX_NAME_LENGTH - 3) / 2)
