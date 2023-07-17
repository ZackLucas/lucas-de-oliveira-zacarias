import { ValidationError } from './validation.error'

export class InvalidParamError extends ValidationError {
  constructor(param, message) {
    super(param, message || `Parâmetro ${param} inválido`)
  }
}
