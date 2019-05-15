import { validate } from 'jest-validate'
import isCi from 'is-ci'

import { isPlainObject, pickBy } from '../utils.js'

// Parse options
export const parseOpts = function({
  opts = {},
  defaultOpts = {},
  forcedOpts = {},
}) {
  validateOpts({ opts })

  const optsA = pickBy(opts, value => value !== undefined)

  const exampleConfig = pickBy(
    { ...EXAMPLE_OPTS, ...defaultOpts },
    (value, key) => forcedOpts[key] === undefined,
  )
  validate(optsA, { exampleConfig })

  validateCustom({ opts: optsA })

  const optsB = { ...DEFAULT_OPTS, ...defaultOpts, ...optsA, ...forcedOpts }
  const optsC = addVerbose({ opts: optsB })
  return optsC
}

const validateOpts = function({ opts }) {
  if (!isPlainObject(opts)) {
    throw new Error(`options must be a plain object: ${opts}`)
  }
}

const DEFAULT_OPTS = {
  verbose: isCi,
}

// Examples for the core `child_process.spawn()` options
const CHILD_PROCESS_OPTS = {
  windowsHide: true,
}

// Examples for the `execa` options
const EXECA_OPTS = {

}

const EXAMPLE_OPTS = {
  ...CHILD_PROCESS_OPTS,
  ...EXECA_OPTS,
  ...DEFAULT_OPTS,
  echo: true,
}

// Validation that cannot be handled by `jest-validate`
const validateCustom = function({ opts }) {
  Object.entries(ENUM_OPTS).forEach(([attrName, allowed]) => {
    validateEnum({ attrName, allowed, opts })
  })
}

const ENUM_OPTS = {
  result: ['save', 'replace'],
  from: ['stdout', 'stderr', 'all'],
}

// Validate an enum option
const validateEnum = function({
  attrName,
  allowed,
  opts: { [attrName]: value },
}) {
  if (value === undefined || allowed.includes(value)) {
    return
  }

  throw new Error(
    `option '${attrName}' '${value}' must be one of: ${allowed.join(', ')}`,
  )
}

// Translate `verbose` option into `stdout|stderr|echo` options
const addVerbose = function({ opts: { verbose, ...opts }, opts: { stdio } }) {
  if (!verbose) {
    // The default value for `echo` must be added here, not in `DEFAULT_OPTS`
    return { echo: false, ...opts }
  }

  // `execa` does not allow mixing `stdio` and `stdout|stderr` options
  if (stdio !== undefined) {
    return { echo: true, ...opts }
  }

  return { stdout: 'inherit', stderr: 'inherit', echo: true, ...opts }
}
