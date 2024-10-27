import { Buffer } from 'node:buffer'
import { pipeline } from 'node:stream/promises'
import { fileURLToPath } from 'node:url'
import { callbackify } from 'node:util'

import gulp from 'gulp'
import { stream } from 'gulp-execa'
import rawBody from 'raw-body'
import through from 'through2-concurrent'

import { getInput } from './input.test.js'

const { command, opts, buffer, read } = getInput()

const DUMMY = fileURLToPath(
  new URL('../../fixtures/dummy.txt', import.meta.url),
)
const DUMMY_TWO = fileURLToPath(
  new URL('../../fixtures/dummy_two.txt', import.meta.url),
)

// Task used in most tests
export const main = () =>
  pipeline(
    gulp.src(DUMMY, { buffer }),
    stream(() => command, opts),
    through.obj(execVinyl),
  )

// `input` should be an async function
export const inputAsync = () =>
  pipeline(
    gulp.src(DUMMY, { buffer }),
    stream(() => Promise.resolve(command), opts),
    through.obj(execVinyl),
  )

// `input` should be fired with the Vinyl file
export const inputFile = () =>
  pipeline(
    gulp.src(DUMMY, { buffer }),
    stream(({ basename }) => `${command} ${basename}`, opts),
    through.obj(execVinyl),
  )

const noop = () => {}

// File should be skipped when returning a non-string
export const inputUndefined = () =>
  pipeline(
    gulp.src(DUMMY, { buffer }),
    stream(noop, opts),
    through.obj(execVinyl),
  )

// Should allow several files
export const severalFiles = () =>
  pipeline(
    gulp.src([DUMMY, DUMMY_TWO], { buffer }),
    stream(() => command, opts),
    through.obj(execVinyl),
  )

// Should allow doing several times
export const severalTimes = () =>
  pipeline(
    gulp.src(DUMMY, { buffer }),
    stream(() => command, opts),
    stream(() => command, opts),
    through.obj(execVinyl),
  )

// `input` should be a function
export const inputNotFunc = () =>
  pipeline(gulp.src(DUMMY, { buffer }), stream(command, opts))

// `input` exceptions should be propagated
export const inputThrows = () =>
  pipeline(
    gulp.src(DUMMY, { buffer }),
    stream(() => {
      throw new Error('error')
    }, opts),
  )

// `input` async exceptions should be propagated
export const inputThrowsAsync = () =>
  pipeline(
    gulp.src(DUMMY, { buffer }),
    stream(() => Promise.reject(new Error('error')), opts),
  )

const cExecVinyl = async (file) => {
  // When `file.contents` is a stream and an `error` event should be emitted,
  // we should not read the stream with `get-stream`. Otherwise Gulp will
  // consider the stream finished and not error.
  if (!read) {
    return file
  }

  // Prints `file.contents` so that unit test can snapshot it
  const string = await stringifyContents(file)
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(string)
  return file
}

const execVinyl = callbackify(cExecVinyl)

// Each method must be stringified differently
const stringifyContents = ({ contents, execa }) => {
  if (execa !== undefined) {
    return JSON.stringify(execa, undefined, 2)
  }

  if (Buffer.isBuffer(contents)) {
    return contents.toString()
  }

  // TODO: use `get-stream` once Gulp upgrade to `vinyl-fs@v4`.
  // See https://github.com/sindresorhus/get-stream/issues/103
  return rawBody(contents, { encoding: 'utf8' })
}
