import {Manager} from "@mentorioum/core-infra";
import assert from "assert";

export class InfraBusManager extends Manager  {

  /**
   * @type {Bus}
   */

  #bus = null

  /**
   * @type {Manager}
   */
  #original = null

  /**
   * @constructor
   * @param {Manager} original
   * @param {Bus} bus
   */

  constructor(original, bus) {
    super();

    assert(original, 'Should have an original manager')
    assert(bus, 'Should have a bus')

    this.#bus = bus
    this.#original = original
  }

  get events() {
    return this.#original.events;
  }

  get name() {
    return super.name;
  }

  async startup(any) {
    super.startup(any);
  }

  async shutdown(any) {
    super.shutdown(any);
  }
}
