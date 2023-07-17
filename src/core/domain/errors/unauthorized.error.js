export class UnauthorizedError extends Error {
  constructor(errorMessage = 'Acesso negado.') {
    super(errorMessage)
    this.name = this.constructor.name
  }
}
