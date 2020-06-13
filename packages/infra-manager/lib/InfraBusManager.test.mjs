import test from '@mentorioum/support-test'
import {InfraBusManager} from "./InfraBusManager";
import {AssertionError} from "assert";
import {StubBus, StubCommand, StubManager} from "@mentorioum/core-infra-stub";


test.beforeEach(t => {
  t.context.bus = new StubBus()
  t.context.original = new StubManager()
  t.context.firstCommand = new StubCommand()
  t.context.secondCommand = new StubCommand()
  t.context.firstEvent = 'someMessage1'
  t.context.secondEvent = 'someMessage2'
})

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

test('subscribes events to bus', async t => {
  const {bus, original, firstEvent, secondEvent, firstCommand, secondCommand} = t.context;

  original.stubs.events.returns({
    [firstEvent]: firstCommand,
    [secondEvent]: secondCommand
  });

  const manager = new InfraBusManager(
    original,
    bus
  )

  await manager.startup()

  t.is(bus.stubs.subscribe.callCount, 2)
  t.is(bus.stubs.subscribe.getCall(0).args[0], firstEvent)
  t.is(bus.stubs.subscribe.getCall(0).args[1], firstCommand)
  t.is(bus.stubs.subscribe.getCall(1).args[0], secondEvent)
  t.is(bus.stubs.subscribe.getCall(1).args[1], secondCommand)
})

