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
    this.#subscriptions = await Promise.all(_.map(this.events, (value, key) => {
      return this.#bus.subscribe(key, value)
    }))

    return this;
  }

  async shutdown(any) {
    if (_.isEmpty(this.#subscriptions)){
      return this;
    }

    for (let subscription of this.#subscriptions) {
      subscription.detach()
    }

    return this;
  }
}
