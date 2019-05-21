// Ensure names are unique by appending the index when we find duplicates
export const fixDuplicate = function(loop, index, loops) {
  const duplicateIndex = getDuplicateIndex(loop, loops)

  if (duplicateIndex === undefined) {
    return loop
  }

  const { name } = loop
  const nameA = `${name} (${duplicateIndex})`
  return { ...loop, name: nameA }
}

// The duplicate index is scoped to each specific duplicates group.
// This makes the duplicate indexes more stable:
//   - when changing other non-duplicate data
//   - when changing other duplicate data in the same iterable
//   - this is important in case the `name` is used in test snapshots
// This also makes more sense for the users.
const getDuplicateIndex = function({ name, index }, loops) {
  const duplicateLoops = loops.filter(loop => loop.name === name)

  if (duplicateLoops.length === 1) {
    return
  }

  return duplicateLoops.findIndex(loop => loop.index === index)
}
