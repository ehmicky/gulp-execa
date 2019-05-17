import { env } from 'process'

export const getInput = function() {
  const { command, opts, buffer = true, read = true } = JSON.parse(env.INPUT)
  return { command, opts, buffer, read }
}
