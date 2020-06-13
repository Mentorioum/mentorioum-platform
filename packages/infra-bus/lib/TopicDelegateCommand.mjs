import {Command} from "@mentorioum/core-infra";
import ExternalTasks from 'camunda-external-task-client-js';
import _ from 'lodash'
import assert from "assert";

const {Variables} = ExternalTasks

/**
 * Delegate topic execution to original command and
 * keep communication with topic's api here
 */
export class TopicDelegateCommand extends Command {
  /**
   * @type {Command}
   */
  #original = null

  /**
   * @type {Logger}
   */
  #log = null

  /**
   * @constructor
   * @param {Command} original - command to delegate execution
   * @params {Logger} logger
   */
  constructor(original, logger) {
    super();

    assert(original, 'Should have original command to delegate execution')
    assert(logger, 'Should have logger')

    this.#original = original
    this.#log = logger.child({module: this.constructor.name})
  }

  async execute(topic) {
    try {
      const {task, taskService} = topic;

      let options

      if (task.variables){
        options = this.#toOptions(task.variables)
      }

      const logOutput = this.#prepTaskLogOutput(topic, options)
      let result

      try{
        result = await this.#original.execute(options)
      } catch (error) {
        this.#log.error(error, `original command execution failed, task #id: ${logOutput.id}, #topic: ${logOutput.topic.name}`)
      }

      let newVariables

      if (result) {
        newVariables = this.#toVariables(result)
      }

      try {
        if (newVariables) {
          await taskService.complete(task, newVariables)
        } else {
          await taskService.complete(task)
        }
      } catch (error) {
        this.#log.error({
          task: logOutput,
          error
        }, 'failed to commit execution results')
      }

      this.#log.info({
        task: logOutput,
        variables: {
          input: options,
          output: {
            process: result,
            local: {}
          }
        }
      }, 'task was completed')


    } catch (error) {
      this.#log.fatal(error)
    }
  }

  #prepTaskLogOutput = (context) => {
    const {task} = context

    const output = {
      id: task.id,
      topic: {
        name: task.topicName
      },
      businessKey: task.businessKey,
      suspended: task.suspended,
      priority: task.priority,
      execution: {
        id: task.executionId
      },
      activity: {
        id: task.activityId,
        instance: {
          id: task.activityInstanceId
        }
      },
      lock: {
        expirationTime: task.lockExpirationTime
      },
      process: {
        instance: {
          id: task.processInstanceId
        },
        definition: {
          id: task.processDefinitionId,
          key: task.processDefinitionKey,
          versionTag: task.processDefinitionVersionTag
        }
      }
    }

    if (task.errorMessage || task.errorDetails) {
      const error = {
        message: task.errorMessage,
        details: task.errorDetails
      }

      output.error = error
    }

    if (task.tenantId){
      output.tenant = {
        id: task.tenantId
      }
    }

    return output
  }

  #toOptions = (variables) => {
     const vars = variables.getAll()

     return _.reduce(vars, (memo, value, key)=> {
       if (_.isString(value)){
         this.#log.warn({value})
         try {
           value = JSON.parse(value)
         }catch (e) {
           this.#log.debug(
             {value},
             `can't parse value, probably it's just a string`
           )
         }
       }

       memo[key] = value

       return memo
     }, {})
  }

  #toVariables = (output) => {
    return _.reduce(output, (memo, value, key) => {
      memo.set(key, value)
      return memo
    }, new Variables())
  }

}
