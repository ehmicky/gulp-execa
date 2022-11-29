import test from 'ava'
import { each } from 'test-each'

import { EXEC_METHODS } from './helpers/methods.js'
import { snapshotTest } from './helpers/snapshot.js'

each(EXEC_METHODS, [{}], ({ title }, methodProps, data) =>
  test(`exec() | ${title}`, async (t) => {
    await snapshotTest({ t, methodProps, data })
  }),
)
