import path from 'path'
import {getModuleDir} from '@mentorioum/utils-fs'
import confme from 'confme'
import cloneDeep from 'lodash.clonedeep'

export class InfraConfig {

  #config = null

  constructor() {
    const root = path.resolve(
      getModuleDir(import.meta.url),
      '../'
    )

    this.#config = confme(
      path.join(root, 'infra.config.json'),
      path.join(root, 'infra.config.schema.json')
    )
  }

  /**
   * @typedef InfraWorkflowConfig
   * @protected {String} baseUrl - base workflow server rest api
   * @protected {Number} asyncResponseTimeout
   *
   * @returns {InfraWorkflowConfig}
   */

  get workflow () {
    return cloneDeep(this.#config.workflow)
  }

  get githubSync () {
    return cloneDeep(this.#config.githubSync)
  }
}
