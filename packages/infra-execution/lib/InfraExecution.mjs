import assert from 'assert'
import {ProcessExecution} from "./ProcessExecution";
import {LifecycleExecution} from "@mentorioum/core-infra";
import {InfraContext} from "@mentorioum/infra-context";
import {InfraConfig} from "@mentorioum/infra-config";

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
    const lifecycle = createLifecycle(context, config)

    super(lifecycle);

    this.#process = new ProcessExecution(
      lifecycle,
      process,
      context.logger
    )
  }


  attachAndStart() {
    this.#process.attachAndStart();
  }
}
