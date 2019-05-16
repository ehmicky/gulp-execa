import { callbackify } from 'util'
import { Buffer } from 'buffer'

import { src } from 'gulp'
import through from 'through2-concurrent'
import getStream from 'get-stream'

import { stream } from '../../../src/main.js'

import { getInput } from './input.js'

const { command, opts, buffer } = getInput()

export const main = () =>
  src(__filename, { buffer })
    .pipe(stream(() => command, opts))
    .pipe(through.obj(execVinyl))

const cExecVinyl = async function({ contents, execa }) {
  const string = await stringifyContents({ contents, execa })
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(string)
}

const stringifyContents = function({ contents, execa }) {
  if (execa !== undefined) {
    return JSON.stringify(execa, null, 2)
  }

  if (Buffer.isBuffer(contents)) {
    return contents.toString()
  }

  return getStream(contents)
}

const execVinyl = callbackify(cExecVinyl)
