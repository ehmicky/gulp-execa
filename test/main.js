import { inspect } from 'util'

import test from 'ava'
import execa from 'execa'

const GULPFILE = `${__dirname}/helpers/test.gulpfile.js`

const METHODS = [
  { method: 'exec' },
  { method: 'task' },
  { method: 'stream' },
  { method: 'stream', buffer: false },
  { method: 'stream', streamOpts: { result: 'save' } },
]

const DATA = [
  { command: true },
  { command: ' ' },
  { command: 'echo test', opts: { verbose: true } },
]

METHODS.forEach(methodProps => {
  DATA.forEach(datum => {
    // eslint-disable-next-line max-nested-callbacks
    test(`[${inspect(methodProps)}] [${inspect(datum)}] Dummy test`, async t => {
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

const fireTask = async function({ method, command, opts, streamOpts, buffer }) {
  const input = JSON.stringify({ command, opts, streamOpts, buffer })
  const { exitCode, stdout, stderr } = await execa(`gulp --gulpfile ${GULPFILE} ${method}Func`, { reject: false, env: { INPUT: input } })
  const stdoutA = normalizeMessage(stdout)
  const stderrA = normalizeMessage(stderr)
  return { exitCode, stdout: stdoutA, stderr: stderrA }
}

// Normalize console messages for testing
export const normalizeMessage = function(message) {
  return REPLACEMENTS.reduce(replacePart, message)
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
  [/[^]+Error: /gu, ''],
  // Timestamps
  [/\[\d{2}:\d{2}:\d{2}\]/gu, '[12:00:00]'],
  // Duration
  [/(\d+\.)?\d+ [μnm]s/gu, '100 ms'],
]

