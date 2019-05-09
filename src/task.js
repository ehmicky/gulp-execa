import { parseOpts } from './options.js'
import { execCommand } from './command.js'

// Create a Gulp task
export const task = function(input, opts) {
  const optsA = parseOpts(opts)

  const gulpTask = execCommand.bind(null, input, optsA)

  // We want to allow users to do `const gulpTask = execa(...)` instead of the
  // more verbose `const gulpTask = () => execa(...)`. This is especially
  // important when using `gulp.series()` or `gulp.parallel()`.
  // However after binding a function or using a closure, assigning it to
  // a variable does not change its `function.name` anymore. But this is
  // used by Gulp as the displayed task name. So we use the command instead.
  // eslint-disable-next-line fp/no-mutation
  gulpTask.displayName = input

  return gulpTask
}
