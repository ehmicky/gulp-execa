import { validate } from 'jest-validate'

import { isPlainObject, pickBy } from '../utils.js'
import { throwError } from '../error.js'

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
  validateBasic(opts)

  const optsA = pickBy(opts, value => value !== undefined)

  validateOpts({ opts: optsA, defaultOpts, forcedOpts })

  const optsB = { ...DEFAULT_OPTS, ...defaultOpts, ...optsA, ...forcedOpts }
  const optsC = addVerbose({ opts: optsB })
  return optsC
}

const validateBasic = function(opts) {
  if (!isPlainObject(opts)) {
    throwError(`Options must be a plain object: ${opts}`)
  }
}

const validateOpts = function({ opts, defaultOpts, forcedOpts }) {
  const exampleConfig = pickBy(
    { ...EXAMPLE_OPTS, ...defaultOpts },
    (value, key) => !hasOwnProperty.call(forcedOpts, key),
  )

  try {
    validate(opts, { exampleConfig })
  } catch (error) {
    // `jest-validate` `error.stack` just repeats `error.message`
    throwError(error, { showStack: false })
  }

  validateCustom({ opts })
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
