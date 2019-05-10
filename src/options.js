import { validate } from 'jest-validate'
import isCi from 'is-ci'

import { pickBy } from './utils.js'

// Parse main arguments and options
// TODO: validate options (including that `input` is a string)
export const parseOpts = function(opts = {}) {
  const optsA = pickBy(opts, value => value !== undefined)

  validate(optsA, { exampleConfig: EXAMPLE_OPTS })

  const optsB = { ...DEFAULT_OPTS, ...optsA }
  const optsC = addStdio({ opts: optsB })
  return optsC
}

const DEFAULT_OPTS = {
  // We default `opts.echo` to `false` for less verbosity.
  // However on CI we want to be verbose.
  echo: isCi,
}

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
