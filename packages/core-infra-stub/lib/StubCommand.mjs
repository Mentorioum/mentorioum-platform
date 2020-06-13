import {Command} from "@mentorioum/core-infra";
import {SinonCommandStubs} from "./SinonCommandStubs";

export class StubCommand extends Command {

  #stubs = null

  constructor() {
    super();

    this.#stubs = new SinonCommandStubs()
  }

  get stubs () {
    return this.#stubs;
  }

  async execute(...args) {
    return this.#stubs.execute.apply(this, args)
  }
}
