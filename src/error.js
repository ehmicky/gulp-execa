import PluginError from 'plugin-error'

// Throw a Gulp error, so it prints better.
// By passing `error`, we make sure `error` properties (e.g. from `execa`)
// are kept. They are not printed though, as error message should be enough.
export const throwError = (error, opts) => {
  const errorA = error instanceof Error ? error : new Error(error)

  if (errorA.shortMessage !== undefined) {
    // eslint-disable-next-line fp/no-mutation
    errorA.message = errorA.shortMessage
    // eslint-disable-next-line fp/no-delete
    delete errorA.shortMessage
  }

  throw new PluginError({ ...PLUGIN_ERROR_OPTS, ...opts, error: errorA })
}

const PLUGIN_ERROR_OPTS = {
  plugin: 'gulp-execa',
  showProperties: false,
  showStack: true,
}
