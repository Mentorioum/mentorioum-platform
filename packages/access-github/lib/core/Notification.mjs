import {NotYetImplementedError} from "@mentorioum/core-error";

/**
 * @interface
 */

export class Notification {

  /**
   * @return {String}
   */
  get id() {
    throw new NotYetImplementedError()
  }

  /**
   * @return {String}
   */

  get reason() {
    throw new NotYetImplementedError()
  }

  /**
   * @return {NotificationSubject}
   */

  get subject() {
    throw new NotYetImplementedError()
  }

  /**
   * @return {NotificationRepository}
   */

  get repository() {
    throw new NotYetImplementedError()
  }

}
