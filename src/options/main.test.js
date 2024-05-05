import { dirname } from 'node:path'
import { execPath } from 'node:process'

import test from 'ava'
import { each } from 'test-each'

import { METHODS } from '../helpers/methods.test.js'
import { snapshotTest } from '../helpers/snapshot.test.js'

each(
  METHODS,
  [
    { opts: false },
    { opts: { cwd: false } },
    { opts: { echo: 0 } },
    { opts: { verbose: 0 } },
    { opts: { result: 'invalid' } },
    { opts: { from: 'invalid' } },
  ],
  ({ title }, methodProps, data) =>
    test(`Invalid options | ${title}`, async (t) => {
      await snapshotTest({ t, methodProps, data })
    }),
)

each(
  [{ opts: { env: {} } }, { opts: { env: { test: true } } }],
  METHODS,
  ({ title }, data, methodProps) =>
    test(`Valid options | ${title}`, async (t) => {
      await snapshotTest({ t, methodProps, data })
    }),
)

each(METHODS, [{}, { opts: {} }], ({ title }, methodProps, data) =>
  test(`No options | ${title}`, async (t) => {
    await snapshotTest({ t, methodProps, data })
  }),
)

each(
  METHODS,
  [{ command: 'gulp --version', opts: { env: { PATH: dirname(execPath) } } }],
  ({ title }, methodProps, data) =>
    test(`Default options | ${title}`, async (t) => {
      await snapshotTest({ t, methodProps, data })
    }),
)
