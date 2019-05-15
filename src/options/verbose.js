// Translate `verbose` option into `stdout|stderr|echo` options
export const addVerbose = function({ opts: { verbose, ...opts }, opts: { stdio } }) {
  if (!verbose) {
    // The default value for `echo` must be added here, not in `DEFAULT_OPTS`
    return { echo: false, ...opts }
  }

  // `execa` does not allow mixing `stdio` and `stdout|stderr` options
  if (stdio !== undefined) {
    return { echo: true, ...opts }
  }

  return { stdout: 'inherit', stderr: 'inherit', echo: true, ...opts }
}
