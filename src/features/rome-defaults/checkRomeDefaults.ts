import * as inquirer from 'inquirer'
import * as glob from 'glob'
import * as path from 'path'
import * as fs from 'fs'
import { exec } from 'child_process'

export const checkRomeDefaults = () => {
  let pJsonExists = checkPJsonFile()
  let romeFileExists = checkRomeFiles()

  if (pJsonExists && !romeFileExists) {
    return inquirer
      .prompt({
        name: 'rome-defaults',
        type: 'list',
        message: 'You don`t have a rome init files, Would You like to generate it?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then((answer: { 'rome-defaults': 'Yes' | 'No' }) => {
        if (answer['rome-defaults'] === 'Yes') {
          exec('npx rome init', (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`)
              return
            }
            console.log('Files generated successfully')
          })
        }
      })
  }
}

const checkPJsonFile = () => !!glob.sync(path.join('package.json')).length

const checkRomeFiles = () => {
  if (glob.sync(path.join('.config', 'rome.@(json|rjson)')).length) return true
  const pJsonContent = fs.readFileSync('package.json', 'utf8')
  if (pJsonContent.includes('rome')) return true
  return false
}
