<img src="https://raw.githubusercontent.com/ehmicky/design/master/gulp-execa/gulp-execa.svg?sanitize=true" width="500"/>

[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/gulp-execa.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/gulp-execa)
[![Travis](https://img.shields.io/badge/cross-platform-4cc61e.svg?logo=travis)](https://travis-ci.org/ehmicky/gulp-execa)
[![Node](https://img.shields.io/node/v/gulp-execa.svg?logo=node.js)](https://www.npmjs.com/package/gulp-execa)
[![Gitter](https://img.shields.io/gitter/room/ehmicky/gulp-execa.svg?logo=gitter)](https://gitter.im/ehmicky/gulp-execa)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

Command execution in [Gulp.js](https://gulpjs.com).

As opposed to
[`child_process.exec()`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
or to other plugins, `gulp-execa` uses
[`execa`](https://github.com/sindresorhus/execa) providing:

- [Better Windows support](https://github.com/IndigoUnited/node-cross-spawn#why),
  including [shebangs](<https://en.wikipedia.org/wiki/Shebang_(Unix)>)
- Faster and more secure commands, since [no shell is used by default](#command)
- Execution of
  [locally installed binaries](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#preferlocal)
- [Descriptive errors](https://github.com/sindresorhus/execa#childprocessresult)
  and [configurable verbosity](#echo)
- [Interleaved](https://github.com/sindresorhus/execa#all-1) `stdout`/`stderr`

Commands can be executed either directly or inside a
[files stream](https://gulpjs.com/docs/en/api/src). In
[streaming mode](#streamfunction-options), unlike similar libraries:

- commands are run [in parallel](https://github.com/almost/through2-concurrent),
  not [serially](https://github.com/rvagg/through2)
- output can be saved [either in files or in variables](#result)

Example `gulpfile.js`:

```js
const { src, dest } = require('gulp')
const { task, exec, stream } = require('gulp-execa')

module.exports.audit = task('npm audit')

module.exports.outdated = async () => {
  await exec('npm outdated')
}

module.exports.sort = () =>
  src('*.txt')
    .pipe(stream(({ path }) => `sort ${path}`))
    .pipe(dest('sorted'))
```

# Demo

You can try this library:

- either directly [in your browser](https://repl.it/@ehmicky/gulp-execa).
- or by executing the [`examples` files](examples/README.md) in a terminal.

# Install

```
npm install -D gulp-execa
```

This plugin requires Gulp 4.

# Methods

## task(command, [options])

Returns a Gulp task that executes
`command`.<br>[Full documentation](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#taskcommand-options).

## exec(command, [options])

Executes `command`. The return value is both a promise and a
[`child_process` instance](https://github.com/sindresorhus/execa#execacommand-options).<br>[Full documentation](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#execcommand-options).

## stream(function, [options])

Returns a stream that executes a `command` on each input file. `function` must
take a [file](https://gulpjs.com/docs/en/api/vinyl#instance-properties) as
argument and return a `command`.

Each file in the stream will spawn a separate process. This can consume lots of
resources so you should only use this method when there are no alternatives.

[Full documentation](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#streamfunction-options).

# Command

By default no shell interpreter (like Bash or `cmd.exe`) is used. This means
`command` must be just the program and its arguments. No escaping/quoting is
needed, except for significant spaces (with a backslash).

Shell features such as globbing, variables and operators (like `&&` `>` `;`)
should not be used. All of this can be done directly in Node.js instead.

Shell interpreters are slower, less secure and less cross-platform. However, you
can still opt-in to using them with the
[`shell` option](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#shell).

```js
const { writeFileStream } = require('fs')

const { series } = require('gulp')

// Wrong
module.exports.check = task('npm audit && npm outdated')

// Correct
module.exports.check = series(task('npm audit'), task('npm outdated'))

// Wrong
module.exports.install = task('npm install > log.txt')

// Correct
module.exports.install = task('npm install', {
  stdout: writeFileStream('log.txt'),
})
```

# Options

`options` is an optional object.

All options from both
[`child_process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
and
[`child_process.exec()`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
are available:
[`cwd`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#cwd),
[`env`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#env),
[`argv0`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#argv0),
[`stdio`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#stdio),
[`detached`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#detached),
[`uid`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#uid),
[`gid`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#gid),
[`shell`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#shell),
[`encoding`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#encoding),
[`timeout`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#timeout),
[`maxBuffer`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#maxbuffer),
[`killSignal`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#killsignal),
[`windowsVerbatimArguments`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#windowsverbatimarguments),
[`windowsHide`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#windowshide).

All [`execa` options](https://github.com/sindresorhus/execa#options) can also be
used:
[`cleanup`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#cleanup),
[`preferLocal`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#preferlocal),
[`localDir`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#localdir),
[`buffer`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#buffer),
[`input`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#input),
[`stdin`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#stdin),
[`stdout`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#stdout),
[`stderr`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#stderr),
[`reject`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#reject),
[`stripFinalNewline`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#stripfinalnewline),
[`extendEnv`](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#extendenv).

The following options are also available.

## echo

_Type_: `boolean`<br> _Default_: `true` for [`task()`](#taskfunction-options)
and [`exec()`](#execfunction-options), `false` for
[`stream()`](#streamfunction-options).

Whether the `command` should be printed on the console.
<br>[Full documentation](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#echo).

## verbose

_Type_: `boolean`<br> _Default_: `true` for [`task()`](#taskfunction-options)
and [`exec()`](#execfunction-options), `false` for
[`stream()`](#streamfunction-options).

Whether both the `command` and its output (`stdout`/`stderr`) should be printed
on the console instead of being returned in JavaScript.
<br>[Full documentation](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#verbose).

## result

_Type_: `string`<br> _Value_: `'replace'` or `'save'`<br> _Default_: `'replace'`

With [`stream()`](#streamfunction-options), whether the command result should:

- `replace` the file's contents
- `save`: [be pushed](https://github.com/sindresorhus/execa#childprocessresult)
  to the `file.execa` array property

[Full documentation](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#result).

## from

_Type_: `string`<br> _Value_: `'stdout'`, `'stderr'` or `'all'`<br> _Default_:
`'stdout'`

Which output stream to use with [`result: 'replace'`](#result).
<br>[Full documentation](https://github.com/ehmicky/gulp-execa/blob/master/docs/API.md#from).

## maxConcurrency

_Type_: `integer`<br> _Default_: `100`

With [`stream()`](#streamfunction-options), how many commands to run in parallel
at once.

# See also

- [`execa`](https://github.com/sindresorhus/execa)

# Support

If you found a bug or would like a new feature, _don't hesitate_ to
[submit an issue on GitHub](../../issues).

For other questions, feel free to
[chat with us on Gitter](https://gitter.im/ehmicky/gulp-execa).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/gulp-execa/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/gulp-execa/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
