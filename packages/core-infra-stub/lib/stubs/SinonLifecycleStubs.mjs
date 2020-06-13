import sinon from "sinon";

export class SinonLifecycleStubs {

  #name = null
  #startup = null
  #shutdown = null

  constructor() {
    this.#name = sinon.stub()
    this.#startup = sinon.stub()
    this.#shutdown = sinon.stub()
  }

  get name() {
    return this.#name
  }

  get startup() {
    return this.#startup;
  }

  get shutdown() {
    return this.#shutdown;
  }
}
