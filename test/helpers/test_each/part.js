import { serializeArg } from './serialize.js'

// Transform args into suffix parts
export const reduceParts = function(args) {
  const { parts } = args.reduce(reducePart, { parts: [], index: 0 })
  return parts
}

const reducePart = function({ parts, index }, arg) {
  const part = getPart(arg)
  const { part: partA, index: indexA } = fixDuplicate({ parts, part, index })
  const partsA = [...parts, partA]
  return { parts: partsA, index: indexA }
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

// Ensure suffix parts are unique by appending an incrementing counter when we
// find duplicates
const fixDuplicate = function({ parts, part, index }) {
  if (!isDuplicate({ parts, part })) {
    return { part, index }
  }

  const indexA = index + 1
  const partA = `${part} ${indexA}`
  return { part: partA, index: indexA }
}

const isDuplicate = function({ parts, part }) {
  return parts.some(partA => partA === part)
}
