import { parseInput } from './input.js'
import { getArgs } from './args.js'
import { getTitles } from './title.js'

// Repeat a function with a combination of arguments.
// Meant for test-driven development.
export const testEach = function(...inputArgs) {
  const { iterables, func } = parseInput(inputArgs)

  const args = getArgs(iterables)

  const titles = getTitles(args)

  const results = args.map((values, index) => func(titles[index], ...values))

  // Can use `Promise.all(results)` if `func` is async
  return { args, results }
}
