import {Logger} from "@mentorioum/core-infra";
import sinon from 'sinon'

export class StubLogger extends Logger {

  #trace = null
  #info = null
  #fatal = null
  #debug = null
  #warn = null
  #error = null

  constructor(stubs = {}) {
    super();

    this.#trace = stubs.trace || sinon.stub()
    this.#info = stubs.info || sinon.stub()
    this.#fatal = stubs.fatal || sinon.stub()
    this.#debug = stubs.debug || sinon.stub()
    this.#warn = stubs.warn || sinon.stub()
    this.#error = stubs.error || sinon.stub()
  }

  get stubs () {
    return {
      trace :this.#trace,
      info :this.#info,
      fatal :this.#fatal,
      debug: this.#debug,
      warn: this.#warn,
      error: this.#error
    }
  }

  trace(payload) {
    return this.#trace(payload);
  }

  info(payload) {
    return this.#info(payload);
  }

  fatal(payload) {
    return this.#fatal(payload);
  }

  debug(payload) {
    return this.#debug(payload);
  }

  warn(payload) {
    return this.#warn(payload);
  }

  error(paylod) {
    return this.#error(paylod);
  }
}
