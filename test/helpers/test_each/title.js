import { serializeArg } from './serialize.js'

// Retrieve unique test titles for each iteration.
// To customize names inside a specific iterable, add `name` properties to it,
// for example with `Array.map()`.
// To customize whole titles, generate them inside the iterated function using
// all values.
export const getTitles = function(args) {
  return args.map(getTitle).map(fixDuplicate)
}

const getTitle = function(args) {
  const title = args.map(getName).join(' ')
  return `| ${title}`
}

const getName = function(arg) {
  const name = serializeArg(arg)
  const nameA = name.trim()
  const nameB = truncateName(nameA)
  return nameB
}

// Make names short by truncating them
const truncateName = function(name) {
  if (name.length <= MAX_NAME_LENGTH) {
    return name
  }

  const nameA = name.slice(0, MAX_NAME_LENGTH)
  return `${nameA}...`
}

const MAX_NAME_LENGTH = 60

// Ensure titles are unique by appending the index when we find duplicates
const fixDuplicate = function(title, index, titles) {
  if (!isDuplicate(title, index, titles)) {
    return title
  }

  return `${title} (${index})`
}

const isDuplicate = function(title, index, titles) {
  return titles.some((titleA, indexA) => titleA === title && index !== indexA)
}
