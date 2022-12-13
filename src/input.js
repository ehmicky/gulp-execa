import { throwError } from './error.js'

// Validate main command and arguments
export const validateInput = (input) => {
  if (!isValidInput(input)) {
    throwError(`The command must be a non-empty string: ${input}`)
  }
}

export const isValidInput = (input) =>
  typeof input === 'string' && input.trim() !== ''
