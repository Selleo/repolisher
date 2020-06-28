import * as fs from 'fs'
import * as inquirer from 'inquirer'
import * as path from 'path'

import { findExistingDefaultIssueTemplate } from '../issueTemplate'
import { compareTemplates } from '../common'
import { newDefaultIssueTemplatePath } from '../../files/locateDefaultFile'

export const checkDefaultIssueTemplate = () => {
  let equal = true
  let defaultIssueTemplateExists = false

  if (!fs.existsSync(newDefaultIssueTemplatePath)) {
    return console.log('Default Issue Template file is missing')
  }
  const newTemplate = fs.readFileSync(newDefaultIssueTemplatePath, 'utf-8')
  const issueTemplates = findExistingDefaultIssueTemplate()

  issueTemplates.forEach(file => {
    defaultIssueTemplateExists = true

    console.log('You already have default issue template in Your repository')
    equal = compareTemplates(file, newTemplate, equal)

    if (equal) return console.log('No changes between actual and new template')

    return inquirer
      .prompt({
        name: 'template-issue-default',
        type: 'list',
        message: 'Would You like to update a Default Issue Template?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(answer => {
        if (answer['template-issue-default'] === 'Yes') {
          fs.writeFile(file, newTemplate, 'utf-8', err => {
            return err
              ? console.log(`Error: ${err}`)
              : console.log('Default Issue Template updated successfully')
          })
        }
      })
  })

  if (!defaultIssueTemplateExists) {
    return inquirer
      .prompt({
        name: 'template-issue-default',
        type: 'list',
        message:
          'You don`t have a Default Issue Template, Would You like to generate it?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(answer => {
        if (answer['template-issue-default'] === 'Yes') {
          fs.mkdir(path.join('.github', 'ISSUE_TEMPLATE'), { recursive: true }, err => {
            if (err) return console.log(`Error: ${err}`)
          })
          fs.writeFile(
            path.join('.github', 'ISSUE_TEMPLATE', 'issue_template.md'),
            newTemplate,
            'utf-8',
            err => {
              return err
                ? console.log(`Error: ${err}`)
                : console.log('Default Issue Template generated successfully')
            }
          )
        }
      })
  }
}
