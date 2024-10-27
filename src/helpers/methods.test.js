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
  // `pipeline(
  //    gulp.src(...),
  //    stream(..., { result: 'replace' }),
  //  )`
  { title: 'stream-buffer', method: 'stream' },
  // `pipeline(
  //    gulp.src(..., { buffer: false }),
  //    stream(..., { result: 'replace' }),
  //  )`
  { title: 'stream-stream', method: 'stream', buffer: false },
  // `pipeline(
  //    gulp.src(...),
  //    stream(..., { result: 'save' }),
  //  )`
  { title: 'stream-save', method: 'stream', opts: { result: 'save' } },
]

export const METHODS = [...EXEC_METHODS, ...TASK_METHODS, ...STREAM_METHODS]
