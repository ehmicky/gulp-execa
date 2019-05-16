import { env } from 'process'
import { callbackify } from 'util'
import { Buffer } from 'buffer'

import { src } from 'gulp'
import through from 'through2-concurrent'
import getStream from 'get-stream'

import { exec, task, stream } from '../../src/main.js'

const { command, opts, streamOpts, buffer } = JSON.parse(env.INPUT)

export const execFunc = () => exec(command, opts)

export const taskFunc = task(command, opts)

export const streamFunc = () => src(__filename, { buffer })
  .pipe(stream(() => command, { ...opts, ...streamOpts }))
  .pipe(through.obj(execVinyl))

const cExecVinyl = async function({ path, contents, execa }) {
  const string = await stringifyContents({ contents, execa })
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(`${path}\n${string}`)
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
