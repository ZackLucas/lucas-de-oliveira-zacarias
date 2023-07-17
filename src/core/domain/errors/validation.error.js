export class ValidationError extends Error {
  constructor(param, errorMessage) {
    super(errorMessage)
    this.name = this.constructor.name
    this.status = 403
  }
}
