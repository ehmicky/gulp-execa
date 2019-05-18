import { serializeArg } from './serialize.js'

// Retrieve unique suffixes for each iteration
export const getSuffixes = function(args) {
  return args.map(getSuffix).map(fixDuplicate)
}

const getSuffix = function(args) {
  const suffix = args.map(getPart).join(' ')
  return `| ${suffix}`
}

const getPart = function(arg) {
  const part = serializeArg(arg)
  const partA = part.trim()
  const partB = truncatePart(partA)
  return partB
}

// Make suffix parts short by truncating them
const truncatePart = function(part) {
  if (part.length <= MAX_PART_LENGTH) {
    return part
  }

  const partA = part.slice(0, MAX_PART_LENGTH)
  return `${partA}...`
}

const MAX_PART_LENGTH = 60

// Ensure suffix parts are unique by appending the index when we find duplicates
const fixDuplicate = function(suffix, index, suffixes) {
  if (!isDuplicate(suffix, index, suffixes)) {
    return suffix
  }

  return `${suffix} (${index})`
}

const isDuplicate = function(suffix, index, suffixes) {
  return suffixes.some(
    (suffixA, indexA) => suffixA === suffix && index !== indexA,
  )
}
