import {ApplicationError} from "./ApplicationError";

export class NotYetImplementedError extends ApplicationError {

  constructor(message) {
    super(message || 'No implementation found');
  }
}
