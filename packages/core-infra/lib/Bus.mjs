import {NotYetImplementedError} from "@mentorioum/core-error";

/**
 * @interface
 * Messages Bus accessible to all infrastructure
 */

export class Bus {

  constructor() {
    this.publish = this.publish.bind(this)
    this.subscribe = this.subscribe.bind(this)
  }

  /**
   * @param {String} event - uniq event name
   * @param {*} message
   * @return {Promise<void>}
   */
  async publish(event, message) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {String} event - uniq event name
   * @param {Function} callback
   * @return {Promise<Subscription>}
   */
  async subscribe(event, callback){
    throw new NotYetImplementedError()
  }
}
