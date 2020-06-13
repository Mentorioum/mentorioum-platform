import sinon from "sinon";

export class SinonCommandStubs {

  #execute = null

  constructor() {
    this.#execute = sinon.stub()
  }

  get execute ()  {
    return this.#execute
  }

}
