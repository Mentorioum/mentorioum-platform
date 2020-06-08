import {NotYetImplementedError} from "@mentorioum/core-error";

/**
 * @interface
 * Messages Bus accessible to all infrastructure
 */

export class Bus {

  constructor() {
    this.publish = this.publish.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
  }

  async publish(message, callback) {
    throw new NotYetImplementedError()
  }

  async subscribe(messages, callback){
    throw new NotYetImplementedError()
  }

  async unsubscribe(subscription){
    throw new NotYetImplementedError()
  }
}
