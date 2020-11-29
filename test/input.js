import test from 'ava'
import { each } from 'test-each'

import { METHODS } from './helpers/methods.js'
import { snapshotTest } from './helpers/snapshot.js'

each(
  METHODS,
  [{ command: true }, { command: ' ' }],
  ({ title }, methodProps, data) =>
    test(`Invalid command | ${title}`, async (t) => {
      await snapshotTest({ t, methodProps, data })
    }),
)

each(
  METHODS,
  [{ opts: { uid: 0.5 } }, { command: 'node --invalid', read: false }],
  ({ title }, methodProps, data) =>
    test(`Errored command | ${title}`, async (t) => {
      await snapshotTest({ t, methodProps, data })
    }),
)
