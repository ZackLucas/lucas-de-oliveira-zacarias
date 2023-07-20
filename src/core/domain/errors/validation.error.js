export class ValidationError extends Error {
  constructor(param, errorMessage) {
    super(errorMessage)
    this.name = this.constructor.name
    this.param = param
    this.status = 403
  }
}
