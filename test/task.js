import test from 'ava'
import testEach from 'test-each'

import { snapshotTest } from './helpers/snapshot.js'
import { TASK_METHODS } from './helpers/methods.js'

testEach(
  TASK_METHODS,
  [{}, { task: 'nested' }],
  ({ name }, methodProps, data) =>
    test(`task() | ${name}`, t => snapshotTest({ t, methodProps, data })),
)
