import fancyLog from 'fancy-log'
import { cyan } from 'chalk'

// If `opts.echo` is `true`, echo the command and its arguments on the terminal
export const printEcho = function ({ input, opts: { echo } }) {
  if (!echo) {
    return
  }

  const log = cyan.dim(`[gulp-execa] ${input}`)
  fancyLog(log)
}
