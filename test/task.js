import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'

testEach(
  [{ command: 'echo test' }, { task: 'nested', command: 'echo test' }],
  (suffix, data) =>
    test(`task() ${suffix}`, t =>
      snapshotTest({ t, methodProps: { method: 'task' }, data })),
)
