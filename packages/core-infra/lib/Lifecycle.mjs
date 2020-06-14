import {NotYetImplementedError} from "@mentorioum/core-error";

/**
 * @interface
 */

export class Lifecycle {

  constructor() {
    this.startup = this.startup.bind(this)
    this.shutdown = this.shutdown.bind(this)
  }

  /**
   * Lifecycle uniq name
   * @returns {String}
   */

  get name (){
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {Object|undefined} any
   * @returns {Promise<void>}
   */

  async startup(any) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {Object|undefined} any
   * @returns {Promise<void>}
   */


  async shutdown(any) {
    throw new NotYetImplementedError()
  }
}
