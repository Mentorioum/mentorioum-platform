import sinon from "sinon";

export class SinonSubscriptionStubs {

  #detach = null
  #name = null

  constructor() {
    this.#detach = sinon.stub()
    this.#name = sinon.stub()
  }

  get detach ()  {
    return this.#detach
  }

  get name ()  {
    return this.#name
  }

}
