import assert from 'assert'
import {ProcessExecution} from "./ProcessExecution";
import {LifecycleExecution} from "@mentorioum/core-infra";
import {InfraContext} from "@mentorioum/infra-context";
import {InfraConfig} from "@mentorioum/infra-config";
import {InfraBusManager} from "@mentorioum/infra-manager";

export class InfraExecution extends LifecycleExecution {

  #process = null

  /**
   * @constructor
   * @param {Function} createLifecycle - factory function to create lifecycle
   */

  constructor(createLifecycle) {
    assert(createLifecycle, 'Infra execution should have a lifecycle factory function')

    const config = new InfraConfig()
    const context = new InfraContext(
      config.workflow
    )

    /**
     * @todo #15:20m/DEV Refactor to use manager
     *
     */
    let manager = createLifecycle(context, config)

    manager = new InfraBusManager(manager, context.bus)

    super(manager);

    this.#process = new ProcessExecution(
      manager,
      process,
      context.logger
    )
  }


  attachAndStart() {
    this.#process.attachAndStart();
  }
}
