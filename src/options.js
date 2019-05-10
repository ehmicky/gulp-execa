import { validate } from 'jest-validate'

import { pickBy } from './utils.js'

// Parse options
// TODO: validate options (including that `input` is a string)
export const parseOpts = function({ opts = {}, defaultOpts, forcedOpts = {} }) {
  const optsA = pickBy(opts, value => value !== undefined)

  const exampleConfig = pickBy(
    { ...EXAMPLE_OPTS, ...defaultOpts },
    (value, key) => forcedOpts[key] === undefined,
  )
  validate(optsA, { exampleConfig })

  const optsB = { ...DEFAULT_OPTS, ...defaultOpts, ...optsA, ...forcedOpts }
  const optsC = addVerbose({ opts: optsB })
  return optsC
}

const DEFAULT_OPTS = {}

const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  echo: true,
}

const addVerbose = function({ opts: { verbose, ...opts }, opts: { stdio } }) {
  if (!verbose) {
    return opts
  }

  // `execa` does not allow mixing `stdio` and `stdout|stderr` options
  if (stdio !== undefined) {
    return { echo: true, ...opts }
  }

  return { stdout: 'inherit', stderr: 'inherit', echo: true, ...opts }
}
