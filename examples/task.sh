#!/usr/bin/env bash
# Demo of the `task()` method.
# This file can be directly run:
#   - first install `gulp-execa` and `gulp`
#   - then `bash node_modules/gulp-execa/examples/task.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/gulp-execa

examplesDir="$(dirname $BASH_SOURCE)"

gulp --gulpfile="$examplesDir/task.gulpfile.js"
