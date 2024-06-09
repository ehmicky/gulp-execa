import type { Readable, Transform } from 'node:stream'

import { exec, task, stream, type Options } from 'gulp-execa'
import { expectType, expectAssignable, expectNotAssignable } from 'tsd'
// eslint-disable-next-line n/no-extraneous-import, @typescript-eslint/no-shadow
import type File from 'vinyl'

const childProcess = exec('command')
expectType<Readable>(childProcess.stdout)
const execResult = await childProcess
expectType<number | undefined>(execResult.exitCode)

const taskResult = await task('command')()
expectType<number | undefined>(taskResult.exitCode)

const streamResult = stream(() => 'command')
expectType<Transform>(streamResult)

// @ts-expect-error
await exec()
// @ts-expect-error
task()
// @ts-expect-error
stream()

// @ts-expect-error
await exec(true)
// @ts-expect-error
task(true)
// @ts-expect-error
stream(true)

stream(() => undefined)
stream(() => ({ command: 'command' }))
stream(() => ({ command: 'command', maxConcurrency: 0 }))
// @ts-expect-error
stream(() => ({ maxConcurrency: 0 }))
// @ts-expect-error
stream(() => ({ command: 'command', maxConcurrency: true }))
// @ts-expect-error
stream(() => ({ command: 'command', shell: 0 }))
// @ts-expect-error
stream(() => true)
stream((file: File) => 'command')
// @ts-expect-error
stream((file: File, arg: boolean) => 'command')
// @ts-expect-error
stream((arg: boolean) => 'command')

await exec('command', {})
task('command', {})
stream(() => 'command', {})
expectAssignable<Options>({})
// @ts-expect-error
await exec('command', true)
// @ts-expect-error
task('command', true)
// @ts-expect-error
stream(() => 'command', true)
expectNotAssignable<Options>(true)

await exec('command', { echo: true })
task('command', { echo: true })
stream(() => 'command', { echo: true })
expectAssignable<Options>({ echo: true })
// @ts-expect-error
await exec('command', { echo: 'true' })
// @ts-expect-error
task('command', { echo: 'true' })
// @ts-expect-error
stream(() => 'command', { echo: 'true' })
expectNotAssignable<Options>({ echo: 'true' })

await exec('command', { debug: true })
task('command', { debug: true })
// @ts-expect-error
stream(() => 'command', { debug: true })
expectAssignable<Options>({ debug: true })
// @ts-expect-error
await exec('command', { debug: 'true' })
// @ts-expect-error
task('command', { debug: 'true' })
expectNotAssignable<Options>({ debug: 'true' })

// @ts-expect-error
stream(() => 'command', { stdout: 'inherit' })
// @ts-expect-error
stream(() => 'command', { stderr: 'inherit' })
// @ts-expect-error
stream(() => 'command', { all: 'inherit' })
// @ts-expect-error
stream(() => 'command', { stdio: 'inherit' })

stream(() => 'command', { maxConcurrency: 0 })
expectAssignable<Options>({ maxConcurrency: 0 })
// @ts-expect-error
stream(() => 'command', { maxConcurrency: true })
expectNotAssignable<Options>({ maxConcurrency: true })

stream(() => 'command', { from: 'stderr' })
stream(() => 'command', { from: 'stdout' })
stream(() => 'command', { from: 'all' })
expectAssignable<Options>({ from: 'stderr' })
// @ts-expect-error
stream(() => 'command', { from: 'other' })
expectNotAssignable<Options>({ from: 'other' })

stream(() => 'command', { result: 'save' })
stream(() => 'command', { result: 'replace' })
expectAssignable<Options>({ result: 'save' })
// @ts-expect-error
stream(() => 'command', { result: 'other' })
expectNotAssignable<Options>({ result: 'other' })
