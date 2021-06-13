// Demo of the `exec()` method.
// This file can be directly run:
//   - first install `gulp-execa` and `gulp`
//   - then `bash node_modules/gulp-execa/examples/exec.sh`
// An online demo is also available at:
//   https://repl.it/@ehmicky/gulp-execa

// eslint-disable-next-line node/no-extraneous-import, filenames/match-exported
import { exec } from 'gulp-execa'

// eslint-disable-next-line import/no-default-export
export default async function task() {
  await exec('npm --version')
}
