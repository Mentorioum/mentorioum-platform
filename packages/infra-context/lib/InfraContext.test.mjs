import test from '@mentorioum/support-test'
import {InfraContext} from "./InfraContext";
import {InfraLogger} from "@mentorioum/infra-logger";

test('has logger', t => {
  const context = new InfraContext()
  let logger = context.logger;

  t.assert(logger instanceof InfraLogger)
})

test('has immutable logger', t=> {
  const context = new InfraContext()

  t.throws(() => {
    context.logger = 'fdfff'
  }, {instanceOf: TypeError})
})

test('has bus', t => {
  const context = new InfraContext()

  t.truthy(context.bus)
})

