import * as inquirer from 'inquirer'

import { findExistingLabels } from './findExistingLabels'
import { addLabels } from './addLabels'

export const checkLabels = () => {
  const existingLabels = findExistingLabels()
  const areLabelsInProject = !!existingLabels.length

  const CHOICES = {
    CANCEL: 'Leave it as it is',
    EDIT: 'Restore Labels actions to default'
  }

  const EXIST_MESSAGE =
    'Labels has been found in this project, What would You like to do?'

  const NOT_EXIST_MESSAGE =
    'You don`t have any labels actions configured, Would You like to add label actions now?'

  if (areLabelsInProject) {
    return inquirer
      .prompt({
        name: 'labels-exist',
        type: 'list',
        message: EXIST_MESSAGE,
        choices: [...Object.values(CHOICES)],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(async answer => {
        if (answer['labels-exist'] === CHOICES.EDIT) {
          return await addLabels('edit')
        } else {
          return
        }
      })
  } else {
    return inquirer
      .prompt({
        name: 'labels-default',
        type: 'list',
        message: NOT_EXIST_MESSAGE,
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(async answer => {
        if (answer['labels-default'] === 'Yes') {
          return await addLabels('add')
        }
      })
  }
}
