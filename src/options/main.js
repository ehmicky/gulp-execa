import { excludeKeys } from 'filter-obj'
import isPlainObj from 'is-plain-obj'
import { validate } from 'jest-validate'

import { throwError } from '../error.js'

import { validateCustom } from './custom.js'
import { CHILD_PROCESS_OPTS, EXECA_OPTS } from './upstream.js'
import { addVerbose } from './verbose.js'

// Makes it work with `Object.create(null)`
// eslint-disable-next-line no-shadow
const { hasOwnProperty } = Object.prototype

// Parse options
export const parseOpts = ({ opts = {}, defaultOpts = {}, forcedOpts = {} }) => {
  validateBasic(opts)

  const optsA = excludeKeys(opts, isUndefined)

  validateOpts({ opts: optsA, defaultOpts, forcedOpts })

  const optsB = { ...DEFAULT_OPTS, ...defaultOpts, ...optsA, ...forcedOpts }
  const optsC = addVerbose({ opts: optsB })
  return optsC
}

const validateBasic = (opts) => {
  if (!isPlainObj(opts)) {
    throwError(`Options must be a plain object: ${opts}`)
  }
}

const isUndefined = (key, value) => value === undefined

const validateOpts = ({ opts, defaultOpts, forcedOpts }) => {
  validateCustom({ opts })

  const exampleConfig = excludeKeys(
    { ...EXAMPLE_OPTS, ...defaultOpts },
    (key) => hasOwnProperty.call(forcedOpts, key),
  )

  try {
    validate(opts, { exampleConfig, recursiveDenylist: ['env'] })
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
