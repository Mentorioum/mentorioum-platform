import {Manager} from "@mentorioum/core-infra";
import {SinonManagerStubs} from "./stubs/SinonManagerStubs";

export class StubManager extends Manager {
  #stubs = null

  constructor() {
    super();

    this.#stubs = new SinonManagerStubs();
  }

  get stubs () {
    return this.#stubs
  }

  get name() {
    return this.#stubs.name();
  }

  get events() {
    return this.#stubs.events();
  }

  async startup(...args) {
    return this.#stubs.startup.apply(this,args)
  }

  async shutdown(...args) {
    return this.#stubs.shutdown.apply(this,args)
  }
}
