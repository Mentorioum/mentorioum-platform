import {NotificationAccess} from "../core/NotificationAccess";
import Octokit from '@octokit/rest'
import {GithubNotification} from './GithubNotification';

export class GithubNotificationAccess extends NotificationAccess {

  #octokit = null

  constructor(config) {
    super();

    this.#octokit = new Octokit.Octokit({
      auth: config.token
    });
  }

  async findMany(options) {
    let response = await this.#octokit.activity.listNotificationsForAuthenticatedUser({
      /**
       * @todo #1:15m/DEV Remove hardcode
       */
      per_page: 5,
      since: '2019-12-27T00:00:00Z',
    })

    return response.data.map(
      item => new GithubNotification(item)
    )
  }

  async markAsRead(id) {
    await this.#octokit.activity.markThreadAsRead({
      thread_id: id
    });
  }
}
