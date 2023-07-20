import { ValidationError } from './validation.error.js'

export class InvalidParamError extends ValidationError {
  constructor(param, message) {
    super(param, message || `${param} is not valid.`)
  }
}
