import {
  constants: { errno },
} from 'os'

import PluginError from 'plugin-error'
import ms from 'ms'

// Throw a Gulp error
export const getError = function({ error, input, opts }) {
  const message = getErrorMessage({ error, input, opts })
  const errorA = new PluginError('gulp-execa', message, {
    showProperties: false,
  })
  // Keep `execa` error properties
  // eslint-disable-next-line fp/no-mutating-assign
  Object.assign(errorA, error)
  return errorA
}

// Retrieve error message to print
const getErrorMessage = function({
  error: { message, code, timedOut, signal },
  input,
  opts,
}) {
  const description = getErrorDescription({ code, timedOut, signal, opts })
  const stack = getErrorStack({ message })
  const messageA = `Command '${input}' ${description}${stack}`
  return messageA
}

// Make error message as descriptive as possible
const getErrorDescription = function({
  code,
  timedOut,
  signal,
  opts: { timeout },
}) {
  if (timedOut) {
    const timeoutStr = ms(timeout, { long: true })
    return `timed out after ${timeoutStr}`
  }

  if (signal !== null) {
    return `was killed with ${signal}`
  }

  const codeA = getExitCode({ code })
  return `failed with exit code ${codeA}`
}

// Retrieve underlying error message and stack trace
const getErrorStack = function({ message }) {
  if (message.startsWith(DEFAULT_MESSAGE)) {
    return ''
  }

  return `: ${message}`
}

// `execa` adds a default error message that we don't want because it includes
// full stdout|stderr, which should already printed on console
const DEFAULT_MESSAGE = 'Command failed: '

// Retrieve exit code both as a number and as a string
const getExitCode = function({ code }) {
  // `execa` already tried to retrieve the exit code name
  if (Number.isInteger(code)) {
    return `${code}`
  }

  const codeNum = errno[code]

  if (codeNum === undefined) {
    return code
  }

  return `${codeNum} (${code})`
}
