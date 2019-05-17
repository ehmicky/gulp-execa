import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'

testEach([{ command: 'echo test' }], (suffix, data) =>
  test(`exec() ${suffix}`, t => snapshotTest({ t, data })),
)
