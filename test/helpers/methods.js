// We repeat most tests for each API method
export const EXEC_METHODS = [
  // `exec(...)`
  { name: 'exec', method: 'exec' },
]

export const TASK_METHODS = [
  // `task(...)`
  { name: 'task', method: 'task' },
]

export const STREAM_METHODS = [
  // `gulp.src(...).pipe(stream(..., { result: 'replace' }))`
  { name: 'stream-buffer', method: 'stream' },
  // `gulp.src(..., { buffer: false }).pipe(stream(..., { result: 'replace' }))`
  { name: 'stream-stream', method: 'stream', buffer: false },
  // `gulp.src(...).pipe(stream(..., { result: 'save' }))`
  { name: 'stream-save', method: 'stream', opts: { result: 'save' } },
]

export const METHODS = [...EXEC_METHODS, ...TASK_METHODS, ...STREAM_METHODS]
