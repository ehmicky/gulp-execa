import { env } from 'node:process'

// Some information is passed by calling test to the gulpfile using the
// environment variable `INPUT`
export const getInput = function () {
  const { command, opts, buffer = true, read = true } = JSON.parse(env.INPUT)
  return { command, opts, buffer, read }
}
