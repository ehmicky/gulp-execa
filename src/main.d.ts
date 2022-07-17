import type { Transform } from 'stream'

import type { Options as ExecaOptions, ExecaChildProcess } from 'execa'
import type File = require('vinyl')

type NonStreamOptions = ExecaOptions &
  Readonly<
    Partial<{
      /**
       * Whether the `command` should be printed on the console.
       *
       * @default `true` for `task()` and `exec()`, `false` for `stream()`
       */
      echo: boolean

      /**
       * Whether both the `command` and its output (`stdout`/`stderr`) should be
       * printed on the console instead of being returned in JavaScript.
       *
       * @default `true` for `task()` and `exec()`, `false` for `stream()`
       */
      verbose: boolean
    }>
  >

type StreamOptions = Omit<
  NonStreamOptions,
  'verbose' | 'stdout' | 'stderr' | 'stdio' | 'all'
> &
  Readonly<
    Partial<{
      /**
       * Whether the command result should:
       *  - `replace` the file's contents
       *  - `save`: [be pushed](https://github.com/sindresorhus/execa#childprocessresult)
       *    to the `file.execa` array property
       *
       * @default 'replace'
       *
       * @example
       * ```js
       * import gulp from 'gulp'
       * import through from 'through2'
       *
       * export const task = () =>
       *   gulp
       *     .src('*.js')
       *     // Prints the number of lines of each file
       *     .pipe(stream(({ path }) => `wc -l ${path}`, { result: 'save' }))
       *     .pipe(
       *       through.obj((file, encoding, func) => {
       *         console.log(file.execa[0].stdout)
       *         func(null, file)
       *       }),
       *     )
       * ```
       */
      result: 'save' | 'replace'

      /**
       * Which output stream to use with `result: 'replace'`.
       *
       * @default 'stdout'
       *
       * @example
       * ```js
       * import gulp from 'gulp'
       * import through from 'through2'
       *
       * export const task = () =>
       *   gulp
       *     .src('*.js')
       *     // Prints the number of lines of each file, including `stderr`
       *     .pipe(
       *       stream(({ path }) => `wc -l ${path}`, { result: 'replace', from: 'all' }),
       *     )
       *     .pipe(
       *       through.obj((file, encoding, func) => {
       *         console.log(file.contents.toString())
       *         func(null, file)
       *       }),
       *     )
       * ```
       */
      from: 'stdout' | 'stderr' | 'all'

      /**
       * How many commands to run in parallel at once.
       *
       * @default 100
       */
      maxConcurrency: number
    }>
  >

export type Options = StreamOptions & NonStreamOptions

/**
 * Executes `command`. The return value is both a promise and a
 * [`child_process` instance](https://github.com/sindresorhus/execa#execacommand-options).
 *
 * The promise will be resolved with the
 * [command result](https://github.com/sindresorhus/execa#childprocessresult).
 * If the command failed, the promise will be rejected with a nice
 * [error](https://github.com/sindresorhus/execa#childprocessresult).
 * If the [`reject: false`](https://github.com/sindresorhus/execa#reject) option
 * was used, the promise will be resolved with that error instead.
 *
 * @example
 * ```js
 * export const outdated = async () => {
 *   await exec('npm outdated')
 * }
 * ```
 */
export function exec(
  command: string,
  options?: NonStreamOptions,
): ExecaChildProcess

/**
 * Returns a Gulp task that executes `command`.
 *
 * @example
 * ```js
 * export const audit = task('npm audit')
 * ```
 */
export function task(
  command: string,
  options?: NonStreamOptions,
): () => ExecaChildProcess

/**
 * Returns a stream that executes a `command` on each input file.
 *
 * @example
 * ```js
 * import gulp from 'gulp'
 *
 * export const sort = () =>
 *   gulp
 *     .src('*.txt')
 *     .pipe(stream(({ path }) => `sort ${path}`))
 *     .pipe(gulp.dest('sorted'))
 * ```
 */
export function stream(
  getCommand: (
    file: File,
  ) => string | (Options & { command: string }) | undefined,
  options?: StreamOptions,
): Transform
