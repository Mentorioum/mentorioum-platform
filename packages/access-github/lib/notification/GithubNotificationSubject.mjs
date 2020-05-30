import {NotificationSubject} from './core'
import assert from "assert";

export class GithubNotificationSubject extends NotificationSubject {

  #original = null

  constructor(original) {
    assert(original, 'Should have subject original')

    super();
    this.#original = original
  }

  get title() {
    return this.#original.title;
  }

  get type() {
    return this.#original.type;
  }

  get url() {
    return this.#original.url;
  }

  toJSON() {
    return {
      url: this.url,
      title: this.title,
      type: this.type
    }
  }

}
