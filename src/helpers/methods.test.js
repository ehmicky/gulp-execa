// We repeat most tests for each API method
export const EXEC_METHODS = [
  // `exec(...)`
  { title: 'exec', method: 'exec' },
]

export const TASK_METHODS = [
  // `task(...)`
  { title: 'task', method: 'task' },
]

export const STREAM_METHODS = [
  // `gulp.src(...).pipe(stream(..., { result: 'replace' }))`
  { title: 'stream-buffer', method: 'stream' },
  // `gulp.src(..., { buffer: false }).pipe(stream(..., { result: 'replace' }))`
  { title: 'stream-stream', method: 'stream', buffer: false },
  // `gulp.src(...).pipe(stream(..., { result: 'save' }))`
  { title: 'stream-save', method: 'stream', opts: { result: 'save' } },
]

export const METHODS = [...EXEC_METHODS, ...TASK_METHODS, ...STREAM_METHODS]
