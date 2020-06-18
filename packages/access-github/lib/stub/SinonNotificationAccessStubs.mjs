import sinon from "sinon";

export class SinonNotificationAccessStubs {

  #findMany = null
  #markAsRead = null

  constructor() {

    this.#findMany = sinon.stub()
    this.#markAsRead = sinon.stub()
  }

  get findMany() {
    return this.#findMany
  }

  get markAsRead() {
    return this.#markAsRead
  }
}
