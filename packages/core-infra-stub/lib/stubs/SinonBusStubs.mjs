import sinon from "sinon";

export class SinonBusStubs {

  #publish = null
  #subscribe = null
  #unsubscribe = null

  constructor() {
    this.#publish = sinon.stub()
    this.#subscribe = sinon.stub()
    this.#unsubscribe =  sinon.stub()
  }

  get publish() {
    return this.#publish
  }

  get subscribe() {
    return this.#subscribe;
  }

  get unsubscribe() {
    return this.#unsubscribe;
  }
}
