import {Manager} from "@mentorioum/core-infra";
import assert from "assert";
import {GithubNotificationAccess} from '@mentorioum/access-github'
import {NotificationFetchNewCommand} from "./notification/NotificationFetchNewCommand";
import {NotificationPickOneCommand} from "./notification/NotificationPickOneCommand";
import {GithubSayHelloCommand} from "./notification/GithubSayHelloCommand";
import {NotificationMarkAsReadCommand} from "./notification/NotificationMarkAsReadCommand";
import {NotificationAnalyzeInstructionCommand} from "./notification/NotificationAnalizeInstructionCommand";

export class GithubSyncManager extends Manager {

  #log = null
  #notifications = null

  /**
   * @constructor
   * @param {Object} config
   * @param {Logger} log
   */

  constructor(config, log) {
    super();

    assert(config, 'Should have config defined')
    assert(log, 'Should have log defined')

    this.#notifications = new GithubNotificationAccess({
      token: config.token
    })
    this.#log = log
  }

  get name() {
    return 'github-sync';
  }

  get events() {
    const log = this.#log;
    const notifications = this.#notifications;
    const sayHello = new GithubSayHelloCommand(log)

    return {
      'services://github-sync/generate-list' : new NotificationFetchNewCommand(notifications),
      'services://utils/logger': sayHello,
      'services://github-sync/pick-one': new NotificationPickOneCommand(log),
      'services://github-sync/greeting': sayHello,
      'services://github-sync/mark-as-read': new NotificationMarkAsReadCommand(notifications, log),
      'services://github-sync/analyze-instructions': new NotificationAnalyzeInstructionCommand(log)
    }
  }
}
