import {Lifecycle} from "@mentorioum/core-infra";
import assert from "assert";
import {GithubNotificationAccess} from '@mentorioum/access-github'
import {NotificationFetchNewCommand} from "./notification/NotificationFetchNewCommand";
import {NotificationPickOneCommand} from "./notification/NotificationPickOneCommand";
import {GithubSayHelloCommand} from "./notification/GithubSayHelloCommand";
import {NotificationMarkAsReadCommand} from "./notification/NotificationMarkAsReadCommand";
import {NotificationAnalyzeInstructionCommand} from "./notification/NotificationAnalizeInstructionCommand";

export class GithubSyncLifecycle extends Lifecycle {

  #log = null
  #bus = null
  #generateSubscription = null
  #printSubscription = null
  #notifications = null

  /**
   * @constructor
   * @param {Object} config
   * @param {Logger} log
   * @param {Bus} bus
   */

  constructor(config, log, bus) {

    assert(config, 'Should have config defined')
    assert(log, 'Should have log defined')
    assert(bus, 'Should have bus defined')

    super();

    this.#notifications = new GithubNotificationAccess({
      token: config.token
    })

    this.#log = log
    this.#bus = bus
  }

  get name() {
    return 'github-sync';
  }

  async startup() {
    const notificationFetchNew = new NotificationFetchNewCommand(this.#notifications)
    const pickOneNotification = new NotificationPickOneCommand(this.#log)
    const sayHello = new GithubSayHelloCommand(this.#log)
    const markAsRead = new NotificationMarkAsReadCommand(this.#log)
    const analyzeInstructions = new NotificationAnalyzeInstructionCommand(this.#log)

    this.#generateSubscription= this.#bus.subscribe(
      'services://github-sync/generate-list',
      notificationFetchNew
    )

    this.#bus.subscribe(
      'services://utils/logger',
      sayHello
    )

    this.#printSubscription = this.#bus.subscribe(
      'services://github-sync/pick-one',
      pickOneNotification
    )

    this.#bus.subscribe(
      'services://github-sync/greeting',
      sayHello
    )

    this.#bus.subscribe(
      'services://github-sync/mark-as-read',
      markAsRead
    )

    this.#bus.subscribe(
      'services://github-sync/analyze-instructions',
      analyzeInstructions
    )

  }
  async shutdown() {
    // TODO: extrat to base class as generic method
    this.#generateSubscription.unsubscribe()
    this.#printSubscription.unsubscribe()
  }
}
