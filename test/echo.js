import test from 'ava'
import { each } from 'test-each'

import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

each(
  METHODS,
  [{ opts: { echo: false } }, { opts: { echo: true } }],
  ({ title }, methodProps, data) =>
    test(`'echo' option | ${title}`, t => {
      snapshotTest({ t, methodProps, data })
    }),
)
