import { ValidationError } from './validation.error.js'

export class RequiredParamError extends ValidationError {
  constructor(param, message) {
    super(param, message || `${param} is required.`)
  }
}
