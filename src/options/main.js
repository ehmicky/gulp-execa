import { validate } from 'jest-validate'

import { isPlainObject, pickBy } from '../utils.js'
import { throwError, handleError } from '../error.js'

import { CHILD_PROCESS_OPTS, EXECA_OPTS } from './upstream.js'
import { validateCustom } from './custom.js'
import { addVerbose } from './verbose.js'

// Makes it work with `Object.create(null)`
// eslint-disable-next-line no-shadow
const { hasOwnProperty } = Object.prototype

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
    (value, key) => !hasOwnProperty.call(forcedOpts, key),
  )

  kValidate(optsA, { exampleConfig })

  validateCustom({ opts: optsA })

  const optsB = { ...DEFAULT_OPTS, ...defaultOpts, ...optsA, ...forcedOpts }
  const optsC = addVerbose({ opts: optsB })
  return optsC
}

// `jest-validate` `error.stack` just repeats `error.message`
const kValidate = handleError(validate, { showStack: false })

const validateOpts = function({ opts }) {
  if (!isPlainObject(opts)) {
    throwError(`Options must be a plain object: ${opts}`)
  }
}

const DEFAULT_OPTS = {
  verbose: true,
}

const EXAMPLE_OPTS = {
  ...CHILD_PROCESS_OPTS,
  ...EXECA_OPTS,
  ...DEFAULT_OPTS,
  echo: true,
}
