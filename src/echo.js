import colorsOption from 'colors-option'
import fancyLog from 'fancy-log'

const { cyan } = colorsOption()

// If `opts.echo` is `true`, echo the command and its arguments on the terminal
export const printEcho = function ({ input, opts: { echo } }) {
  if (!echo) {
    return
  }

  const log = cyan.dim(`[gulp-execa] ${input}`)
  fancyLog(log)
}
