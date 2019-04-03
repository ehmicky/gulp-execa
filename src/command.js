'use strict'

const execa = require('execa')

const { printEcho } = require('./echo')
const { splitInput } = require('./split')
const { getError } = require('./error')

// Fire the command with `execa()`
const execCommand = async function(input, opts) {
  printEcho({ input, opts })

  const { command, args } = splitInput({ input })

  try {
    return await execa(command, args, opts)
  } catch (error) {
    const errorA = getError({ error, input, opts })
    throw errorA
  }
}

module.exports = {
  execCommand,
}
