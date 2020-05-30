import {Command} from "@mentorioum/core-infra";

export class NotificationMarkAsReadCommand extends Command {

  #log = null

  constructor(logger) {
    super()
    this.#log = logger
  }

  async execute(options) {
    let { notification } = options;

    this.#log.info({notification}, ' Marked as Read!')
  }

}
