export const STREAM_METHODS = [
  { suffix: 'stream-buffer', method: 'stream' },
  { suffix: 'stream-stream', method: 'stream', buffer: false },
  { suffix: 'stream-save', method: 'stream', opts: { result: 'save' } },
]

export const METHODS = [
  { suffix: 'exec', method: 'exec' },
  { suffix: 'task', method: 'task' },
  ...STREAM_METHODS,
]
