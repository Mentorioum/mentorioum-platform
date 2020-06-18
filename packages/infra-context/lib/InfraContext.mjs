import {Context} from "@mentorioum/core-infra";
import {InfraLogger} from "@mentorioum/infra-logger";
import {InfraBus} from "@mentorioum/infra-bus";

export class InfraContext extends Context {

  #logger = null
  #bus = null

  /**
   * @constructor
   * @param workflow {InfraWorkflowConfig} - workflow config
   */

  constructor(workflow) {
    super()


    /**
     * @todo #12:1h/DEV - Pass env configs
     *   add at least level configuration
     *
     */
    this.#logger = new InfraLogger()
    this.#bus = new InfraBus({
        baseUrl: workflow.baseUrl,
        asyncResponseTimeout: workflow.asyncResponseTimeout
    },
      this.#logger
    )
  }

  get logger () {
    return this.#logger
  }

  get bus () {
    return this.#bus
  }

}
