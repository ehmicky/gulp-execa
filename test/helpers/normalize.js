// TODO: use `util.stripVTControlCharacters()` after dropping support for
// Node <16.11.0
import stripAnsi from 'strip-ansi'

// Normalize Gulp output so it's predictable across time and environments
export const normalizeMessage = function (message) {
  const messageA = stripAnsi(message)
  const messageB = REPLACEMENTS.reduce(replacePart, messageA)
  const messageC = messageB.trim()
  return messageC
}

const replacePart = function (message, [before, after]) {
  return message.replace(before, after)
}

const REPLACEMENTS = [
  // Windows
  [/\r\n/gu, '\n'],
  // Different exit codes across OS
  [/exit code 1 \(Unknown system error -1\)/gu, 'ENOENT'],
  [/exit code 2 \(ENOENT\)/gu, 'ENOENT'],
  [/spawn gulp ENOENT\n/gu, ''],
  // File paths
  [/[^ (\n]+\/[^ )\n]+/gu, '/path'],
  // Node <12 prints errors differently
  [/Emitted 'error' event on Domain instance at.*\n/gu, ''],
  // execa errors have additional properties.
  // Those are printed by `util.inspect()`. However they contain `stack` and
  // `domainEmitter`, so we remove them.
  [/^([ \t]+)at [^\r\n]+\{[^]+/gmu, ''],
  // Node <12 prints errors differently
  [/[^]*uid" (property )?must be[^]*/gu, 'invalid options.uid'],
  [/\]$/u, ''],
  [/Emitted 'error' event at:\n/gu, ''],
  // Stack traces
  [/^([ \t]+)at [^\r\n]+$/gmu, '$1at STACK TRACE'],
  [/(([ \t]+)at STACK TRACE(\r?\n)?)+/gu, '$2at STACK TRACE$3'],
  // Gulp shows file content that triggered an error
  [/[^]+Error:/gu, ''],
  // Gulp warning
  [/.*DEP0097.*/gu, ''],
  [/.*node --trace-deprecation.*/gu, ''],
  // Timestamps
  [/\[\d{2}:\d{2}:\d{2}\]/gu, '[12:00:00]'],
  // Duration
  [/(\d+\.)?\d+ (([μnm]?s)|(min))/gu, '100 ms'],
  // Versions
  [/\d+\.\d+\.\d+/gu, '1.0.0'],
  // Make snapshots less verbose
  [/.*Working directory changed.*/gu, ''],
  [/.*Using gulpfile.*/gu, ''],
]
