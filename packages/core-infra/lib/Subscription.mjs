import {NotYetImplementedError} from "@mentorioum/core-error";

/**
 * @interface
 * Event Subscription
 */

export class Subscription {

  constructor() {
    this.detach = this.detach.bind(this)
  }

  /**
   * Event name
   */

  get name() {
    throw new NotYetImplementedError()
  }

  async detach(){
    throw new NotYetImplementedError()
  }
}
