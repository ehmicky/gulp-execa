import test from 'ava'
import { each } from 'test-each'

import { METHODS } from '../helpers/methods.test.js'
import { snapshotTest } from '../helpers/snapshot.test.js'

each(
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
  ({ title }, methodProps, data) =>
    // Use `serial()`, otherwise Windows CI crashes with OOM
    test.serial(`'verbose' option | ${title}`, async (t) => {
      await snapshotTest({ t, methodProps, data })
    }),
)
