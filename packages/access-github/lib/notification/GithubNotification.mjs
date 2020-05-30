import {Notification} from './core/Notification'
import assert from "assert";
import {GithubNotificationSubject} from "./GithubNotificationSubject";
import {GithubNotificationRepository} from "./GithubNotificationRepository";

export class GithubNotification extends Notification {

  #original = null

  constructor(original) {
    assert(original, 'Should have github original data')
    assert(original.subject, 'Should have github subject')
    assert(original.repository, 'Should have github repository')

    super();

    this.#original = original
  }

  get id() {
    return this.#original.id
  }

  get reason() {
    return this.#original.reason
  }

  get subject() {
    return new GithubNotificationSubject(this.#original.subject)
  }

  get repository() {
    return new GithubNotificationRepository(this.#original.repository)
  }

  toJSON() {
    return {
      id: this.id,
      reason: this.reason,
      subject: this.subject.toJSON(),
      repository: this.repository.toJSON()
    }
  }

}
