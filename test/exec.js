import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { command } from './helpers/command.js'

testEach([{ command }], (suffix, data) =>
  test(`exec() ${suffix}`, t => snapshotTest({ t, data })),
)
