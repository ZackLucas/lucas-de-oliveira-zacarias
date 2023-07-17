export class SystemError extends Error {
  constructor(errorMessage = 'Erro inesperado.') {
    super(errorMessage)
    this.name = this.constructor.name
  }
}
