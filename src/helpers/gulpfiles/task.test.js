import gulp from 'gulp'
import { task } from 'gulp-execa'

import { getInput } from './input.test.js'

const { command, opts } = getInput()

export const main = task(command, opts)

export const nested = gulp.parallel(main)
