# 0.8.0

## Features

- [`error.stdout`](https://github.com/sindresorhus/execa#stdout), [`error.stderr`](https://github.com/sindresorhus/execa#stderr) and [`error.all`](https://github.com/sindresorhus/execa#all) now contain the data that was sent before the child process exit.
- If [`childProcess.kill()`](https://github.com/sindresorhus/execa#killsignal-options) does not terminate a child process after 5 seconds, force it by sending `SIGKILL`. This can be configured using the [`forceKillAftrerTimeout` option](https://github.com/sindresorhus/execa#optionsforcekillaftertimeout).
- Increase [`maxBuffer`](https://github.com/sindresorhus/execa#maxbuffer) option default value from `10 MB` to `100 MB`

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
