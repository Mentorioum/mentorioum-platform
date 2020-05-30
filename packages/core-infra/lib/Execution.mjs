import {NotYetImplementedError} from "@mentorioum/core-error";

/**
 * @interface
 */

export class Execution {

  constructor() {
    this.attachAndStart = this.attachAndStart.bind(this)
  }

  /**
   * Attach execution to some computation resource and start it
   * @param {Object|undefined} context - any execution context object or not arguments
   */
  attachAndStart(context) {
    throw new NotYetImplementedError()
  }

}
