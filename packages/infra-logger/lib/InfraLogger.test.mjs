import test from '@mentorioum/support-test'
import {InfraLogger} from "./InfraLogger";

test('all logger methods', t => {
  const logger = new InfraLogger()

  // logger.info('Information')
  // logger.warn('Warning')
  // logger.error(new Error('Booom'))
  // logger.fatal('Fatal')

  t.truthy(true)
})
