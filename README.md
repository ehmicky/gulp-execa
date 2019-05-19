<img src="https://raw.githubusercontent.com/ehmicky/design/master/gulp-execa/gulp-execa.svg?sanitize=true" width="500"/>

[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/gulp-execa.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/gulp-execa)
[![Travis](https://img.shields.io/badge/cross-platform-4cc61e.svg?logo=travis)](https://travis-ci.org/ehmicky/gulp-execa)
[![Node](https://img.shields.io/node/v/gulp-execa.svg?logo=node.js)](https://www.npmjs.com/package/gulp-execa)
[![Gitter](https://img.shields.io/gitter/room/ehmicky/gulp-execa.svg?logo=gitter)](https://gitter.im/ehmicky/gulp-execa)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

Command execution in Gulp.js.

As opposed to
[`child_process.exec()`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
or to other plugins, `gulp-execa` uses the popular
[`execa`](https://github.com/sindresorhus/execa) library:

- [Better Windows support](https://github.com/IndigoUnited/node-cross-spawn#why),
  including [shebangs](<https://en.wikipedia.org/wiki/Shebang_(Unix)>).
- Faster and more secure, as it does not use a shell (by default).
- Execution of locally installed binaries.
- Descriptive errors and configurable verbosity.
- Interleaved stdout/stderr.

Commands can be executed either directly or inside a files stream. In streaming
mode, unlike similar libraries:

- commands are run [in parallel](https://github.com/almost/through2-concurrent),
  not [serially](https://github.com/rvagg/through2).
- output can be saved either in files or in variables.

Example gulpfile:

```js
const { task, exec, stream } = require('gulp-execa')
const { src, dest } = require('gulp')

module.exports.audit = task('npm audit')

module.exports.outdated = async function() {
  await exec('npm outdated')
}

module.exports.sort = function() {
  return src('**/*.txt')
    .pipe(stream(({ path }) => `sort ${path}`))
    .pipe(dest('sorted'))
}
```
