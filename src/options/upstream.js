import { Buffer } from 'buffer'
import { Stream, Readable } from 'stream'

import { multipleValidOptions } from 'jest-validate'

// Examples for the core `child_process.spawn()` options
export const CHILD_PROCESS_OPTS = {
  cwd: '/home/user',
  env: { HOME: '/home/user' },
  argv0: 'command',
  stdio: multipleValidOptions('pipe', ['pipe', 'pipe', 'pipe']),
  detached: false,
  uid: 0,
  gid: 0,
  shell: multipleValidOptions(true, '/bin/bash'),
  windowsVerbatimArguments: true,
  windowsHide: true,
  encoding: 'utf8',
}

// Examples for the `execa` options
export const EXECA_OPTS = {
  extendEnv: true,
  stripFinalNewline: true,
  preferLocal: true,
  localDir: '/home/user',
  input: multipleValidOptions('input', Buffer.from('input'), new Readable()),
  reject: true,
  cleanup: true,
  timeout: 5000,
  buffer: true,
  maxBuffer: 1e7,
  // eslint-disable-next-line no-magic-numbers
  killSignal: multipleValidOptions('SIGTERM', 9),
  stdin: multipleValidOptions('stdin', 0, new Stream()),
  stdout: multipleValidOptions('stdout', 1, new Stream()),
  stderr: multipleValidOptions('stderr', 2, new Stream()),
}
