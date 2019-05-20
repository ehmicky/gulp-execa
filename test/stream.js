import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { STREAM_METHODS } from './helpers/methods.js'

testEach(
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
    { opts: { encoding: 'utf8' } },
    { opts: { stripFinalNewline: true } },
  ],
  (title, methodProps, data) =>
    test(`stream() | ${title}`, t => snapshotTest({ t, methodProps, data })),
)
