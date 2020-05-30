/**
 *
 * @param log (Logger) - logger instance
 * @returns {function(...[*]=)}
 */

export const loggerMiddleware = (log) => (client) => {
  client.on("subscribe", topic => {
    log.info('subscribed to topic #name: %s', topic);
  });

  client.on("unsubscribe", topic => {
    log.info('unsubscribed from topic #name: %s', topic);
  });

  client.on("poll:start", () => {
    log.debug("polling");
  });

  client.on("poll:stop", () => {
    log.debug("polling stopped");
  });

  client.on("poll:success", tasks => {
    log.debug('polled # %d tasks', tasks.length);
  });

  client.on("poll:error", error => {
    log.error(`polling failed `, error);
  });

  client.on("complete:success", (task) => {
    log.info(`completed task`, task);
  });

  client.on("complete:error", (task, error) => {
    log.error(`couldn't complete task #id: ${task.id}, ${error}`);
  });

  client.on("handleFailure:success", (task) => {
    log.info(`handled failure of task`, task);
  });

  client.on("handleFailure:error", (task, error) => {
    log.error(`couldn't handle failure of task #id: ${task.id}, ${error}`);
  });

  client.on("handleBpmnError:success", (task) => {
    log.info(`handled BPMN error of task`, task);
  });

  client.on("handleBpmnError:error", (task, error) => {
    log.error(`couldn't handle BPMN error of task #id: ${task.id}`, error);
  });

  client.on("extendLock:success", (task) => {
    log.info(`handled extend lock of task`, task);
  });

  client.on("extendLock:error", (task, error) => {
    log.error(`couldn't handle extend lock of task #id: ${task.id}`, error);
  });

  client.on("unlock:success", (task) => {
    log.info(`unlocked task`, task);
  });

  client.on("unlock:error", (task, error) => {
    log.error(`couldn't unlock task #id: ${task.id}`, error);
  });
}
