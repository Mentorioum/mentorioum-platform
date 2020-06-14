import {GithubSyncManager} from "./lib";
import {InfraExecution} from "@mentorioum/infra-execution";

const execution = new InfraExecution(
  (context, config) => new GithubSyncManager(
    config.githubSync,
    context.logger
  )
)

execution.attachAndStart()
