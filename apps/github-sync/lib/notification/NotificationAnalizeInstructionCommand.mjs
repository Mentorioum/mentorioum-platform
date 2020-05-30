import {Command} from "@mentorioum/core-infra";

export class NotificationAnalyzeInstructionCommand extends Command {

  #log = null

  constructor(logger) {
    super()
    this.#log = logger
  }

  async execute(options) {
    let { notification } = options;

    /**
     * @todo #11:55m/DEV Integrate instruction parser
     *
     */

    this.#log.info({notification}, 'Analyze Instructions !')
  }

}
