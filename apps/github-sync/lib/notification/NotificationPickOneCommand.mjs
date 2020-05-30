import {Command} from "@mentorioum/core-infra";

export class NotificationPickOneCommand extends Command {

  #log = null

  constructor(logger) {
    super()
    this.#log = logger
  }

  async execute(options) {
    let { notifications, notificationIndex = 0} = options;
    let total = notifications.length
    let notification = notifications[notificationIndex]

    notificationIndex = notificationIndex + 1

    const completed = notificationIndex === total

    return {
      notificationIndex,
      completed,
      notification
    }
  }

}
