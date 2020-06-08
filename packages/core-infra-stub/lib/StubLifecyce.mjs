import {Lifecycle} from "@mentorioum/core-infra";
import {SinonLifecycleStubs} from "./SinonLifecycleStubs";

export class StubLifecycle extends Lifecycle {
  #stubs = null

  constructor(stubs = {}) {
    super();

    this.#stubs = new SinonLifecycleStubs()
  }

  get stubs () {
    return this.#stubs
  }

  get name() {
    return this.#stubs.name;
  }

  async startup(...args) {
    return this.#stubs.startup.apply(this,args)
  }

  async shutdown(...args) {
    return this.#stubs.shutdown.apply(this, args);
  }
}
