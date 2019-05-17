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
  [{ opts: { encoding: 'invalid' } }, { command: 'invalid', read: false }],
  (suffix, methodProps, data) =>
    test(`Errored command ${suffix}`, t =>
      snapshotTest({ t, methodProps, data })),
)
