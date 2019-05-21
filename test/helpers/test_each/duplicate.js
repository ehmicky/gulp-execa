// Ensure names are unique by appending the index when we find duplicates
export const fixDuplicate = function(loop, index, loops) {
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
