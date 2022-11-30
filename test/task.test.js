import test from 'ava'
import { each } from 'test-each'

import { TASK_METHODS } from './helpers/methods.test.js'
import { snapshotTest } from './helpers/snapshot.test.js'

each(TASK_METHODS, [{}, { task: 'nested' }], ({ title }, methodProps, data) =>
  test(`task() | ${title}`, async (t) => {
    await snapshotTest({ t, methodProps, data })
  }),
)
