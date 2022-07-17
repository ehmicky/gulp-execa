import type { Readable, Transform } from 'stream'

import { exec, task, stream, Options } from 'gulp-execa'
import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectError,
} from 'tsd'

const childProcess = exec('command')
expectType<Readable>(childProcess.stdout!)
const execResult = await childProcess
expectType<number>(execResult.exitCode)

const taskResult = await task('command')()
expectType<number>(taskResult.exitCode)

const streamResult = stream(() => 'command')
expectType<Transform>(streamResult)

expectError(exec())
expectError(task())
expectError(stream())

exec('command', {})
task('command', {})
stream(() => 'command', {})
expectAssignable<Options>({})
expectError(exec('command', true))
expectError(task('command', true))
expectError(stream(() => 'command', true))
expectNotAssignable<Options>(true)
