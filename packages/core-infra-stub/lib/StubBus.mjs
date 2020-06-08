import {Bus} from "@mentorioum/core-infra";
import sinon from "sinon";

export class StubBus extends Bus {

  #publish = null
  #subscribe = null
  #unsubscribe = null

  constructor(stubs = {}) {
    super();

    this.#publish = stubs.publish || sinon.stub()
    this.#subscribe = stubs.subscribe || sinon.stub()
    this.#unsubscribe = stubs.unsubscribe || sinon.stub()
  }

  get stubs () {
    return {
      publish: this.#publish,
      subscribe: this.#subscribe,
      unsubscribe: this.#unsubscribe,
    }
  }

  async publish(...args) {
    return this.#publish.apply(this, args);
  }

  async subscribe(...args) {
    return this.#subscribe.apply(this, args);
  }

  async unsubscribe(...args) {
    return this.#unsubscribe.apply(this, args);
  }
}
