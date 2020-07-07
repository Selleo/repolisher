import * as fs from 'fs'
import * as inquirer from 'inquirer'
import * as path from 'path'

import { findExistingPRTemplate } from '../prTemplate'
import { compareTemplates } from '../common'
import { newPullRequestTemplatePath } from '../../files/locateDefaultFile'

export const checkPRTemplate = () => {
  let equal = true
  let prTemplateExists = false

  if (!fs.existsSync(newPullRequestTemplatePath)) {
    return console.log('PR Template file is missing')
  }
  const newTemplate = fs.readFileSync(newPullRequestTemplatePath, 'utf-8')
  const prTemplates = findExistingPRTemplate()

  prTemplates.forEach(file => {
    prTemplateExists = true

    console.log('You already have PR template in Your repository')
    equal = compareTemplates(file, newTemplate, equal)

    if (equal) return console.log('No changes between actual and new template')

    return inquirer
      .prompt({
        name: 'template-pr',
        type: 'list',
        message: 'Would You like to update a pull request template?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(answer => {
        if (answer['template-pr'] === 'Yes') {
          fs.writeFile(file, newTemplate, 'utf-8', err => {
            return err
              ? console.log(`Error: ${err}`)
              : console.log('PR template updated successfully')
          })
        }
      })
  })

  if (!prTemplateExists) {
    return inquirer
      .prompt({
        name: 'template-pr',
        type: 'list',
        message: 'You don`t have a Pull Request Template, Would You like to generate it?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(answer => {
        if (answer['template-pr'] === 'Yes') {
          fs.mkdirSync('.github', { recursive: true })
          fs.writeFile(
            path.join('.github', 'PULL_REQUEST_TEMPLATE.md'),
            newTemplate,
            'utf-8',
            err => {
              return err
                ? console.log(`Error: ${err}`)
                : console.log('PR template generated successfully')
            }
          )
        }
      })
  }
}
