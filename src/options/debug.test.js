import test from 'ava'
import { each } from 'test-each'

import { METHODS } from '../helpers/methods.test.js'
import { snapshotTest } from '../helpers/snapshot.test.js'

each(
  METHODS,
  [
    { opts: { debug: false } },
    { opts: { debug: true } },
    { opts: { echo: false, debug: false } },
    { opts: { echo: false, debug: true } },
    { opts: { echo: true, debug: false } },
    { opts: { echo: true, debug: true } },
    { opts: { debug: true, stdout: 'pipe', stderr: 'pipe' } },
    { opts: { debug: true, stdio: 'pipe' } },
    { opts: { debug: true, stdio: 'pipe', stdout: 'pipe', stderr: 'pipe' } },
  ],
  ({ title }, methodProps, data) =>
    // Use `serial()`, otherwise Windows CI crashes with OOM
    test.serial(`'debug' option | ${title}`, async (t) => {
      await snapshotTest({ t, methodProps, data })
    }),
)
