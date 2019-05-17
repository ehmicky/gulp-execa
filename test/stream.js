import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { STREAM_METHODS } from './helpers/methods.js'
import { command } from './helpers/command.js'

testEach(
  STREAM_METHODS,
  [
    { task: 'inputNotFunc', command },
    { task: 'inputThrows' },
    { task: 'inputAsync', command },
    { task: 'inputFile', command: 'echo' },
    { task: 'inputUndefined' },
    { task: 'severalFiles', command },
    { command },
    { command, opts: { encoding: 'utf8' } },
    { command, opts: { stripFinalNewline: true } },
  ],
  (suffix, methodProps, data) =>
    test(`stream() ${suffix}`, t => snapshotTest({ t, methodProps, data })),
)
