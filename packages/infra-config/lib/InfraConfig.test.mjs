import test from '@mentorioum/support-test'
import {InfraConfig} from "./InfraConfig";

test('creates config', t => {
  const config = new InfraConfig()

  t.truthy(config)
})

test('workflow defaults', t => {
  const config = new InfraConfig()

  t.is(config.workflow.baseUrl, 'http://localhost:8055/engine-rest')
  t.is(config.workflow.asyncResponseTimeout, 4000)
})

test('github-sync defaults', t => {
  const config = new InfraConfig()

  t.is(config.githubSync.token, 'add-your-token-here')
  t.is(config.githubSync.notification.wakeUpInterval, 60000)
})
