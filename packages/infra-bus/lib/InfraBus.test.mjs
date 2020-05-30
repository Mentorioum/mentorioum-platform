import test from '@mentorioum/support-test'
import {InfraBus} from "./InfraBus";
import {StubLogger} from "@mentorioum/core-infra-stub";

test.cb('should subscribe to simple task', t => {
  t.plan(5)

  const logger = new StubLogger()
  const bus = new InfraBus({
    // TODO: #1 Replace infra config
    baseUrl: 'http://localhost:8055/engine-rest',
    asyncResponseTimeout: 1000
  },logger)

  t.truthy(bus)

  bus.subscribe(
    'service://infra-messages/check-status',
    async (args) => {
      const {task, taskService} = args

      t.assert(task)
      t.assert(taskService)

      t.is(task.workerId,'some-random-id')
      t.is(task.processDefinitionKey,'process-simple-test')

      t.end()
  })
})
