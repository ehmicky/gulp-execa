import { Buffer } from 'node:buffer'

import { createError } from '../error.js'
import { execCommand, streamCommand } from '../exec.js'
import { isValidInput } from '../input.js'

// Decides what to do with the child process result according to `opts.result`:
//  - `save`: pushed to `file.execa`
//  - `replace`: overwrite file's content
export const setResult = ({ file, input, opts, resultOpt }) => {
  initSave({ file, resultOpt })

  // Returning `undefined` or invalid command skips it silently.
  if (!isValidInput(input)) {
    return
  }

  if (resultOpt === 'save') {
    return saveResult({ file, input, opts })
  }

  // If the `file` already uses streams, we do it as well as it's more
  // efficient. This is done usually by using `gulp.src(..., { buffer: false })`
  // Otherwise we don't since many Gulp plugins don't support `file.contents`
  // being a stream.
  if (file.isStream()) {
    return streamResult({ file, input, opts })
  }

  return bufferResult({ file, input, opts })
}

// Make sure `file.execa` is always set even if all inputs are invalid
const initSave = ({ file, file: { execa }, resultOpt }) => {
  if (resultOpt !== 'save' || execa !== undefined) {
    return
  }

  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.execa = []
}

const saveResult = async ({ file, file: { execa }, input, opts }) => {
  const execaResult = await execCommand(input, opts)
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.execa = [...execa, execaResult]
}

const streamResult = ({ file, input, opts, opts: { from } }) => {
  const execaPromise = streamCommand(input, opts)
  const { [from]: stream } = execaPromise

  // Make stream fail if the command fails
  // eslint-disable-next-line promise/prefer-await-to-then, promise/prefer-await-to-callbacks
  execaPromise.catch((error) => {
    stream.emit('error', createError(error))
  })

  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.contents = stream
}

const bufferResult = async ({ file, input, opts, opts: { from } }) => {
  const { [from]: output } = await execCommand(input, opts)
  // Stream output can be either string or buffer depending on `opts.encoding`
  // However `file.contents` cannot be a string.
  const buffer = Buffer.isBuffer(output) ? output : Buffer.from(output)
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.contents = buffer
}
