import * as inquirer from 'inquirer'

import { findExistingPRTemplate } from '../prTemplate'
import { createPrTemplate } from './createPrTemplate'

export const checkPRTemplate = async () => {
  const existingPrTemplate = findExistingPRTemplate()

  if (existingPrTemplate.isLatest)
    return console.log('Your default PR template is up to date.')

  const message = existingPrTemplate.exists
    ? 'Would you like to update a Pull Request Template?'
    : 'You don`t have a Pull Request Template, Would you like to generate it?'

  await inquirer
    .prompt({
      name: 'template-pr',
      type: 'list',
      message,
      choices: ['Yes', 'No'],
      default: 'Yes',
      suffix: '\n(ctrl + c to exit)'
    })
    .then(answer => {
      if (answer['template-pr'] === 'Yes') {
        const mode = existingPrTemplate.exists ? 'update' : 'create'
        createPrTemplate(mode, existingPrTemplate.path)
      }
    })
}
