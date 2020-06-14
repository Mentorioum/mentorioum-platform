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
   * @returns {Object}
   */


  get events () {
    throw new NotYetImplementedError()
  }

}
