import {Command} from "@mentorioum/core-infra";

export class NotificationAnalyzeInstructionCommand extends Command {

  #log = null

  constructor(logger) {
    super()
    this.#log = logger
  }

  async execute(options) {
    let { notification } = options;

    this.#log.info({notification}, 'Analyze Instructions !')
  }

}
