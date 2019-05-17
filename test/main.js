import test from 'ava'

import { testEach } from './helpers/test_each/main.js'
import { snapshotTest } from './helpers/snapshot.js'
import { METHODS, STREAM_METHODS } from './helpers/methods.js'

testEach(
  METHODS,
  [
    { command: true },
    { command: ' ' },
    { command: 'echo test', opts: false },
    { command: 'echo test', opts: { cwd: false } },
    { command: 'echo test', opts: { env: false } },
    { command: 'echo test', opts: { argv0: false } },
    { command: 'echo test', opts: { stdio: false } },
    { command: 'echo test', opts: { detached: '' } },
    { command: 'echo test', opts: { uid: false } },
    { command: 'echo test', opts: { gid: false } },
    { command: 'echo test', opts: { shell: 0 } },
    { command: 'echo test', opts: { windowsVerbatimArguments: '' } },
    { command: 'echo test', opts: { windowsHide: '' } },
    { command: 'echo test', opts: { encoding: false } },
    { command: 'echo test', opts: { extendEnv: '' } },
    { command: 'echo test', opts: { stripFinalNewline: '' } },
    { command: 'echo test', opts: { preferLocal: '' } },
    { command: 'echo test', opts: { localDir: false } },
    { command: 'echo test', opts: { input: false } },
    { command: 'echo test', opts: { reject: '' } },
    { command: 'echo test', opts: { cleanup: '' } },
    { command: 'echo test', opts: { timeout: false } },
    { command: 'echo test', opts: { buffer: '' } },
    { command: 'echo test', opts: { maxBuffer: false } },
    { command: 'echo test', opts: { killSignal: false } },
    { command: 'echo test', opts: { stdin: false } },
    { command: 'echo test', opts: { stdout: false } },
    { command: 'echo test', opts: { stderr: false } },
    { command: 'echo test', opts: { invalid: false } },
    { command: 'echo test', opts: { result: 'invalid' } },
    { command: 'echo test', opts: { from: 'invalid' } },
    { command: 'echo test', opts: { encoding: 'invalid' } },
    { command: 'invalid', read: false },
    { command: 'echo test' },
    { command: 'echo test', execaOpts: { env: { CI: '1' } } },
    { command: 'echo test', opts: { echo: true } },
    { command: 'echo test', opts: { verbose: true } },
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
  (suffix, methodProps, data) => {
    test(`Dummy test ${suffix}`, t => snapshotTest({ t, methodProps, data }))
  },
)

test('should use the command as task name', t =>
  snapshotTest({
    t,
    methodProps: { method: 'task' },
    data: { task: 'nested', command: 'echo test' },
  }))

testEach(
  STREAM_METHODS,
  [
    { task: 'inputNotFunc', command: 'echo test' },
    { task: 'inputThrows' },
    { task: 'inputAsync', command: 'echo test' },
    { task: 'inputFile', command: 'echo' },
    { task: 'inputUndefined' },
    { task: 'severalFiles', command: 'echo test' },
    { command: 'echo test', opts: { encoding: 'utf8' } },
    { command: 'echo test', opts: { stripFinalNewline: true } },
  ],
  (suffix, methodProps, data) => {
    test(`Dummy test ${suffix}`, t => snapshotTest({ t, methodProps, data }))
  },
)
