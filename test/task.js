import test from 'ava'
import { each } from 'test-each'

import { snapshotTest } from './helpers/snapshot.js'
import { TASK_METHODS } from './helpers/methods.js'

each(TASK_METHODS, [{}, { task: 'nested' }], ({ title }, methodProps, data) =>
  test(`task() | ${title}`, t => {
    snapshotTest({ t, methodProps, data })
  }),
)
