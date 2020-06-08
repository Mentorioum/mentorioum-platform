import {Lifecycle} from "@mentorioum/core-infra";
import sinon from "sinon";

export class StubLifecycle extends Lifecycle {

  #name = null
  #startup = null
  #shutdown = null

  constructor(stubs = {}) {
    super();

    this.#name = stubs.name || sinon.stub()
    this.#startup = stubs.startup || sinon.stub()
    this.#shutdown = stubs.shutdown || sinon.stub()
  }

  get stubs () {
    return {
      name :this.#name,
      startup :this.#startup,
      shutdown :this.#shutdown,
    }
  }

  get name() {
    return this.#name();
  }

  async startup(...args) {
    return this.#startup.apply(this,args)
  }

  async shutdown(...args) {
    return this.#shutdown.apply(this, args);
  }
}
