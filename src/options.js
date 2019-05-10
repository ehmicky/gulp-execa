import isCi from 'is-ci'

// Parse main arguments and options
// TODO: validate options (including that `input` is a string)
export const parseOpts = function(opts) {
  const optsA = { ...DEFAULT_OPTS, ...opts }
  const optsB = addStdio({ opts: optsA })
  return optsB
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
