import { validate } from 'jest-validate'

import { pickBy } from './utils.js'

// Parse main arguments and options
// TODO: validate options (including that `input` is a string)
export const parseOpts = function({ opts = {}, defaultOpts, forcedOpts = {} }) {
  const optsA = pickBy(opts, value => value !== undefined)
  const optsB = { ...DEFAULT_OPTS, ...defaultOpts, ...optsA, ...forcedOpts }

  const exampleConfig = pickBy(
    { ...EXAMPLE_OPTS, ...defaultOpts },
    (value, key) => forcedOpts[key] === undefined,
  )
  validate(optsB, { exampleConfig })

  const optsC = addStdio({ opts: optsB })
  return optsC
}

const DEFAULT_OPTS = {}

const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
}

// Default to printing shell output to console.
const addStdio = function({ opts, opts: { stdio } }) {
  // `execa` does not allow mixing `stdio` and `stdout|stderr` options
  if (stdio !== undefined) {
    return opts
  }

  return { stdout: 'inherit', stderr: 'inherit', ...opts }
}
