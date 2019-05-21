import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

testEach(
  METHODS,
  [{ opts: { echo: false } }, { opts: { echo: true } }],
  ({ name }, methodProps, data) =>
    test(`'echo' option | ${name}`, t =>
      snapshotTest({ t, methodProps, data })),
)
