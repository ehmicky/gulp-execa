import execa from 'execa'
import stripAnsi from 'strip-ansi'

const GULPFILES_DIR = `${__dirname}/gulpfiles`

export const snapshotTest = async function({ t, methodProps, data }) {
  const { exitCode, stdout, stderr } = await fireTask({
    ...methodProps,
    ...data,
    opts: { ...methodProps.opts, ...data.opts },
  })
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(exitCode)
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(stdout)
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(stderr)
  t.pass()
}

const fireTask = async function({
  method,
  task = 'main',
  command,
  opts,
  buffer,
  read,
  execaOpts: { env, ...execaOpts } = {},
}) {
  const input = JSON.stringify({ command, opts, buffer, read })
  const execaEnv = { INPUT: input, CI: '', ...env }
  const execaOptsA = { reject: false, env: execaEnv, ...execaOpts }
  const { exitCode, stdout, stderr } = await execa(
    `gulp --gulpfile ${GULPFILES_DIR}/${method}.js ${task}`,
    execaOptsA,
  )
  const stdoutA = normalizeMessage(stdout)
  const stderrA = normalizeMessage(stderr)
  return { exitCode, stdout: stdoutA, stderr: stderrA }
}

// Normalize console messages for testing
export const normalizeMessage = function(message) {
  const messageA = stripAnsi(message)
  const messageB = REPLACEMENTS.reduce(replacePart, messageA)
  const messageC = messageB.trim()
  return messageC
}

const replacePart = function(message, [before, after]) {
  return message.replace(before, after)
}

const REPLACEMENTS = [
  // File paths
  [/[^ (\n]+\/[^ )\n]+/gu, '/path'],
  // Stack traces
  [/ +at [^]+/gu, '    at STACK TRACE'],
  // Gulp shows file content that triggered an error
  [/[^]+Error:/gu, ''],
  // Timestamps
  [/\[\d{2}:\d{2}:\d{2}\]/gu, '[12:00:00]'],
  // Duration
  [/(\d+\.)?\d+ [μnm]s/gu, '100 ms'],
  // Make snapshots less verbose
  [/.*Working directory changed.*/gu, ''],
  [/.*Using gulpfile.*/gu, ''],
]
