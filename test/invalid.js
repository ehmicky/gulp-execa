import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'
import { command } from './helpers/command.js'

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
    { command, opts: false },
    { command, opts: { cwd: false } },
    { command, opts: { env: false } },
    { command, opts: { argv0: false } },
    { command, opts: { stdio: false } },
    { command, opts: { detached: '' } },
    { command, opts: { uid: false } },
    { command, opts: { gid: false } },
    { command, opts: { shell: 0 } },
    { command, opts: { windowsVerbatimArguments: '' } },
    { command, opts: { windowsHide: '' } },
    { command, opts: { encoding: false } },
    { command, opts: { extendEnv: '' } },
    { command, opts: { stripFinalNewline: '' } },
    { command, opts: { preferLocal: '' } },
    { command, opts: { localDir: false } },
    { command, opts: { input: false } },
    { command, opts: { reject: '' } },
    { command, opts: { cleanup: '' } },
    { command, opts: { timeout: false } },
    { command, opts: { buffer: '' } },
    { command, opts: { maxBuffer: false } },
    { command, opts: { killSignal: false } },
    { command, opts: { stdin: false } },
    { command, opts: { stdout: false } },
    { command, opts: { stderr: false } },
    { command, opts: { invalid: false } },
    { command, opts: { result: 'invalid' } },
    { command, opts: { from: 'invalid' } },
  ],
  (suffix, methodProps, data) =>
    test(`Invalid options ${suffix}`, t =>
      snapshotTest({ t, methodProps, data })),
)

testEach(
  METHODS,
  [
    { command, opts: { encoding: 'invalid' } },
    { command: 'invalid', read: false },
  ],
  (suffix, methodProps, data) =>
    test(`Errored command ${suffix}`, t =>
      snapshotTest({ t, methodProps, data })),
)
