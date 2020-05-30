import {NotYetImplementedError} from "@mentorioum/core-error";

/**
 * @interface
 * Container for infrastructure services, like configuration, logger, auth, etc
 */

export class Context {

  /**
   * @returns {Logger}
   */

  get logger() {
    throw new NotYetImplementedError()
  }

  /**
   * @returns {Bus}
   */

  get bus() {
    throw new NotYetImplementedError()
  }

}

