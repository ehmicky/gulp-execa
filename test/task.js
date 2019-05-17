import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { TASK_METHODS } from './helpers/methods.js'

testEach(TASK_METHODS, [{}, { task: 'nested' }], (suffix, data) =>
  test(`task() ${suffix}`, t =>
    snapshotTest({ t, methodProps: { method: 'task' }, data })),
)
