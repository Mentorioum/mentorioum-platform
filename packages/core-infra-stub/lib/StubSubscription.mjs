import {Subscription} from "@mentorioum/core-infra";
import {SinonSubscriptionStubs} from "./stubs/SinonSubscriptionStubs";

export class StubSubscription extends Subscription {

  #stubs = null

  constructor() {
    super();

    this.#stubs = new SinonSubscriptionStubs()
  }

  get stubs () {
    return this.#stubs;
  }

  async detach(...args) {
    return this.#stubs.detach.apply(this, args)
  }
}
