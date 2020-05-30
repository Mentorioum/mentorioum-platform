import {Execution} from "./Execution";
import assert from "assert";

export class LifecycleExecution extends Execution{

  #lifecycle = null

  /**
   * @constructor
   * @param {Lifecycle} lifecycle instance
   */

  constructor(lifecycle) {
    super();

    assert(lifecycle, 'Should have a lifecycle instance')

    this.#lifecycle = lifecycle
  }

  /**
   * Get lifecycle
   * @returns {Lifecycle}
   */

  get lifecycle () {
    return this.#lifecycle
  }

}
