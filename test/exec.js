import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { EXEC_METHODS } from './helpers/methods.js'

testEach(EXEC_METHODS, [{}], (suffix, methodProps, data) =>
  test(`exec() ${suffix}`, t => snapshotTest({ t, methodProps, data })),
)
