#!/usr/bin/env bash
# Demo of the `task()` method.
# This file can be directly run:
#   - first install `gulp-execa` and `gulp`
#   - then `bash node_modules/gulp-execa/examples/FILE.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/gulp-execa

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/utils.sh"

gulp --gulpfile="$dir/task.gulpfile.js"
