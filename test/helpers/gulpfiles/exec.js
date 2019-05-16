import { exec } from '../../../src/main.js'

import { getInput } from './input.js'

const { command, opts } = getInput()

export const main = () => exec(command, opts)
