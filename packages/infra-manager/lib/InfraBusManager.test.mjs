import test from '@mentorioum/support-test'
import {InfraBusManager} from "./InfraBusManager";
import {AssertionError} from "assert";
import {StubBus, StubManager} from "@mentorioum/core-infra-stub";

test('created bus manager delegate', async t => {

  t.throws(() => {
    new InfraBusManager()
  }, {instanceOf: AssertionError})

  t.throws(() => {
    new InfraBusManager(
      new StubManager(),
    )
  }, {instanceOf: AssertionError})

  const manager = new InfraBusManager(
    new StubManager(),
    new StubBus()
  )

  t.truthy(manager)
})

