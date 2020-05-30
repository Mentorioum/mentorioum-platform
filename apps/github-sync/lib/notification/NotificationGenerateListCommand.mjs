import {Command} from "@mentorioum/core-infra";

export class NotificationGenerateListCommand extends Command {

  /**
   * @type {Logger}
   */
  #log = null


  constructor(logger) {
    super()
    this.#log = logger
  }

  async execute() {
    this.#log.info('Start fake notification Fetch')
    return {
      notifications: ['issues', 'comments']
    }
  }

}
