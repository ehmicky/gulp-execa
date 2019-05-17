import { parallel } from 'gulp'

import { task } from '../../../src/main.js'

import { getInput } from './input.js'

const { command, opts } = getInput()

export const main = task(command, opts)

export const nested = parallel(main)
