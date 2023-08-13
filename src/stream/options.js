export const getDefaultOpts = ({
  opts: { result = 'replace', from } = {},
}) => ({
  // This is too verbose if done on each iteration, even on CI
  verbose: false,
  // We use `through2-concurrent` because `through2` processes files serially.
  // The default is 16 which is too low.
  maxConcurrency: 100,
  // What to do with the result. Either 'save' or 'replace'.
  result: 'replace',
  // With `result: 'replace'` which stream to use: `stdout`, `stderr` or `all`
  from: 'stdout',
  // `from: 'all`` requires the `all` option
  all: from === 'all',
  ...resultDefaultOpts[result],
})

const resultDefaultOpts = {
  // `save` should retrieve output as string, but this is not needed for
  // `replace`. Same thing with final newline stripping.
  // eslint-disable-next-line unicorn/no-null
  replace: { encoding: null, stripFinalNewline: false },
}

export const forcedOpts = {
  // Forces piping stdout|stderr because:
  //  - `inherit` would be too verbose if done on each iteration.
  //  - `save` mode would not get `stdout|stderr|all` properties.
  //  - `replace` mode would not work.
  stdout: 'pipe',
  stderr: 'pipe',
  // `stdio` cannot be combined with `stdout|stderr` with execa
  stdio: undefined,
}
