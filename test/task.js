import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { command } from './helpers/command.js'

testEach([{ command }, { task: 'nested', command }], (suffix, data) =>
  test(`task() ${suffix}`, t =>
    snapshotTest({ t, methodProps: { method: 'task' }, data })),
)
