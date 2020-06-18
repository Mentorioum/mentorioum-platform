import {Command} from "@mentorioum/core-infra";
import assert from "assert";

export class NotificationMarkAsReadCommand extends Command {

  #log = null
  #notifications = null

  constructor(notifications, logger) {
    super()
    assert(notifications, 'should have notifications')
    assert(logger, 'should have logger')

    this.#log = logger.child({module: this.constructor.name})
    this.#notifications = notifications
  }

  async execute(options) {
    let { notification } = options;

    if (!notification) {

      /**
       * @todo #12:60m/DEV - Provide input validation for command
       *  add module which extends core command with input validation
       */
      return;
    }
    await this.#notifications.markAsRead(notification.id)

    this.#log.info(`Marked notification #id: ${notification.id} as read`)
  }

}
