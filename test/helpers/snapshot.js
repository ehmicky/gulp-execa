import { fileURLToPath } from 'node:url'

import { execaCommand } from 'execa'

import { normalizeMessage } from './normalize.js'

const GULPFILES_DIR = fileURLToPath(new URL('gulpfiles', import.meta.url))

// Almost all unit tests follow the same principle by calling this helper:
//   - `gulp --gulpfile GULPFILE TASK` is fired using `execa`
//   - the exit code, stdout and stderr are snapshot
export const snapshotTest = async function ({ t, methodProps = {}, data }) {
  const opts = getOpts({ methodProps, data })
  const { exitCode, stdout, stderr } = await fireTask({
    ...methodProps,
    ...data,
    opts,
  })
  t.snapshot({ exitCode, stdout, stderr })
}

const getOpts = function ({ methodProps, data }) {
  // Allows testing when `opts` is `undefined`
  if (methodProps.opts === undefined && data.opts === undefined) {
    return
  }

  return mergeOpts({ methodProps, data })
}

const mergeOpts = function ({ methodProps, data }) {
  // Allows testing for invalid `opts` and `opts: Object.create(null)`
  if (data.opts === false || methodProps.opts === undefined) {
    return data.opts
  }

  return { ...methodProps.opts, ...data.opts }
}

const fireTask = async function ({
  // Test gulpfile to use
  method,
  // Gulp task name
  task = 'main',
  // Triggers `gulpExeca(command, opts)`
  command = 'echo test',
  opts,
  // With `stream()`, use `gulp.src(..., { buffer })`
  buffer,
  // See `stream()` gulpfile
  read,
  // `execa` options
  execaOpts,
}) {
  const execaOptsA = getExecaOpts({ command, opts, buffer, read, execaOpts })

  const { exitCode, stdout, stderr } = await execaCommand(
    `gulp --gulpfile ${GULPFILES_DIR}/${method}.js ${task}`,
    execaOptsA,
  )
  const stdoutA = normalizeMessage(stdout)
  const stderrA = normalizeMessage(stderr)
  return { exitCode, stdout: stdoutA, stderr: stderrA }
}

const getExecaOpts = function ({
  command,
  opts,
  buffer,
  read,
  execaOpts: { env, ...execaOpts } = {},
}) {
  // Some information is passed to the gulpfile using the environment variable
  // `INPUT`, which is a JSON object.
  const input = JSON.stringify({ command, opts, buffer, read })

  const execaEnv = { INPUT: input, ...env }
  return { reject: false, env: execaEnv, ...execaOpts }
}
