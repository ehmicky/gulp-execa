// Like Lodash pickBy()
export const pickBy = function(object, condition) {
  const pairs = Object.entries(object).filter(([key, value]) =>
    condition(value, key),
  )
  return Object.fromEntries(pairs)
}
