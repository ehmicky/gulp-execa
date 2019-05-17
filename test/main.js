import { inspect } from 'util'

import test from 'ava'
import execa from 'execa'

const GULPFILES_DIR = `${__dirname}/helpers/gulpfiles`

const STREAM_METHODS = [
  { suffix: 'stream-buffer', method: 'stream' },
  { suffix: 'stream-stream', method: 'stream', buffer: false },
  { suffix: 'stream-save', method: 'stream', opts: { result: 'save' } },
]

const METHODS = [
  { suffix: 'exec', method: 'exec' },
  { suffix: 'task', method: 'task' },
  ...STREAM_METHODS,
]

const DATA = [
  { command: true },
  { command: ' ' },
  { command: 'echo test', opts: false },
  { command: 'echo test', opts: { cwd: false } },
  { command: 'echo test', opts: { env: false } },
  { command: 'echo test', opts: { argv0: false } },
  { command: 'echo test', opts: { stdio: false } },
  { command: 'echo test', opts: { detached: '' } },
  { command: 'echo test', opts: { uid: false } },
  { command: 'echo test', opts: { gid: false } },
  { command: 'echo test', opts: { shell: 0 } },
  { command: 'echo test', opts: { windowsVerbatimArguments: '' } },
  { command: 'echo test', opts: { windowsHide: '' } },
  { command: 'echo test', opts: { encoding: false } },
  { command: 'echo test', opts: { extendEnv: '' } },
  { command: 'echo test', opts: { stripFinalNewline: '' } },
  { command: 'echo test', opts: { preferLocal: '' } },
  { command: 'echo test', opts: { localDir: false } },
  { command: 'echo test', opts: { input: false } },
  { command: 'echo test', opts: { reject: '' } },
  { command: 'echo test', opts: { cleanup: '' } },
  { command: 'echo test', opts: { timeout: false } },
  { command: 'echo test', opts: { buffer: '' } },
  { command: 'echo test', opts: { maxBuffer: false } },
  { command: 'echo test', opts: { killSignal: false } },
  { command: 'echo test', opts: { stdin: false } },
  { command: 'echo test', opts: { stdout: false } },
  { command: 'echo test', opts: { stderr: false } },
  { command: 'echo test', opts: { invalid: false } },
  { command: 'echo test', opts: { result: 'invalid' } },
  { command: 'echo test', opts: { from: 'invalid' } },
  { command: 'echo test', opts: { encoding: 'invalid' } },
  { command: 'invalid', read: false },
  { command: 'echo test' },
  { command: 'echo test', execaOpts: { env: { CI: '1' } } },
  { command: 'echo test', opts: { echo: true } },
  { command: 'echo test', opts: { verbose: true } },
  { command: 'echo test', opts: { echo: false, verbose: true } },
  { command: 'echo test', opts: { echo: true, verbose: false } },
  { command: 'echo test', opts: { echo: true, verbose: true } },
  {
    command: 'echo test',
    opts: { verbose: true, stdout: 'pipe', stderr: 'pipe' },
  },
  { command: 'echo test', opts: { verbose: true, stdio: 'pipe' } },
  {
    command: 'echo test',
    opts: { verbose: true, stdio: 'pipe', stdout: 'pipe', stderr: 'pipe' },
  },
]

const getSuffix = function(args) {
  const suffix = args.map(serializeArg).join(' ')
  return `| ${suffix}`
}

const serializeArg = function(arg) {
  if (isPlainObject(arg) && typeof arg.suffix === 'string') {
    return arg.suffix
  }

  if (typeof arg === 'string') {
    return arg
  }

  return inspect(arg, INSPECT_OPTS)
}

const isPlainObject = function(value) {
  return value && typeof value === 'object'
}

// Make suffix short and on a single line
const INSPECT_OPTS = {
  breakLength: Infinity,
  depth: 1,
  maxArrayLength: 3,
  compact: true,
}

METHODS.forEach(methodProps => {
  DATA.forEach(datum => {
    const suffix = getSuffix([methodProps, datum])
    // eslint-disable-next-line max-nested-callbacks
    test(`Dummy test ${suffix}`, async t => {
      const { exitCode, stdout, stderr } = await fireTask({
        ...methodProps,
        ...datum,
        opts: { ...methodProps.opts, ...datum.opts },
      })
      // eslint-disable-next-line no-restricted-globals, no-console
      console.log(exitCode)
      // eslint-disable-next-line no-restricted-globals, no-console
      console.log(stdout)
      // eslint-disable-next-line no-restricted-globals, no-console
      console.log(stderr)
      t.pass()
    })
  })
})

test('should use the command as task name', async t => {
  const { exitCode, stdout, stderr } = await fireTask({
    method: 'task',
    task: 'nested',
    command: 'echo test',
  })
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(exitCode)
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(stdout)
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(stderr)
  t.pass()
})

const STREAM_DATA = [
  { task: 'inputNotFunc', command: 'echo test' },
  { task: 'inputThrows' },
  { task: 'inputAsync', command: 'echo test' },
  { task: 'inputFile', command: 'echo' },
  { task: 'inputUndefined' },
  { task: 'severalFiles', command: 'echo test' },
  { command: 'echo test', opts: { encoding: 'utf8' } },
  { command: 'echo test', opts: { stripFinalNewline: true } },
]

STREAM_METHODS.forEach(methodProps => {
  STREAM_DATA.forEach(datum => {
    const suffix = getSuffix([methodProps, datum])
    // eslint-disable-next-line max-nested-callbacks
    test(`Dummy test ${suffix}`, async t => {
      const { exitCode, stdout, stderr } = await fireTask({
        ...methodProps,
        ...datum,
        opts: { ...methodProps.opts, ...datum.opts },
      })
      // eslint-disable-next-line no-restricted-globals, no-console
      console.log(exitCode)
      // eslint-disable-next-line no-restricted-globals, no-console
      console.log(stdout)
      // eslint-disable-next-line no-restricted-globals, no-console
      console.log(stderr)
      t.pass()
    })
  })
})

const fireTask = async function({
  method,
  task = 'main',
  execaOpts: { env, ...execaOpts } = {},
  ...input
}) {
  const inputA = JSON.stringify(input)
  const { exitCode, stdout, stderr } = await execa(
    `gulp --gulpfile ${GULPFILES_DIR}/${method}.js ${task}`,
    { reject: false, env: { INPUT: inputA, CI: '', ...env }, ...execaOpts },
  )
  const stdoutA = normalizeMessage(stdout)
  const stderrA = normalizeMessage(stderr)
  return { exitCode, stdout: stdoutA, stderr: stderrA }
}

// Normalize console messages for testing
export const normalizeMessage = function(message) {
  return REPLACEMENTS.reduce(replacePart, message).trim()
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
