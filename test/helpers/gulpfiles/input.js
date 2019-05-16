import { env } from 'process'

export const getInput = function() {
  const { command, opts, buffer = true } = JSON.parse(env.INPUT)
  return { command, opts, buffer }
}
