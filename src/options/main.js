import { validate } from 'jest-validate'
import isPlainObj from 'is-plain-obj'
import filterObj from 'filter-obj'

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

  const optsA = filterObj(opts, isDefined)

  validateOpts({ opts: optsA, defaultOpts, forcedOpts })

  const optsB = { ...DEFAULT_OPTS, ...defaultOpts, ...optsA, ...forcedOpts }
  const optsC = addVerbose({ opts: optsB })
  return optsC
}

const validateBasic = function(opts) {
  if (!isPlainObj(opts)) {
    throwError(`Options must be a plain object: ${opts}`)
  }
}

const isDefined = function(key, value) {
  return value !== undefined
}

const validateOpts = function({ opts, defaultOpts, forcedOpts }) {
  validateCustom({ opts })

  const exampleConfig = filterObj(
    { ...EXAMPLE_OPTS, ...defaultOpts },
    key => !hasOwnProperty.call(forcedOpts, key),
  )

  try {
    validate(opts, { exampleConfig, recursiveBlacklist: ['env'] })
  } catch (error) {
    // `jest-validate` `error.stack` just repeats `error.message`
    throwError(error, { showStack: false })
  }
}

const DEFAULT_OPTS = {
  verbose: true,
  preferLocal: true,
}

const EXAMPLE_OPTS = {
  ...CHILD_PROCESS_OPTS,
  ...EXECA_OPTS,
  ...DEFAULT_OPTS,
  echo: true,
}
