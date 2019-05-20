import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

testEach(
  METHODS,
  [{ command: true }, { command: ' ' }],
  (title, methodProps, data) =>
    test(`Invalid command ${title}`, t =>
      snapshotTest({ t, methodProps, data })),
)

testEach(
  METHODS,
  [{ opts: { uid: 0.5 } }, { command: 'invalid', read: false }],
  (title, methodProps, data) =>
    test(`Errored command ${title}`, t =>
      snapshotTest({ t, methodProps, data })),
)
