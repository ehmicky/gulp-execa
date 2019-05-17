import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

testEach(
  METHODS,
  [{ command: true }, { command: ' ' }],
  (suffix, methodProps, data) =>
    test(`Invalid command ${suffix}`, t =>
      snapshotTest({ t, methodProps, data })),
)

testEach(
  METHODS,
  [
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
  ],
  (suffix, methodProps, data) =>
    test(`Invalid options ${suffix}`, t =>
      snapshotTest({ t, methodProps, data })),
)

testEach(
  METHODS,
  [
    { command: 'echo test', opts: { encoding: 'invalid' } },
    { command: 'invalid', read: false },
  ],
  (suffix, methodProps, data) =>
    test(`Errored command ${suffix}`, t =>
      snapshotTest({ t, methodProps, data })),
)
