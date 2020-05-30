import {Command} from "@mentorioum/core-infra";

export class GithubSayHelloCommand extends Command {

  #log = null

  constructor(logger) {
    super()
    this.#log = logger
  }

  async execute(options) {
    let { notification, action } = options;

    this.#log.info({notification, action}, 'say hello from here')
  }

}
