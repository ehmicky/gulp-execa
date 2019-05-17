import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

testEach(
  METHODS,
  [
    { execaOpts: { env: { CI: '1' } } },
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
  (suffix, methodProps, data) =>
    test(`'verbose' option ${suffix}`, t =>
      snapshotTest({ t, methodProps, data })),
)
