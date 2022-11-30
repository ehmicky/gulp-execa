import test from 'ava'
import { each } from 'test-each'

import { STREAM_METHODS } from './helpers/methods.test.js'
import { snapshotTest } from './helpers/snapshot.test.js'

each(
  STREAM_METHODS,
  [
    { task: 'inputNotFunc' },
    { task: 'inputThrows' },
    { task: 'inputThrowsAsync' },
    { task: 'inputAsync' },
    { task: 'inputFile', command: 'echo' },
    { task: 'inputUndefined' },
    { task: 'severalFiles' },
    { task: 'severalTimes' },
    {},
    { command: { command: 'echo test', stripFinalNewline: true } },
    { opts: { encoding: 'utf8' } },
    { opts: { stripFinalNewline: true } },
  ],
  ({ title }, methodProps, data) =>
    test(`stream() | ${title}`, async (t) => {
      await snapshotTest({ t, methodProps, data })
    }),
)
