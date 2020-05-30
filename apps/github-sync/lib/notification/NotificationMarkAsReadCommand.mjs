import {Command} from "@mentorioum/core-infra";

export class NotificationMarkAsReadCommand extends Command {

  #log = null

  constructor(logger) {
    super()
    this.#log = logger
  }

  async execute(options) {
    let { notification } = options;

    /**
     * @todo #11:55m/DEV Integrate with mark as read
     *
     */

    this.#log.info({notification}, ' Marked as Read!')
  }

}
