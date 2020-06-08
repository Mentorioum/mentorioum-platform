import {NotYetImplementedError} from "@mentorioum/core-error";
import {Lifecycle} from "./Lifecycle";

/**
 * @interface
 */

export class Manager  extends Lifecycle {

  constructor() {
    super();
  }

  /**
   * Declares events
   * @returns {Lifecycle}
   */


  get events () {
    throw new NotYetImplementedError()
  }

}
