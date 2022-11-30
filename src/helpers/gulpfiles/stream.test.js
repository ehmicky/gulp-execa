import { Buffer } from 'node:buffer'
import { fileURLToPath } from 'node:url'
import { callbackify } from 'node:util'

import getStream from 'get-stream'
import gulp from 'gulp'
import { stream } from 'gulp-execa'
import through from 'through2-concurrent'

import { getInput } from './input.test.js'

const { command, opts, buffer, read } = getInput()

const DUMMY = fileURLToPath(new URL('dummy.txt', import.meta.url))
const DUMMY_TWO = fileURLToPath(new URL('dummy_two.txt', import.meta.url))

// Task used in most tests
export const main = () =>
  gulp
    .src(DUMMY, { buffer })
    .pipe(stream(() => command, opts))
    .pipe(through.obj(execVinyl))

// `input` should be an async function
export const inputAsync = () =>
  gulp
    .src(DUMMY, { buffer })
    .pipe(stream(() => Promise.resolve(command), opts))
    .pipe(through.obj(execVinyl))

// `input` should be fired with the Vinyl file
export const inputFile = () =>
  gulp
    .src(DUMMY, { buffer })
    .pipe(stream(({ basename }) => `${command} ${basename}`, opts))
    .pipe(through.obj(execVinyl))

const noop = function () {}

// File should be skipped when returning a non-string
export const inputUndefined = () =>
  gulp
    .src(DUMMY, { buffer })
    .pipe(stream(noop, opts))
    .pipe(through.obj(execVinyl))

// Should allow several files
export const severalFiles = () =>
  gulp
    .src([DUMMY, DUMMY_TWO], { buffer })
    .pipe(stream(() => command, opts))
    .pipe(through.obj(execVinyl))

// Should allow doing several times
export const severalTimes = () =>
  gulp
    .src(DUMMY, { buffer })
    .pipe(stream(() => command, opts))
    .pipe(stream(() => command, opts))
    .pipe(through.obj(execVinyl))

// `input` should be a function
export const inputNotFunc = () =>
  gulp.src(DUMMY, { buffer }).pipe(stream(command, opts))

// `input` exceptions should be propagated
export const inputThrows = () =>
  gulp.src(DUMMY, { buffer }).pipe(
    stream(() => {
      throw new Error('error')
    }, opts),
  )

// `input` async exceptions should be propagated
export const inputThrowsAsync = () =>
  gulp
    .src(DUMMY, { buffer })
    .pipe(stream(() => Promise.reject(new Error('error')), opts))

const cExecVinyl = async function (file) {
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
const stringifyContents = function ({ contents, execa }) {
  if (execa !== undefined) {
    return JSON.stringify(execa, undefined, 2)
  }

  if (Buffer.isBuffer(contents)) {
    return contents.toString()
  }

  return getStream(contents)
}
