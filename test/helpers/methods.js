// We repeat most tests for each API method
export const STREAM_METHODS = [
  // `gulp.src(...).pipe(stream(..., { result: 'replace' }))`
  { suffix: 'stream-buffer', method: 'stream' },
  // `gulp.src(..., { buffer: false }).pipe(stream(..., { result: 'replace' }))`
  { suffix: 'stream-stream', method: 'stream', buffer: false },
  // `gulp.src(...).pipe(stream(..., { result: 'save' }))`
  { suffix: 'stream-save', method: 'stream', opts: { result: 'save' } },
]

export const METHODS = [
  // `exec(...)`
  { suffix: 'exec', method: 'exec' },
  // `task(...)`
  { suffix: 'task', method: 'task' },
  ...STREAM_METHODS,
]
