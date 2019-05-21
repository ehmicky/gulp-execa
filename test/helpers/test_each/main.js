import { parseInput } from './input.js'
import { addRepeat } from './repeat.js'
import { getCartesianLoops } from './cartesian.js'
import { addNames } from './name.js'
import { fixDuplicate } from './duplicate.js'

// Repeat a function with a combination of arguments.
// Meant for test-driven development.
export const testEach = function(...inputArgs) {
  const { iterables, func } = parseInput(inputArgs)

  const iterablesA = iterables.map(addRepeat)

  const loops = getCartesianLoops(iterablesA)

  const loopsA = loops.map(addNames)
  const loopsB = loopsA.map(fixDuplicate)

  // Return the value so that:
  //  - can use `Promise.all(results)` if `func` is async
  //  - user can retrieve `params`, `indexes`, etc. by returning them
  const results = loopsB.map(({ name, names, index, indexes, params }) =>
    func({ name, names, index, indexes }, ...params),
  )
  return results
}
