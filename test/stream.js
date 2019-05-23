import test from 'ava'
import testEach from 'test-each'

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
    { command: { command: 'echo test', stripFinalNewline: true } },
    { opts: { encoding: 'utf8' } },
    { opts: { stripFinalNewline: true } },
  ],
  ({ name }, methodProps, data) =>
    test(`stream() | ${name}`, t => snapshotTest({ t, methodProps, data })),
)
