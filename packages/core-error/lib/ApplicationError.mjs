export class ApplicationError extends Error {

  constructor(message) {
    super(message);
  }

  get name () {
    return this.constructor.name
  }
}
