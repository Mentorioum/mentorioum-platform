import sinon from 'sinon'

export class SinonLoggerStubs {

  #trace = null
  #info = null
  #fatal = null
  #debug = null
  #warn = null
  #error = null

  constructor() {
    this.#trace = sinon.stub()
    this.#info = sinon.stub()
    this.#fatal = sinon.stub()
    this.#debug =  sinon.stub()
    this.#warn = sinon.stub()
    this.#error =  sinon.stub()
  }

  get trace() {
    return this.#trace;
  }

  get info() {
    return this.#info;
  }

  get fatal() {
    return this.#fatal;
  }

  get debug() {
    return this.#debug;
  }

  get warn() {
    return this.#warn;
  }

  get error() {
    return this.#error;
  }
}
