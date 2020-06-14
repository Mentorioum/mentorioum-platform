import {NotificationAccess} from "../core/NotificationAccess";
import {SinonNotificationAccessStubs} from "./SinonNotificationAccessStubs";

export class StubNotificationAccess extends NotificationAccess {

  #stubs = null

  constructor() {
    super();

    this.#stubs = new SinonNotificationAccessStubs()
  }

  get stubs () {
    return this.#stubs
  }

  async findMany(...args) {
    return this.#stubs.findMany.apply(this, args)
  }

  async markAsRead(id) {
    return this.#stubs.markAsRead.apply(this, args)
  }
}
