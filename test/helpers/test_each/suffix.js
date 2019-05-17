import { fastCartesian } from './fast_cartesian.js'
import { reduceParts } from './part.js'

// Retrieve unique suffixes for each iteration
export const getSuffixes = function(iterables) {
  const parts = iterables.map(getParts)
  const partsA = fastCartesian(...parts)
  const suffixes = partsA.map(joinParts)
  return suffixes
}

const getParts = function(iterable) {
  const args = [...iterable]
  return reduceParts(args)
}

const joinParts = function(parts) {
  const suffix = parts.join(' ')
  return `| ${suffix}`
}
