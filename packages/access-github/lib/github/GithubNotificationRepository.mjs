import assert from "assert";
import {NotificationRepository} from "../..";

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
      name: this.name,
      fullName: this.fullName
    }
  }

}
