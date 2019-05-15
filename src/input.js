// Validate main command and arguments
export const validateInput = function({ input }) {
  if (!isValidInput({ input })) {
    throw new Error(`The command must be a non-empty string: ${input}`)
  }
}

export const isValidInput = function({ input }) {
  return typeof input === 'string' && input.trim() !== ''
}
