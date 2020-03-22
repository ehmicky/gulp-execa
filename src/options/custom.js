import { throwError } from '../error.js'

// Validation that cannot be handled by `jest-validate`
export const validateCustom = function ({ opts }) {
  Object.entries(ENUM_OPTS).forEach(([attrName, allowed]) => {
    validateEnum({ attrName, allowed, opts })
  })
}

const ENUM_OPTS = {
  result: new Set(['save', 'replace']),
  from: new Set(['stdout', 'stderr', 'all']),
}

// Validate an enum option
const validateEnum = function ({
  attrName,
  allowed,
  opts: { [attrName]: value },
}) {
  if (value === undefined || allowed.has(value)) {
    return
  }

  throwError(
    `Option '${attrName}' '${value}' must be one of: ${[...allowed].join(
      ', ',
    )}`,
  )
}
