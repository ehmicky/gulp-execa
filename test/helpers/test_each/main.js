import { parseInput } from './input.js'
import { getArgs } from './args.js'
import { getNames } from './name.js'

// Repeat a function with a combination of arguments.
// Meant for test-driven development.
export const testEach = function(...inputArgs) {
  const { iterables, func } = parseInput(inputArgs)

  const args = getArgs(iterables)

  const names = getNames(args)

  const results = args.map((values, index) => {
    const name = names[index]
    return func({ name }, ...values)
  })

  // Can use `Promise.all(results)` if `func` is async
  return { args, results }
}
