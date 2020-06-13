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
   * @type {Log}
   */
  #log = null

  /**
   * @constructor
   * @param {Manager} original
   * @param {Bus} bus
   * @param {Log} log
   */

  constructor(original, bus, log) {
    super();

    assert(original, 'Should have an original manager')
    assert(bus, 'Should have a bus')
    assert(log, 'Should have a logger')

    this.#bus = bus
    this.#original = original
    this.#log = log.child({module: this.constructor.name})
  }

  get events() {
    return this.#original.events;
  }

  get name() {
    return this.#original.name;
  }

  async startup(...args) {
    let log = this.#log;
    log.info('Starting subscriptions')

    this.#subscriptions = await Promise.all(_.map(this.events, (value, key) => {
      return this.#bus.subscribe(key, value)
    }))

    log.info('Started')
    return this;
  }

  async shutdown(any) {
    let log = this.#log;
    log.info('Shutting down')


    if (_.isEmpty(this.#subscriptions)){
      return this;
    }

    for (let subscription of this.#subscriptions) {
      subscription.detach()
    }


    log.info('Shutdown successfully')
    return this;
  }
}
