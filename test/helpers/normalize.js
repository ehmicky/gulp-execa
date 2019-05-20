import stripAnsi from 'strip-ansi'

// Normalize Gulp output so it's predictable across time and environments
export const normalizeMessage = function(message) {
  const messageA = stripAnsi(message)
  const messageB = REPLACEMENTS.reduce(replacePart, messageA)
  const messageC = messageB.trim()
  return messageC
}

const replacePart = function(message, [before, after]) {
  return message.replace(before, after)
}

const REPLACEMENTS = [
  // Windows
  [/\r\n/gu, '\n'],
  // File paths
  [/[^ (\n]+\/[^ )\n]+/gu, '/path'],
  // Stack traces
  [/ +at [^]+/gu, '    at STACK TRACE'],
  // Gulp shows file content that triggered an error
  [/[^]+Error:/gu, ''],
  // Timestamps
  [/\[\d{2}:\d{2}:\d{2}\]/gu, '[12:00:00]'],
  // Duration
  [/(\d+\.)?\d+ (([μnm]?s)|(min))/gu, '100 ms'],
  // Make snapshots less verbose
  [/.*Working directory changed.*/gu, ''],
  [/.*Using gulpfile.*/gu, ''],
  // Node <12 prints errors differently
  [/[^]*uid" (property )?must be[^]*/gu, 'invalid options.uid'],
]
