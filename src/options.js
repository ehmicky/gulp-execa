const isCi = require('is-ci')

// Parse main arguments and options
const parseOpts = function(opts) {
  const optsA = { ...DEFAULT_OPTS, ...opts }
  const optsB = addStdio({ opts: optsA })
  const optsC = { ...optsB, ...REQUIRED_OPTS }
  return optsC
}

const DEFAULT_OPTS = {
  // We default `opts.echo` to `false` for less verbosity.
  // However on CI we want to be verbose.
  echo: isCi,
}

// Default to printing shell output to console.
const addStdio = function({ opts, opts: { stdio } }) {
  // `execa` does not allow mixing `stdio` and `stdout|stderr` options
  if (stdio !== undefined) {
    return opts
  }

  return { stdout: 'inherit', stderr: 'inherit', ...opts }
}

const REQUIRED_OPTS = {
  // `shell` option encourages shell-specific syntax like globbing or
  // variables expansion
  shell: false,
  // This encourages shell-specific syntax as well
  windowsVerbatimArguments: false,
}

module.exports = {
  parseOpts,
}
