import test from 'ava'
import testEach from 'test-each'

import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

testEach(
  METHODS,
  [{ command: true }, { command: ' ' }],
  ({ name }, methodProps, data) =>
    test(`Invalid command | ${name}`, t =>
      snapshotTest({ t, methodProps, data })),
)

testEach(
  METHODS,
  [{ opts: { uid: 0.5 } }, { command: 'invalid', read: false }],
  ({ name }, methodProps, data) =>
    test(`Errored command | ${name}`, t =>
      snapshotTest({ t, methodProps, data })),
)
