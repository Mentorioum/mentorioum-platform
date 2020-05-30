import ExternalTask from 'camunda-external-task-client-js';
import {Bus} from "@mentorioum/core-infra"
import assert from "assert";
import {TopicDelegateCommand} from "./TopicDelegateCommand";
import {loggerMiddleware} from "./loggerMiddleware";

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

  async subscribe(messages, command) {
    // TODO: #1 Add separation by message pattern, like router url
    // leave a wat to use topic original API + expose Variables
    // constructor so subscriber no need to import camunda package

    const delegate = new TopicDelegateCommand(command, this.#log)
    return this.#client.subscribe(messages, async topic => {
      await delegate.execute(topic)
    });
  }
}
