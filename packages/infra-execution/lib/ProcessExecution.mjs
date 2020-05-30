import {LifecycleExecution} from "@mentorioum/core-infra";
import assert from "assert";

export class ProcessExecution extends LifecycleExecution {
  /**
   * @type {Logger}
   */
  #logger = null
  /**
   *
   * @type {NodeJS.Process}
   */
  #process = null

  /**
   * @constructor
   * @param {Lifecycle} lifecycle  - lifecycle instance
   * @param {NodeJS.Process} process  - process instance
   * @param {Logger} logger - logger instance
   */

  constructor(lifecycle, process, logger) {
    super(lifecycle)

    assert(logger, 'Should have a logger instance')

    this.#logger = logger
    this.#process = process
  }

  attachAndStart() {
    this.#process.on('SIGTERM', this.#gracefulShutdown);
    this.#process.on('SIGINT', this.#gracefulShutdown);

    // TODO: #1 Add Proper exit for pino 'http://getpino.io/#/docs/help?id=exit-logging'
    this.#process.on('unhandledRejection', error => {
      this.#logger.fatal({
        type  : 'UnhandledRejection',
        error : error.stack
      });
    });

    this.#process.on('uncaughtException', error => {
      this.#logger.fatal({
        type  : 'UncaughtException',
        error : error.stack
      });
    });

    this.#logger.info(`Lifecycle [${this.lifecycle.name}] starting...`)
    this.lifecycle.startup();
  }

  #gracefulShutdown = async () => {
    this.#logger.info(`SIGTERM signal catched`);

    const name = this.lifecycle.name
    this.#logger.info(`Lifecycle [${name}] shutting  down...`)
    try {
      await this.lifecycle.shutdown();
    } catch (error) {
      this.#logger.fatal(error)
    } finally {
      this.#process.exit(0)
    }
  }
}
