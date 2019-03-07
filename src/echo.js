'use strict'

const fancyLog = require('fancy-log')
const { cyan } = require('chalk')

// If `opts.echo` is `true` echo the command on the terminal
const printEcho = function({ input, opts: { echo } }) {
  if (!echo) {
    return
  }

  const inputA = cyan.dim(`[gulp-execa] ${input}`)
  fancyLog(inputA)
}

module.exports = {
  printEcho,
}
