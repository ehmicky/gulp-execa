import { exec } from 'gulp-execa'

import { getInput } from './input.test.js'

const { command, opts } = getInput()

export const main = () => exec(command, opts)
