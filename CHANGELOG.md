# 6.0.0

## Breaking changes

- Minimal supported Node.js version is now `18.18.0`

# 5.0.1

## Bug fixes

- Fixes not being able to set the
  [`encoding` option](https://github.com/sindresorhus/execa/#encoding) to `null`

# 5.0.0

## Breaking changes

- Minimal supported Node.js version is now `16.17.0`

# 4.5.0

## Features

- Upgrade Execa

# 4.4.1

## Bug fixes

- Fix TypeScript types

# 4.4.0

## Features

- Improve TypeScript types

# 4.3.0

## Features

- Improve tree-shaking support

# 4.2.0

## Features

- Reduce npm package size

# 4.1.0

## Features

- Add TypeScript types

# 4.0.0

## Breaking changes

- Minimal supported Node.js version is now `14.18.0`

## Features

- The [`cwd` option](https://github.com/sindresorhus/execa#cwd) can now be a URL

# 3.0.2

## Bug fixes

- Fix examples

# 3.0.1

## Bug fixes

- Fix `main` field in `package.json`

# 3.0.0

## Breaking changes

- Minimal supported Node.js version is now `12.20.0`
- This package is now an ES module. It can only be loaded with an `import` or
  `import()` statement, not `require()`. See
  [this post for more information](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

## Features

- Improve colors detection

# 2.0.0

## Breaking changes

- Minimal supported Node.js version is now `10.17.0`
- Add `stderr` and `stdout` to
  [`error.message`](https://github.com/sindresorhus/execa#message). A new
  property
  [`error.shortMessage`](https://github.com/sindresorhus/execa#shortmessage) is
  now available to retrieve the error message without `stderr` nor `stdout`
  (#397)

## Features

- Upgrade to
  [Execa `4.0.0`](https://github.com/sindresorhus/execa/releases/tag/v4.0.0)

# 1.1.0

## Features

- Add
  [`serialization` option](https://github.com/sindresorhus/execa/blob/master/readme.md#serialization).
  That option was added to `child_process` methods in Node.js `13.2.0`.

# 1.0.3

## Bug fixes

- Default the [`all` option](https://github.com/sindresorhus/execa#all-2) to
  `true` when [`from: 'all'`](https://github.com/ehmicky/gulp-execa#from) is
  used.
- Allow passing the
  [`execPath` Execa option](https://github.com/sindresorhus/execa#execpath)

# 1.0.2

## Dependencies

- [Upgrade `execa`](https://github.com/sindresorhus/execa/releases/tag/v3.0.0)

# 1.0.1

## Bug fixes

- Fix errors being thrown when the `detached` or `cleanup` options are used
  (https://github.com/sindresorhus/execa/pull/360)

# 1.0.0

## Features

- Upgrade to latest execa release
  [2.0.0](https://medium.com/@ehmicky/execa-v2-20ffafeedfdf)

# 0.9.1

## Internal

- Fix some tests

# 0.9.0

## Internal

- Only internal changes and documentation updates

# 0.8.0

## Features

- [`error.stdout`](https://github.com/sindresorhus/execa#stdout),
  [`error.stderr`](https://github.com/sindresorhus/execa#stderr) and
  [`error.all`](https://github.com/sindresorhus/execa#all) now contain the data
  that was sent before the child process exit.
- If
  [`childProcess.kill()`](https://github.com/sindresorhus/execa#killsignal-options)
  does not terminate a child process after 5 seconds, force it by sending
  `SIGKILL`. This can be configured using the
  [`forceKillAftrerTimeout` option](https://github.com/sindresorhus/execa#optionsforcekillaftertimeout).
- Increase [`maxBuffer`](https://github.com/sindresorhus/execa#maxbuffer) option
  default value from `10 MB` to `100 MB`

## Bug fixes

- Ensure errors always have the same shape.

# 0.7.1

## Bug fixes

- Fix `npm install gulp-execa` sometimes failing (#2)

# 0.7.0

## Features

- Improve error messages

# 0.6.1

## Bug fixes

- Fix option `env` triggering process warnings

# 0.6.0

## Dependencies

- Remove dependency `keep-func-props`

# 0.5.5

## Internal

- Upgrade to latest `execa`

# 0.5.4

## Bug fixes

- Fix a bug where the wrong dependency version was installed.

# 0.5.3

## Bug fixes

- Fix bug when escaping multiple spaces with backslashes in the command.

# 0.5.2

## Bug fixes

- Fix error messages for `task()` on Node `>=12.3.0`

# 0.5.0

## Features

- The `function` passed to `stream()` can now return an object, allowing
  file-specific options.
