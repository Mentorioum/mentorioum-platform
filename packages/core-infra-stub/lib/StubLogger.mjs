import {Logger} from "@mentorioum/core-infra";
import {SinonLoggerStubs} from "./SinonLoggerStubs";

export class StubLogger extends Logger {

  #stubs = null
  constructor() {
    super();

    this.#stubs = new SinonLoggerStubs()
  }

  get stubs () {
    return this.#stubs
  }

  trace(...args) {
    return this.#stubs.trace.apply(this, args);
  }

  info(...args) {
    return this.#stubs.info.apply(this, args);
  }

  fatal(...args) {
    return this.#stubs.fatal.apply(this, args);
  }

  debug(...args) {
    return this.#stubs.debug.apply(this, args);
  }

  warn(...args) {
    return this.#stubs.warn.apply(this, args);
  }

  error(...args) {
    return this.#stubs.error.apply(this, args);
  }

  child(...args) {
    this.#stubs.child.apply(this, args);
    return new StubLogger();
  }
}
