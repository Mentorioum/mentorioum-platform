import assert from "assert";
import {NotificationRepository} from "./core/NotificationRepository";

export class GithubNotificationRepository extends NotificationRepository {

  #original = null

  constructor(original) {
    assert(original, 'Should have github original data')

    super();

    this.#original = original
  }

  get id() {
    return this.#original.id;
  }

  get name() {
    return this.#original.name;
  }

  get fullName() {
    return this.#original.full_name;
  }

  toJSON() {
    return {
      id: this.id,
      reason: this.name,
      subject: this.fullName
    }
  }

}
