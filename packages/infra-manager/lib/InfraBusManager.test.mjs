import test from '@mentorioum/support-test'
import {InfraBusManager} from "./InfraBusManager";
import {AssertionError} from "assert";
import {StubBus, StubCommand, StubManager, StubSubscription, StubLogger} from "@mentorioum/core-infra-stub";

test.beforeEach(t => {
  const log = new StubLogger()
  const bus = new StubBus()
  const original = new StubManager()
  const firstCommand = new StubCommand()
  const secondCommand = new StubCommand()
  const firstEvent = 'someMessage1'
  const secondEvent = 'someMessage2'

  original.stubs.events.returns({
    [firstEvent]: firstCommand,
    [secondEvent]: secondCommand
  });

  t.context = {
    ...t.context,
    bus,
    original,
    firstEvent,
    firstCommand,
    secondCommand,
    secondEvent,
    log
  }
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
    new StubBus(),

    /**
     * @todo #15:35m/DEV - find a solution for logger by default
     *
     *
     */
    new StubLogger()
  )

  t.truthy(manager)
})

test('subscribes to events on startup', async t => {
  const {bus, original, firstEvent, secondEvent, firstCommand, secondCommand, log} = t.context;

  const manager = new InfraBusManager(
    original,
    bus,
    log
  )

  await manager.startup()

  t.is(bus.stubs.subscribe.callCount, 2)
  t.is(bus.stubs.subscribe.getCall(0).args[0], firstEvent)
  t.is(bus.stubs.subscribe.getCall(0).args[1], firstCommand)
  t.is(bus.stubs.subscribe.getCall(1).args[0], secondEvent)
  t.is(bus.stubs.subscribe.getCall(1).args[1], secondCommand)
})

test('unsubscribes events on shutdown', async t => {
  const {bus, original, firstEvent, secondEvent, firstCommand, secondCommand, log} = t.context;
  const firstSubscription = new StubSubscription()
  const secondSubscription = new StubSubscription()

  bus.stubs.subscribe.withArgs(firstEvent, firstCommand).returns(firstSubscription)
  bus.stubs.subscribe.withArgs(secondEvent, secondCommand).returns(secondSubscription)

  const manager = new InfraBusManager(
    original,
    bus,
    log
  )

  await manager.startup()
  await manager.shutdown()

  t.is(firstSubscription.stubs.detach.callCount, 1)
  t.is(secondSubscription.stubs.detach.callCount, 1)
})

