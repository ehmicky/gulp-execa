import { parallel } from 'gulp'
// eslint-disable-next-line node/no-extraneous-import
import { task } from 'gulp-execa'

import { getInput } from './input.js'

const { command, opts } = getInput()

export const main = task(command, opts)

export const nested = parallel(main)
