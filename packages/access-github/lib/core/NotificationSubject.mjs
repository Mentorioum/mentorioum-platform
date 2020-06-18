import {NotYetImplementedError} from "@mentorioum/core-error";

/**
 * @interface
 */

export class NotificationSubject {

  get title() {
    throw new NotYetImplementedError()
  }

  get type() {
    throw new NotYetImplementedError()
  }

  get url() {
    throw new NotYetImplementedError()
  }

}
