import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { STREAM_METHODS } from './helpers/methods.js'

testEach(
  STREAM_METHODS,
  [
    { task: 'inputNotFunc' },
    { task: 'inputThrows' },
    { task: 'inputAsync' },
    { task: 'inputFile', command: 'echo' },
    { task: 'inputUndefined' },
    { task: 'severalFiles' },
    {},
    { opts: { encoding: 'utf8' } },
    { opts: { stripFinalNewline: true } },
  ],
  (suffix, methodProps, data) =>
    test(`stream() ${suffix}`, t => snapshotTest({ t, methodProps, data })),
)
