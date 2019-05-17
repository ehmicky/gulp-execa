import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'
import { command } from './helpers/command.js'

testEach(
  METHODS,
  [{ command, opts: { echo: false } }, { command, opts: { echo: true } }],
  (suffix, methodProps, data) =>
    test(`'echo' option ${suffix}`, t =>
      snapshotTest({ t, methodProps, data })),
)
