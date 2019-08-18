import test from 'ava'
import { each } from 'test-each'

import { snapshotTest } from './helpers/snapshot.js'
import { EXEC_METHODS } from './helpers/methods.js'

each(EXEC_METHODS, [{}], ({ title }, methodProps, data) =>
  test(`exec() | ${title}`, async t => {
    await snapshotTest({ t, methodProps, data })
  }),
)
