import type { Readable, Transform } from 'stream'

import { exec, task, stream, Options } from 'gulp-execa'
import type File = require('vinyl')
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

expectError(exec(true))
expectError(task(true))
expectError(stream(true))

stream(() => undefined)
stream(() => ({ command: 'command' }))
stream(() => ({ command: 'command', maxConcurrency: 0 }))
expectError(stream(() => ({ maxConcurrency: 0 })))
expectError(stream(() => ({ command: 'command', maxConcurrency: true })))
expectError(stream(() => ({ command: 'command', shell: 0 })))
expectError(stream(() => true))
stream((file: File) => 'command')
expectError(stream((file: File, arg: boolean) => 'command'))
expectError(stream((arg: boolean) => 'command'))

exec('command', {})
task('command', {})
stream(() => 'command', {})
expectAssignable<Options>({})
expectError(exec('command', true))
expectError(task('command', true))
expectError(stream(() => 'command', true))
expectNotAssignable<Options>(true)

exec('command', { echo: true })
task('command', { echo: true })
stream(() => 'command', { echo: true })
expectAssignable<Options>({ echo: true })
expectError(exec('command', { echo: 'true' }))
expectError(task('command', { echo: 'true' }))
expectError(stream(() => 'command', { echo: 'true' }))
expectNotAssignable<Options>({ echo: 'true' })

exec('command', { verbose: true })
task('command', { verbose: true })
expectError(stream(() => 'command', { verbose: true }))
expectAssignable<Options>({ verbose: true })
expectError(exec('command', { verbose: 'true' }))
expectError(task('command', { verbose: 'true' }))
expectNotAssignable<Options>({ verbose: 'true' })

expectError(stream(() => 'command', { stdout: 'inherit' }))
expectError(stream(() => 'command', { stderr: 'inherit' }))
expectError(stream(() => 'command', { all: 'inherit' }))
expectError(stream(() => 'command', { stdio: 'inherit' }))

stream(() => 'command', { maxConcurrency: 0 })
expectAssignable<Options>({ maxConcurrency: 0 })
expectError(stream(() => 'command', { maxConcurrency: true }))
expectNotAssignable<Options>({ maxConcurrency: true })

stream(() => 'command', { from: 'stderr' })
stream(() => 'command', { from: 'stdout' })
stream(() => 'command', { from: 'all' })
expectAssignable<Options>({ from: 'stderr' })
expectError(stream(() => 'command', { from: 'other' }))
expectNotAssignable<Options>({ from: 'other' })

stream(() => 'command', { result: 'save' })
stream(() => 'command', { result: 'replace' })
expectAssignable<Options>({ result: 'save' })
expectError(stream(() => 'command', { result: 'other' }))
expectNotAssignable<Options>({ result: 'other' })
