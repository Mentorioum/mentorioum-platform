#!/usr/bin/env node

import yargs from 'yargs'
import {dirname, join, resolve} from "path";
import fs from "fs";
import {fileURLToPath} from "url";

const args = yargs
  .scriptName('support-packages')
  .argv

if(args.name && args.parent){

  let newPackageDir = join(args.parent, args.name)

  fs.mkdirSync(newPackageDir)
  console.log(`Created new package dir ${newPackageDir}`)

  let libDir = join(newPackageDir, 'lib');

  fs.mkdirSync(libDir)

  fs.writeFileSync(
    join(libDir, 'index.mjs'),
    `export default {}`
  )

  fs.writeFileSync(
    join(newPackageDir, 'index.mjs'),
    `export * from './lib'`
  )

  const getConfigTemplateDir = () => resolve(dirname(fileURLToPath(import.meta.url)), '../')
  const configTemplateDir = getConfigTemplateDir()
  const configTemplatePath = join(configTemplateDir,'resources','package.json.template')

  let packageFile = join(newPackageDir, 'package.json');
  fs.copyFileSync(configTemplatePath, packageFile)

  let content = JSON.parse(fs.readFileSync(packageFile).toString())

  content.name = content.name.replace('{__NAME__}', args.name);

  fs.writeFileSync(packageFile, JSON.stringify(content, null, 2))

  console.log(`Created package descriptor ${packageFile}`)


}
