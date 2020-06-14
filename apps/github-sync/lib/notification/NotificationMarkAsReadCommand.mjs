import {Command} from "@mentorioum/core-infra";

export class NotificationMarkAsReadCommand extends Command {

  #log = null
  #notifications = null

  constructor(notifications, logger) {
    super()
    this.#log = logger.child({module: this.constructor.name})
    this.#notifications = notifications
  }

  async execute(options) {
    let { notification } = options;

    await this.#notifications.markAsRead(notification.id)

    this.#log.info(`Marked notification #id: ${notification.id} as read`)
  }

}
