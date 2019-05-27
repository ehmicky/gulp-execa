import test from 'ava'
import testEach from 'test-each'

import { snapshotTest } from './helpers/snapshot.js'
import { EXEC_METHODS } from './helpers/methods.js'

testEach(EXEC_METHODS, [{}], ({ title }, methodProps, data) =>
  test(`exec() | ${title}`, t => snapshotTest({ t, methodProps, data })),
)
