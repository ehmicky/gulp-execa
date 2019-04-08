// We allow a single string (command + arguments) as input but we pass it
// to `execa()` instead of `execa.shell()` because it is more secure,
// cross-platform and faster.
// See https://github.com/sindresorhus/execa/issues/176
// Here we split the string input to the arguments expected by `execa()`
const splitInput = function({ input }) {
  const [command, ...args] = input
    .trim()
    .split(SPACES_REGEXP)
    .reduce(handleEscaping, [])
  return { command, args }
}

// Do not split on other whitespaces than spaces to allow tabs or newlines
// as arguments.
// Squash consecutive spaces into a single delimiter.
const SPACES_REGEXP = / +/gu

// Allow spaces to be escaped by a backslash if not meant as a delimiter
const handleEscaping = function(parts, part, index) {
  if (index === 0) {
    return [...parts, part]
  }

  const previousPart = parts[index - 1]

  if (!previousPart.endsWith(ESCAPE_CHAR)) {
    return [...parts, part]
  }

  const firstParts = parts.slice(0, index - 1)
  const previousPartA = `${previousPart} ${part}`
  return [...firstParts, previousPartA]
}

const ESCAPE_CHAR = '\\'

module.exports = {
  splitInput,
}
