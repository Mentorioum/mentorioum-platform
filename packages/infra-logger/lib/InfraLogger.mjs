import pino from 'pino'
import {Logger} from "@mentorioum/core-infra";

// TODO: #1 Experiment with sending logs to https://github.com/pinojs/pino-elasticsearch

export class InfraLogger extends Logger {

  #pino = null

  /**
   * @constructor
   * @param {Object} [context]
   * @param {Pino} [log] - pino instance usually from `pino.child`
   */

  constructor(context = {}, log) {
    super();

    if (!log){
      const defaults = {
        prettyPrint : {colorize: true},
        redact      : {
          paths : [
            'msg.*.data.password',
            'msg.*.data.confirmPassword',
            'msg.*.password',
            'msg.*.confirmPassword',
            'msg.params.token',
            'msg.result.data.jwt',
            'msg.result.jwt'
          ],
          censor : '**SENSITIVE DATA**'
        },
        level : context.level || 'info'
      };
      log = pino(defaults)
    }

    this.#pino = log
  }

  info(...args) {
    return this.#pino.info( ...args);
  }

  fatal(...args) {
    return this.#pino.fatal(...args);
  }

  trace(...args) {
    return this.#pino.trace(...args);
  }

  debug(...args) {
    return this.#pino.debug(...args);
  }

  warn(...args) {
    return this.#pino.warn(...args);
  }

  error(...args) {
    return this.#pino.error(...args);
  }

  child(...args) {
    const pino = this.#pino.child(...args);
    return new InfraLogger(null, pino)
  }
}
