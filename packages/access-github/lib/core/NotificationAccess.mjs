/**
 * @interface
 */
import {NotYetImplementedError} from "@mentorioum/core-error";

export class NotificationAccess {

  constructor() {
    this.findMany = this.findMany.bind(this)
    this.markAsRead = this.markAsRead.bind(this)
  }

  async findMany (options) {
    throw new NotYetImplementedError()
  }

  async markAsRead(id) {
    throw new NotYetImplementedError()
  }
}
