#!/usr/bin/env bash
# Demo of the `maxConcurrency` option.
# This file can be directly run:
#   - first install `gulp-execa` and `gulp`
#   - then `bash node_modules/gulp-execa/examples/max_concurrency.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/gulp-execa

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/utils.sh"

gulp --gulpfile="$dir/max_concurrency.gulpfile.js"