import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

testEach(
  METHODS,
  [
    { command: 'echo test', opts: { echo: false } },
    { command: 'echo test', opts: { echo: true } },
  ],
  (suffix, methodProps, data) =>
    test(`'echo' option ${suffix}`, t =>
      snapshotTest({ t, methodProps, data })),
)
