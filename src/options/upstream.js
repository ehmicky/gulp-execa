import { Buffer } from 'buffer'

import { multipleValidOptions } from 'jest-validate'

// Examples for the core `child_process.spawn()` options
export const CHILD_PROCESS_OPTS = {
  cwd: multipleValidOptions('/home/user', new URL('.', import.meta.url)),
  env: { HOME: '/home/user' },
  argv0: 'command',
  stdio: multipleValidOptions('pipe', ['pipe', 'pipe', 'pipe']),
  serialization: 'json',
  detached: false,
  uid: 0,
  gid: 0,
  shell: multipleValidOptions(true, '/bin/bash'),
  windowsVerbatimArguments: true,
  windowsHide: true,
  encoding: 'utf8',
}

// Hack to make `jest-validate` validate Streams but print them nicely
const stream = {
  toJSON() {
    return 'Stream'
  },
}

// Examples for the `execa` options
export const EXECA_OPTS = {
  extendEnv: true,
  stripFinalNewline: true,
  preferLocal: true,
  localDir: '/home/user',
  input: multipleValidOptions('input', Buffer.from(''), stream),
  reject: true,
  cleanup: true,
  all: true,
  execPath: '/usr/bin/node',
  timeout: 5000,
  buffer: true,
  maxBuffer: 1e8,
  // eslint-disable-next-line no-magic-numbers
  killSignal: multipleValidOptions('SIGTERM', 9),
  stdin: multipleValidOptions('pipe', 0, stream),
  stdout: multipleValidOptions('pipe', 1, stream),
  stderr: multipleValidOptions('pipe', 2, stream),
}
