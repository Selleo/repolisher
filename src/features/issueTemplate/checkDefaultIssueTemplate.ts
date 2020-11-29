import * as inquirer from 'inquirer'

import { findExistingDefaultIssueTemplate } from '../issueTemplate'
import { createIssueTemplate } from './createIssueTemplate'

export const checkDefaultIssueTemplate = async () => {
  const existingIssueTemplate = findExistingDefaultIssueTemplate()

  if (existingIssueTemplate.isLatest)
    return console.log('Your Default Issue template is up to date.')

  const message = existingIssueTemplate.exists
    ? 'Would you like to update a Default Issue Template?'
    : 'You don`t have a Default Issue Template, Would you like to generate it?'

  await inquirer
    .prompt({
      choices: ['Yes', 'No'],
      default: 'Yes',
      message,
      name: 'template-issue-default',
      suffix: '\n(ctrl + c to exit)',
      type: 'list'
    })
    .then(answer => {
      if (answer['template-issue-default'] === 'Yes') {
        const mode = existingIssueTemplate.exists ? 'update' : 'create'
        createIssueTemplate(mode, existingIssueTemplate.path)
      }
    })
}
