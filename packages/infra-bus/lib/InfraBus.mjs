import ExternalTask from 'camunda-external-task-client-js';
import {Bus} from "@mentorioum/core-infra"
import assert from "assert";
import {TopicDelegateCommand} from "./TopicDelegateCommand";
import {loggerMiddleware} from "./loggerMiddleware";
import {TopicSubscription} from "./TopicSubscription";

const { Client } = ExternalTask;

export class InfraBus extends Bus {

  #client = null
  #log = null

  /**
   * @typedef InfraBusConfig
   * @property baseUrl {String} - base url to camunda rest api
   * @protected asyncResponseTimeout {Number} - async resp timeout interval
   *
   * @constructor
   * @param {InfraBusConfig} config - bus config
   * @param {Logger} logger - logger instance
   */

  constructor(config, logger ) {
    super();

    assert(config)

    const {baseUrl, asyncResponseTimeout} = config

    assert(baseUrl)
    assert(asyncResponseTimeout)

    this.#log = logger.child({module: 'infra-bus'})

    let customLogger = loggerMiddleware(this.#log);

    this.#client = new Client({
      baseUrl: baseUrl,
      use: [customLogger],
      asyncResponseTimeout
    });
  }

  async subscribe(event, command) {
    /**
     * @todo #1:45m/DEV Add separation by message pattern, like router url
     *  leave a wat to use topic original API + expose Variables
     */

    this.#log.info('Start Subscription')

    const delegate = new TopicDelegateCommand(command, this.#log)
    let subscription = this.#client.subscribe(event, async topic => {
      await delegate.execute(topic)
    });

    return new TopicSubscription(event, subscription);
  }
}
