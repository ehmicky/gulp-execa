import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

testEach(
  METHODS,
  [
    { opts: { verbose: false } },
    { opts: { verbose: true } },
    { opts: { echo: false, verbose: false } },
    { opts: { echo: false, verbose: true } },
    { opts: { echo: true, verbose: false } },
    { opts: { echo: true, verbose: true } },
    { opts: { verbose: true, stdout: 'pipe', stderr: 'pipe' } },
    { opts: { verbose: true, stdio: 'pipe' } },
    { opts: { verbose: true, stdio: 'pipe', stdout: 'pipe', stderr: 'pipe' } },
  ],
  (title, methodProps, data) =>
    test(`'verbose' option | ${title}`, t =>
      snapshotTest({ t, methodProps, data })),
)
