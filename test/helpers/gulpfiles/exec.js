import { exec } from 'gulp-execa'

import { getInput } from './input.js'

const { command, opts } = getInput()

export const main = () => exec(command, opts)
