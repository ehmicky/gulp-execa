import { isValidInput } from '../input.js'
import { execCommand, streamCommand } from '../exec.js'

// Decides what to do with the child process result, either:
//  - `save`: pushed to `file.execa`
//  - `replace`: overwrite file's content
export const setResult = function({ file, input, opts, resultOpt }) {
  // Returning `undefined` or invalid command skips it silently.
  // `file.execa` array will be pushed with `undefined`.
  if (!isValidInput({ input })) {
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

const saveResult = async function({ file, file: { execa = [] }, input, opts }) {
  const result = await execCommand(input, opts)
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.execa = [...execa, result]
}

const streamResult = function({ file, input, opts, opts: { from } }) {
  const execaResult = streamCommand(input, opts)
  const { [from]: result } = execaResult

  // Make stream fail if the command fails
  execaResult.catch(error => result.emit('error', error))

  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.contents = result
}

const bufferResult = async function({ file, input, opts, opts: { from } }) {
  const { [from]: result } = await execCommand(input, opts)
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  file.contents = result
}
