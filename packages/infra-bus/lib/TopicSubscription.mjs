import {Subscription} from "@mentorioum/core-infra";
import assert from "assert";

export class TopicSubscription extends Subscription{

  #topic = null
  #name = null

  constructor(name,topic) {
    super()

    assert(name, 'should have name')
    assert(topic, 'should have a original topic')

    this.#topic = topic
    this.#name = topic
  }

  get name() {
    return super.name;
  }

  async detach() {
    this.#topic.unsubscribe()
    return this;
  }
}
