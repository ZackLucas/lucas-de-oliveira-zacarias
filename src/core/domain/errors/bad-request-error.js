export class BadRequestError extends Error {
  constructor(param, errorMessage) {
    super(errorMessage)
    this.name = 'BadRequestError'
  }
}
