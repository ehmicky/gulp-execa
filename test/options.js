import test from 'ava'
import { each } from 'test-each'

import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

each(
  METHODS,
  [
    { opts: false },
    { opts: { cwd: false } },
    { opts: { env: false } },
    { opts: { argv0: false } },
    { opts: { stdio: false } },
    { opts: { serialization: false } },
    { opts: { detached: '' } },
    { opts: { uid: false } },
    { opts: { gid: false } },
    { opts: { shell: 0 } },
    { opts: { windowsVerbatimArguments: '' } },
    { opts: { windowsHide: '' } },
    { opts: { encoding: false } },
    { opts: { extendEnv: '' } },
    { opts: { stripFinalNewline: '' } },
    { opts: { preferLocal: '' } },
    { opts: { localDir: false } },
    { opts: { input: false } },
    { opts: { reject: '' } },
    { opts: { cleanup: '' } },
    { opts: { all: '' } },
    { opts: { execPath: false } },
    { opts: { timeout: false } },
    { opts: { buffer: '' } },
    { opts: { maxBuffer: false } },
    { opts: { killSignal: false } },
    { opts: { stdin: false } },
    { opts: { stdout: false } },
    { opts: { stderr: false } },
    { opts: { invalid: false } },
    { opts: { result: 'invalid' } },
    { opts: { from: 'invalid' } },
  ],
  ({ title }, methodProps, data) =>
    test(`Invalid options | ${title}`, async t => {
      await snapshotTest({ t, methodProps, data })
    }),
)

each(
  METHODS,
  [{ opts: { env: {} } }, { opts: { env: { test: true } } }],
  ({ title }, methodProps, data) =>
    test(`Valid options | ${title}`, async t => {
      await snapshotTest({ t, methodProps, data })
    }),
)

each(METHODS, [{}, { opts: {} }], ({ title }, methodProps, data) =>
  test(`No options | ${title}`, async t => {
    await snapshotTest({ t, methodProps, data })
  }),
)

each(
  METHODS,
  [{ command: 'gulp --version', opts: { env: { PATH: '' } } }],
  ({ title }, methodProps, data) =>
    test(`Default options | ${title}`, async t => {
      await snapshotTest({ t, methodProps, data })
    }),
)
