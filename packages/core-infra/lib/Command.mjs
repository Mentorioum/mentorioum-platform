import {NotYetImplementedError} from "@mentorioum/core-error";

/**
 * @interface
 */

export class Command {

  constructor() {
    this.execute = this.execute.bind(this)
  }

  async execute(options) {
      throw new NotYetImplementedError()
  }
}
