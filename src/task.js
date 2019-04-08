import { parseOpts } from './options.js'
import { execCommand } from './command.js'
import { splitInput } from './split.js'

// Create a Gulp task
export const createTask = function(input, opts) {
  const optsA = parseOpts(opts)

  const task = execCommand.bind(null, input, optsA)

  setDisplayName({ task, input })

  return task
}

// We want to allow users to do `const task = execa(...)` instead of the
// more verbose `const task = () => execa(...)`. This is especially
// important when using `gulp.series()` or `gulp.parallel()`.
// However after binding a function or using a closure, assigning it to
// a variable does not change its `function.name` anymore. But this is
// used by Gulp as the displayed task name. So we use the command instead.
const setDisplayName = function({ task, input }) {
  const { command } = splitInput({ input })
  // eslint-disable-next-line fp/no-mutation, no-param-reassign
  task.displayName = String(command)
}
