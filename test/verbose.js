import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'
import { command } from './helpers/command.js'

testEach(
  METHODS,
  [
    { command, execaOpts: { env: { CI: '1' } } },
    { command, opts: { verbose: false } },
    { command, opts: { verbose: true } },
    { command, opts: { echo: false, verbose: false } },
    { command, opts: { echo: false, verbose: true } },
    { command, opts: { echo: true, verbose: false } },
    { command, opts: { echo: true, verbose: true } },
    {
      command,
      opts: { verbose: true, stdout: 'pipe', stderr: 'pipe' },
    },
    { command, opts: { verbose: true, stdio: 'pipe' } },
    {
      command,
      opts: { verbose: true, stdio: 'pipe', stdout: 'pipe', stderr: 'pipe' },
    },
  ],
  (suffix, methodProps, data) =>
    test(`'verbose' option ${suffix}`, t =>
      snapshotTest({ t, methodProps, data })),
)
