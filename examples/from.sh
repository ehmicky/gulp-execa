#!/usr/bin/env bash
# Demo of the `from` option.
# This file can be directly run:
#   - first install `gulp-execa` and `gulp`
#   - then `bash node_modules/gulp-execa/examples/from.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/gulp-execa

examplesDir="$(dirname $BASH_SOURCE)"

npx gulp --gulpfile="$examplesDir/from.gulpfile.js"
