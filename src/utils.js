// Like Lodash pickBy()
export const pickBy = function(object, condition) {
  const pairs = Object.entries(object).filter(([key, value]) =>
    condition(value, key),
  )
  return Object.fromEntries(pairs)
}

// Is a plain object, including `Object.create(null)`
export const isPlainObject = function(val) {
  return (
    typeof val === 'object' &&
    val !== null &&
    (val.constructor === Object || val.constructor === undefined)
  )
}
