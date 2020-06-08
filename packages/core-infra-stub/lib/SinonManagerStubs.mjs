import sinon from "sinon";
import {SinonLifecycleStubs} from "./SinonLifecycleStubs";

export class SinonManagerStubs {

  #events = null
  #lifecycle = null

  constructor() {
    this.#lifecycle = new SinonLifecycleStubs();

    this.#events = sinon.stub()
  }

  get events() {
    return this.#events;
  }

  get name () {
    return this.#lifecycle.name;
  }

  get startup() {
    return this.#lifecycle.startup;
  }

  get shutdown() {
    return this.#lifecycle.shutdown;
  }
}
