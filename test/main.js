import { inspect } from 'util'

import test from 'ava'
import execa from 'execa'

const GULPFILES_DIR = `${__dirname}/helpers/gulpfiles`

const METHODS = [
  { method: 'exec' },
  { method: 'task' },
  { method: 'stream' },
  { method: 'stream', buffer: false },
  { method: 'stream', opts: { result: 'save' } },
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
  { command: 'echo test' },
  { command: 'echo test', opts: { verbose: true } },
]

METHODS.forEach(methodProps => {
  DATA.forEach(datum => {
    test(`[${inspect(methodProps)}] [${inspect(
      datum,
      // eslint-disable-next-line max-nested-callbacks
    )}] Dummy test`, async t => {
      const { exitCode, stdout, stderr } = await fireTask({
        ...methodProps,
        ...datum,
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

const fireTask = async function({ method, command, opts, buffer }) {
  const input = JSON.stringify({ command, opts, buffer })
  const { exitCode, stdout, stderr } = await execa(
    `gulp --gulpfile ${GULPFILES_DIR}/${method}.js main`,
    { reject: false, env: { INPUT: input } },
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
