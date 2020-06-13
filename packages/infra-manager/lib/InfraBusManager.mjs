import {Manager} from "@mentorioum/core-infra";
import assert from "assert";
import _ from 'lodash'

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
   * @type {Object[]}
   */
  #subscriptions = []

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
    return this.#original.name;
  }

  async startup(...args) {

    // TODO: #15 - iterate over events

    this.#subscriptions = _.map(this.events, (value, key) => {
      return this.#bus.subscribe(key, value)
    })

    return this;
  }

  async shutdown(any) {

    // TODO: #15 - provide unsubscription
    return this;
  }
}
