import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

testEach(
  METHODS,
  [
    { command: 'echo test', execaOpts: { env: { CI: '1' } } },
    { command: 'echo test', opts: { verbose: false } },
    { command: 'echo test', opts: { verbose: true } },
    { command: 'echo test', opts: { echo: false, verbose: false } },
    { command: 'echo test', opts: { echo: false, verbose: true } },
    { command: 'echo test', opts: { echo: true, verbose: false } },
    { command: 'echo test', opts: { echo: true, verbose: true } },
    {
      command: 'echo test',
      opts: { verbose: true, stdout: 'pipe', stderr: 'pipe' },
    },
    { command: 'echo test', opts: { verbose: true, stdio: 'pipe' } },
    {
      command: 'echo test',
      opts: { verbose: true, stdio: 'pipe', stdout: 'pipe', stderr: 'pipe' },
    },
  ],
  (suffix, methodProps, data) =>
    test(`'verbose' option ${suffix}`, t =>
      snapshotTest({ t, methodProps, data })),
)
