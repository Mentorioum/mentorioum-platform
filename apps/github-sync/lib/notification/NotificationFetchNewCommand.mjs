import {Command} from "@mentorioum/core-infra";

export class NotificationFetchNewCommand extends Command {

  /**
   * @type {NotificationAccess}
   */

  #notifications = null

  /**
   * @constructor
   * @param {NotificationAccess} notification
   */

  constructor(notification) {
    super()
    this.#notifications = notification
  }

  async execute(options){
    let notifications = await this.#notifications.findMany({
      // TODO: #1 Extract to upper level, think about putting in process on start,
      // it good thing to pass as options
      limit: 5,
      since: '2019-12-27T00:00:00Z',
    });

    return {
      notifications,
      since: new Date().toISOString()
    };
  }

}
