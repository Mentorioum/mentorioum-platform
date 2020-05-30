#!/usr/bin/env node

import yargs from 'yargs'
import {join, resolve, dirname} from 'path'
import {fileURLToPath} from 'url'
import fs from 'fs'
import {spawnSync} from 'child_process'

const args = yargs
  .scriptName('support-test-runner')
  .argv

let packageConfigPath = join(resolve(),'ava.config.cjs')

let shouldGenerateConfig = !fs.existsSync(packageConfigPath);
if (shouldGenerateConfig){
  // because can't make ava works with es6 modules through command line
  // generating config file if it's not exists yet
  const packageConfigDir = dirname(packageConfigPath)
  const getConfigTemplateDir = () => resolve(dirname(fileURLToPath(import.meta.url)), '../')
  let configTemplateDir = getConfigTemplateDir();
  const configTemplatePath = join(configTemplateDir, 'resources','config.template')

  const isTestRunnerPackage = packageConfigDir === configTemplateDir

  if (!isTestRunnerPackage) {
    console.log('Prepping test runner configs...')
    fs.copyFileSync(configTemplatePath, packageConfigPath)
    console.log(`Generated test runner config at ${packageConfigPath}`)
  }
}

let result;

if (args.watch) {
  result = spawnSync(
  'ava',
  [
    `--verbose`,
    `--watch`
  ],
  {
    stdio: 'inherit'
})

} else if (args.coverage) {
  result = spawnSync(
    'c8',
    ['ava', '--verbose'] ,
    {
      stdio: 'inherit'
    }
  )
} else {
  const options = ['--verbose']

  if (args.timeout) {
    options.push(`--timeout=${args.timeout}`)
  }

  result = spawnSync(
    'ava',
    options,
    {
      stdio: 'inherit'
  })

}

if (result){
  process.exit(result.status)
}
