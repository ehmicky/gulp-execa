<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ehmicky/design/main/gulp-execa/gulp-execa_dark.svg"/>
  <img alt="gulp-execa logo" src="https://raw.githubusercontent.com/ehmicky/design/main/gulp-execa/gulp-execa.svg" width="500"/>
</picture>

[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/gulp-execa)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/src/main.d.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/gulp-execa)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

[Gulp.js](https://gulpjs.com) command execution for humans.

As opposed to similar plugins or to
[`child_process.exec()`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback),
this uses [Execa](https://github.com/sindresorhus/execa) which provides:

- [Better Windows support](https://github.com/IndigoUnited/node-cross-spawn#why),
  including [shebangs](<https://en.wikipedia.org/wiki/Shebang_(Unix)>)
- Faster and more secure commands, since [no shell is used by default](#command)
- Execution of
  [locally installed binaries](https://github.com/sindresorhus/execa#preferlocal)
- [Interleaved](https://github.com/sindresorhus/execa#all-1) `stdout`/`stderr`

`gulp-execa` adds Gulp-specific features to
[Execa](https://github.com/sindresorhus/execa) including:

- a [task shortcut syntax](#taskcommand-options)
- configurable [verbosity](#echo)
- [better errors](https://github.com/gulpjs/plugin-error)

Commands can be executed either directly or inside a
[files stream](https://gulpjs.com/docs/en/api/src). In
[streaming mode](#streamfunction-options), unlike other libraries:

- commands are run [in parallel](https://github.com/almost/through2-concurrent),
  not [serially](https://github.com/rvagg/through2)
- output can be saved [either in files or in variables](#result)

# Hire me

Please
[reach out](https://www.linkedin.com/feed/update/urn:li:activity:7117265228068716545/)
if you're looking for a Node.js API or CLI engineer (11 years of experience).
Most recently I have been [Netlify Build](https://github.com/netlify/build)'s
and [Netlify Plugins](https://www.netlify.com/products/build/plugins/)'
technical lead for 2.5 years. I am available for full-time remote positions.

# Example

`gulpfile.js`:

```js
import { pipeline } from 'node:stream/promises'

import gulp from 'gulp'
import { exec, stream, task } from 'gulp-execa'

export const audit = task('npm audit')

export const outdated = async () => {
  await exec('npm outdated')
}

export const sort = () =>
  pipeline(
    gulp.src('*.txt'),
    stream(({ path }) => `sort ${path}`),
    gulp.dest('sorted'),
  )
```

# Install

```
npm install -D gulp-execa
```

This plugin requires Gulp 5 and Node.js >=18.18.0. It is an ES module and must
be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`. If TypeScript is used, it must be configured to
[output ES modules](https://www.typescriptlang.org/docs/handbook/esm-node.html),
not CommonJS.

# Methods

## task(command, [options])

Returns a Gulp task that executes `command`.

```js
import { task } from 'gulp-execa'

export const audit = task('npm audit')
```

## exec(command, [options])

Executes `command`. The return value is both a promise and a
[`child_process` instance](https://github.com/sindresorhus/execa#execacommand-options).

The promise will be resolved with the
[command result](https://github.com/sindresorhus/execa#childprocessresult). If
the command failed, the promise will be rejected with a nice
[error](https://github.com/sindresorhus/execa#childprocessresult). If the
[`reject: false`](https://github.com/sindresorhus/execa#reject) option was used,
the promise will be resolved with that error instead.

```js
import { exec } from 'gulp-execa'

export const outdated = async () => {
  await exec('npm outdated')
}
```

## stream(function, [options])

Returns a stream that executes a `command` on each input file.

`function` must:

- take a [Vinyl file](https://gulpjs.com/docs/en/api/vinyl#instance-properties)
  as argument. The most useful property is `file.path` but
  [other properties](https://gulpjs.com/docs/en/api/vinyl#instance-properties)
  are available as well.
- return either:
  - a `command` string
  - an `options` object with a `command` property
  - `undefined`

```js
import { pipeline } from 'node:stream/promises'

import gulp from 'gulp'
import { stream } from 'gulp-execa'

export const sort = () =>
  pipeline(
    gulp.src('*.txt'),
    stream(({ path }) => `sort ${path}`),
    gulp.dest('sorted'),
  )
```

Each file in the stream will spawn a separate process. This can consume lots of
resources so you should only use this method when there are no alternatives such
as:

- firing a command programmatically instead of spawning a child process
- passing several files, a directory or a globbing pattern as arguments to the
  command

The [`debug`](#debug),
[`stdout`](https://github.com/sindresorhus/execa#stdout-1),
[`stderr`](https://github.com/sindresorhus/execa#stderr-1),
[`all`](https://github.com/sindresorhus/execa#all-2) and
[`stdio`](https://github.com/sindresorhus/execa#stdio) options cannot be used
with this method.

# Command

By default no shell interpreter (like Bash or `cmd.exe`) is used. This means
`command` must be just the program and its arguments. No escaping/quoting is
needed, except for significant spaces (with a backslash).

Shell features such as globbing, variables and operators (like `&&` `>` `;`)
should not be used. All of this can be done directly in Node.js instead.

Shell interpreters are slower, less secure and less cross-platform. However, you
can still opt-in to using them with the
[`shell` option](https://github.com/sindresorhus/execa#shell).

```js
import { writeFileStream } from 'node:fs'

import gulp from 'gulp'
import { task } from 'gulp-execa'

// Wrong
// export const check = task('npm audit && npm outdated')

// Correct
export const check = gulp.series(task('npm audit'), task('npm outdated'))

// Wrong
// export const install = task('npm install > log.txt')

// Correct
export const install = task('npm install', {
  stdout: writeFileStream('log.txt'),
})
```

# Options

`options` is an optional object.

[All Execa options](https://github.com/sindresorhus/execa#options) can be used.
Please refer to its documentation for a list of possible options.

The following options are available as well.

## echo

_Type_: `boolean`\
_Default_: [`debug`](#debug) option's value

Whether the `command` should be printed on the console.

```bash
$ gulp audit
[13:09:39] Using gulpfile ~/code/gulpfile.js
[13:09:39] Starting 'audit'...
[13:09:39] [gulp-execa] npm audit
[13:09:44] Finished 'audit' after 4.96 s
```

## debug

_Type_: `boolean`\
_Default_: `true` for [`task()`](#taskcommand-options) and
[`exec()`](#execcommand-options), `false` for
[`stream()`](#streamfunction-options).

Whether both the `command` and its output (`stdout`/`stderr`) should be printed
on the console instead of being returned in JavaScript.

```bash
$ gulp audit
[13:09:39] Using gulpfile ~/code/gulpfile.js
[13:09:39] Starting 'audit'...
[13:09:39] [gulp-execa] npm audit

                        == npm audit security report ===

found 0 vulnerabilities
 in 27282 scanned packages
[13:09:44] Finished 'audit' after 4.96 s
```

## result

_Type_: `string`\
_Value_: `'replace'` or `'save'`\
_Default_: `'replace'`

With [`stream()`](#streamfunction-options), whether the command result should:

- `replace` the file's contents
- `save`: [be pushed](https://github.com/sindresorhus/execa#childprocessresult)
  to the `file.execa` array property

<!-- eslint-disable unicorn/no-null -->

```js
import { pipeline } from 'node:stream/promises'

import gulp from 'gulp'
import { stream } from 'gulp-execa'
import through from 'through2'

export const task = () =>
  pipeline(
    gulp.src('*.js'),
    // Prints the number of lines of each file
    stream(({ path }) => `wc -l ${path}`, { result: 'save' }),
    through.obj((file, encoding, func) => {
      console.log(file.execa[0].stdout)
      func(null, file)
    }),
  )
```

## from

_Type_: `string`\
_Value_: `'stdout'`, `'stderr'` or `'all'`\
_Default_: `'stdout'`

Which output stream to use with [`result: 'replace'`](#result).

<!-- eslint-disable unicorn/no-null -->

```js
import { pipeline } from 'node:stream/promises'

import gulp from 'gulp'
import { stream } from 'gulp-execa'
import through from 'through2'

export const task = () =>
  pipeline(
    gulp.src('*.js'),
    // Prints the number of lines of each file, including `stderr`
    stream(({ path }) => `wc -l ${path}`, { result: 'replace', from: 'all' }),
    through.obj((file, encoding, func) => {
      console.log(file.contents.toString())
      func(null, file)
    }),
  )
```

## maxConcurrency

_Type_: `integer`\
_Default_: `100`

With [`stream()`](#streamfunction-options), how many commands to run in parallel
at once.

# See also

- [Execa](https://github.com/sindresorhus/execa)

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

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

Thanks go to our wonderful contributors:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/gulp-execa/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/gulp-execa/commits?author=ehmicky" title="Documentation">📖</a></td><td align="center"><a href="https://twitter.com/BarryThePenguin"><img src="https://avatars3.githubusercontent.com/u/1351912?v=4" width="100px;" alt="Jonathan Haines"/><br /><sub><b>Jonathan Haines</b></sub></a><br /><a href="https://github.com/ehmicky/gulp-execa/issues?q=author%3ABarryThePenguin" title="Bug reports">🐛</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
