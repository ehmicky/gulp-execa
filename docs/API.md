# API

You can try all the examples below:

- either directly [in your browser](https://repl.it/@ehmicky/gulp-execa).
- or by executing the [`examples` files](../examples/README.md) in a terminal.

## Methods

### task(command, [options])

Returns a Gulp task that executes `command`.

```js
const { task } = require('gulp-execa')

module.exports.audit = task('npm audit')
```

### exec(command, [options])

Executes `command`. The return value is both a promise and a
[`child_process` instance](https://github.com/sindresorhus/execa#execacommand-options).

The promise will be resolved with the
[command result](https://github.com/sindresorhus/execa#childprocessresult). If
the command failed, the promise will be rejected with a nice
[error](https://github.com/sindresorhus/execa#childprocessresult). If the
[`reject: false`](#reject) option was used, the promise will be resolved with
that error instead.

```js
const { exec } = require('gulp-execa')

module.exports.outdated = async () => {
  await exec('npm outdated')
}
```

### stream(function, [options])

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
const { src, dest } = require('gulp')
const { stream } = require('gulp-execa')

module.exports.sort = () =>
  src('*.txt')
    .pipe(stream(({ path }) => `sort ${path}`))
    .pipe(dest('sorted'))
```

Each file in the stream will spawn a separate process. This can consume lots of
resources so you should only use this method when there are no alternatives such
as:

- firing a command programmatically instead of spawning a child process
- passing several files, a directory or a globbing pattern as arguments to the
  command

The [`verbose`](#verbose), [`stdout`](#stdout), [`stderr`](#stderr) and
[`stdio`](#stdio) options cannot be used with this method.

## Options

_Type_: `object`

#### echo

_Type_: `boolean`<br> _Default_: `true` for [`task()`](#taskcommand-options) and
[`exec()`](#execcommand-options), `false` for
[`stream()`](#streamfunction-options).

Whether the `command` should be printed on the console.

```bash
$ gulp audit
[13:09:39] Using gulpfile ~/code/gulpfile.js
[13:09:39] Starting 'audit'...
[13:09:39] [gulp-execa] npm audit
[13:09:44] Finished 'audit' after 4.96 s
```

#### verbose

_Type_: `boolean`<br> _Default_: `true` for [`task()`](#taskcommand-options) and
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

#### result

_Type_: `string`<br> _Value_: `'replace'` or `'save'`<br> _Default_: `'replace'`

With [`stream()`](#streamfunction-options), whether the command result should:

- `replace` the file's contents
- `save`: [be pushed](https://github.com/sindresorhus/execa#childprocessresult)
  to the `file.execa` array property

```js
const { src } = require('gulp')
const { stream } = require('gulp-execa')
const through = require('through2')

module.exports.default = () =>
  src('*.js')
    // Prints the number of lines of each file
    .pipe(stream(({ path }) => `wc -l ${path}`, { result: 'save' }))
    .pipe(
      through.obj((file, encoding, func) => {
        console.log(file.execa[0].stdout)
        func(null, file)
      }),
    )
```

#### from

_Type_: `string`<br> _Value_: `'stdout'`, `'stderr'` or `'all'`<br> _Default_:
`'stdout'`

Which output stream to use with [`result: 'replace'`](#result).

```js
const { src } = require('gulp')
const { stream } = require('gulp-execa')
const through = require('through2')

module.exports.default = () =>
  src('*.js')
    // Prints the number of lines of each file, including `stderr`
    .pipe(
      stream(({ path }) => `wc -l ${path}`, { result: 'replace', from: 'all' }),
    )
    .pipe(
      through.obj((file, encoding, func) => {
        console.log(file.contents.toString())
        func(null, file)
      }),
    )
```

#### maxConcurrency

_Type_: `integer`<br> _Default_: `100`

With [`stream()`](#streamfunction-options), how many commands to run in parallel
at once.

### Options from `execa`

All [`execa` options](https://github.com/sindresorhus/execa#options) can also be
used.

#### cleanup

_Type_: `boolean`<br> _Default_: `true`

Kill the spawned process when the parent process exits unless either:

- the spawned process is
  [`detached`](https://nodejs.org/api/child_process.html#child_process_options_detached)
- the parent process is terminated abruptly, for example, with `SIGKILL` as
  opposed to `SIGTERM` or a normal exit

#### preferLocal

_Type_: `boolean`<br> _Default_: `true`

Prefer locally installed binaries when looking for a binary to execute.<br> If
you `npm install foo`, you can then `execa('foo')`.

#### localDir

_Type_: `string`<br> _Default_: `process.cwd()`

Preferred path to find locally installed binaries in (use with
[`preferLocal`](#preferLocal)).

#### buffer

_Type_: `boolean`<br> _Default_: `true`

Buffer the output from the spawned process. When buffering is disabled you must
consume the output of the
[`stdout`](https://github.com/sindresorhus/execa#stdout) and
[`stderr`](https://github.com/sindresorhus/execa#stderr) streams because the
promise will not be resolved/rejected until they have completed.

#### input

_Type_: `string | Buffer | stream.Readable`

Write some input to the `stdin` of your binary.

#### stdin

_Type_: `string | number | Stream | undefined`<br> _Default_: `pipe`

Same options as
[`stdio`](https://nodejs.org/dist/latest-v6.x/docs/api/child_process.html#child_process_options_stdio).

#### stdout

_Type_: `string | number | Stream | undefined`<br> _Default_: `pipe`

Same options as
[`stdio`](https://nodejs.org/dist/latest-v6.x/docs/api/child_process.html#child_process_options_stdio).

#### stderr

_Type_: `string | number | Stream | undefined`<br> _Default_: `pipe`

Same options as
[`stdio`](https://nodejs.org/dist/latest-v6.x/docs/api/child_process.html#child_process_options_stdio).

#### reject

_Type_: `boolean`<br> _Default_: `true`

Setting this to `false` resolves the promise with the error instead of rejecting
it.

#### stripFinalNewline

_Type_: `boolean`<br> _Default_: `true`

Strip the final [newline character](https://en.wikipedia.org/wiki/Newline) from
the output.

#### extendEnv

_Type_: `boolean`<br> _Default_: `true`

Set to `false` if you don't want to extend the environment variables when
providing the [`env` option](#env).

### Options from `child_process`

All options from both
[`child_process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
and
[`child_process.exec()`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
are available.

#### cwd

_Type_: `string`<br> _Default_: `process.cwd()`

Current working directory of the child process.

#### env

_Type_: `object`<br> _Default_: `process.env`

Environment key-value pairs. Extends automatically from `process.env`. Set
[`extendEnv`](#extendenv) to `false` if you don't want this.

#### argv0

_Type_: `string`

Explicitly set the value of `argv[0]` sent to the child process. This will be
set to the `command`'s main file if not specified.

#### stdio

_Type_: `string | string[]`<br> _Default_: `pipe`

Child's
[stdio](https://nodejs.org/api/child_process.html#child_process_options_stdio)
configuration.

#### detached

_Type_: `boolean`

Run child independently of its parent process. Specific behavior
[depends on the platform](https://nodejs.org/api/child_process.html#child_process_options_detached).

#### uid

_Type_: `number`

Sets the user identity of the process.

#### gid

_Type_: `number`

Sets the group identity of the process.

#### shell

_Type_: `boolean | string`<br> _Default_: `false`

If `true`, runs `command` inside of a shell. Uses `/bin/sh` on UNIX and
`cmd.exe` on Windows. A different shell can be specified as a string. The shell
should understand the `-c` switch on UNIX or `/d /s /c` on Windows.

We recommend against using this option since it is:

- not cross-platform, encouraging shell-specific syntax
- slower, because of the additional shell interpretation
- unsafe, potentially allowing command injection

#### encoding

_Type_: `string | null`<br> _Default_: `utf8`

Specify the character encoding used to decode the `stdout` and `stderr` output.
If set to `null`, then `stdout` and `stderr` will be a `Buffer` instead of a
`string`.

#### timeout

_Type_: `number`<br> _Default_: `0`

If timeout is greater than `0`, the parent will send the signal identified by
the [`killSignal` option](#killsignal) if the child runs longer than `timeout`
milliseconds.

#### maxBuffer

_Type_: `number`<br> _Default_: `10000000` (`10MB`)

Largest amount of data in bytes allowed on `stdout` or `stderr`.

#### killSignal

_Type_: `string | number`<br> _Default_: `SIGTERM`

Signal value to be used when the spawned process will be killed.

#### windowsVerbatimArguments

_Type_: `boolean`<br> _Default_: `false`

If `true`, no quoting or escaping of arguments is done on Windows. Ignored on
other platforms. This is set to `true` automatically when the
[`shell` option](#shell) is `true`.

#### windowsHide

_Type_: `boolean`<br> _Default_: `true`

Hide the subprocess console window that would normally be created on Windows
systems.
