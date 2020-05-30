import {GithubSyncLifecycle} from "./lib";
import {InfraExecution} from "@mentorioum/infra-execution";

const execution = new InfraExecution(
  (context, config) => new GithubSyncLifecycle(
    config.githubSync,
    context.logger,
    context.bus
  )
)

execution.attachAndStart()
