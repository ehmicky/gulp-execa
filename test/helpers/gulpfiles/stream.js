import { callbackify } from 'util'
import { Buffer } from 'buffer'

import { src } from 'gulp'
import through from 'through2-concurrent'
import getStream from 'get-stream'

import { stream } from '../../../src/main.js'

import { getInput } from './input.js'

const { command, opts, buffer, read } = getInput()

const DUMMY = `${__dirname}/dummy.txt`
const DUMMY_TWO = `${__dirname}/dummy_two.txt`

// Task used in most tests
export const main = () =>
  src(DUMMY, { buffer })
    .pipe(stream(() => command, opts))
    .pipe(through.obj(execVinyl))

// `input` should be an async function
export const inputAsync = () =>
  src(DUMMY, { buffer })
    .pipe(stream(() => Promise.resolve(command), opts))
    .pipe(through.obj(execVinyl))

// `input` should be fired with the Vinyl file
export const inputFile = () =>
  src(DUMMY, { buffer })
    .pipe(stream(({ basename }) => `${command} ${basename}`, opts))
    .pipe(through.obj(execVinyl))

// File should be skipped when returning a non-string
export const inputUndefined = () =>
  src(DUMMY, { buffer })
    .pipe(stream(() => undefined, opts))
    .pipe(through.obj(execVinyl))

// Should allow several files
export const severalFiles = () =>
  src([DUMMY, DUMMY_TWO], { buffer })
    .pipe(stream(() => command, opts))
    .pipe(through.obj(execVinyl))

// Should allow doing several times
export const severalTimes = () =>
  src(DUMMY, { buffer })
    .pipe(stream(() => command, opts))
    .pipe(stream(() => command, opts))
    .pipe(through.obj(execVinyl))

// `input` should be a function
export const inputNotFunc = () =>
  src(DUMMY, { buffer }).pipe(stream(command, opts))

// `input` exceptions should be propagated
export const inputThrows = () =>
  src(DUMMY, { buffer }).pipe(
    stream(() => {
      throw new Error('error')
    }, opts),
  )

// `input` async exceptions should be propagated
export const inputThrowsAsync = () =>
  src(DUMMY, { buffer }).pipe(
    stream(() => Promise.reject(new Error('error')), opts),
  )

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
    return JSON.stringify(execa, null, 2)
  }

  if (Buffer.isBuffer(contents)) {
    return contents.toString()
  }

  return getStream(contents)
}
