import { parseInput } from './input.js'
import { getArgs } from './args.js'
import { getSuffixes } from './suffix.js'

// Repeat a function with a combination of arguments.
// Meant for test-driven development.
export const testEach = function(...inputArgs) {
  const { iterables, func } = parseInput(inputArgs)

  const args = getArgs(iterables)

  const suffixes = getSuffixes(args)

  const results = args.map((values, index) => func(suffixes[index], ...values))

  // Can use `Promise.all(results)` if `func` is async
  return { args, results }
}
