import {Manager} from "@mentorioum/core-infra";
import sinon from "sinon";
import {StubLifecycle} from "./StubLifecyce";

export class StubManager extends Manager {

  #events = null
  #lifecycle = null

  constructor(stubs = {}) {
    super();

    this.#lifecycle = new StubLifecycle(stubs);

    this.#events = stubs.events || sinon.stub()
  }

  get stubs () {
    return {
      ...this.#lifecycle.stubs,
      events: this.#events
    }
  }

  get events() {
    return this.#events;
  }

  async startup(...args) {
    return this.#lifecycle.startup.apply(this,args)
  }

  async shutdown(...args) {
    return this.#lifecycle.shutdown.apply(this,args)
  }
}
