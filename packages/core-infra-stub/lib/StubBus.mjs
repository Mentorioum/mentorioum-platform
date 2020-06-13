import {Bus} from "@mentorioum/core-infra";
import {SinonBusStubs} from "./stubs/SinonBusStubs";

export class StubBus extends Bus {
  #stubs = null

  constructor(stubs = {}) {
    super();

    this.#stubs = new SinonBusStubs()
  }

  get stubs () {
    return this.#stubs
  }

  async publish(...args) {
    return this.#stubs.publish.apply(this, args);
  }

  async subscribe(...args) {
    return this.#stubs.subscribe.apply(this, args);
  }
}
