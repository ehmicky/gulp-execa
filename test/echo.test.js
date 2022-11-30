import test from 'ava'
import { each } from 'test-each'

import { METHODS } from './helpers/methods.test.js'
import { snapshotTest } from './helpers/snapshot.test.js'

each(
  METHODS,
  [{ opts: { echo: false } }, { opts: { echo: true } }],
  ({ title }, methodProps, data) =>
    test(`'echo' option | ${title}`, async (t) => {
      await snapshotTest({ t, methodProps, data })
    }),
)
