import * as inquirer from 'inquirer'

import { findExistingLabels } from './findExistingLabels'
import { addLabel } from './addLabel'

export const checkLabels = () => {
  const labels = findExistingLabels()
  const areLabelsInProject = !!labels.length
  const CHOICES = {
    ADD: 'Add Label action',
    CANCEL: 'Exit'
  }

  const EXIST_MESSAGE =
    "'Labels has been found in this project, What would You like to do?'"

  const NOT_EXIST_MESSAGE =
    'You don`t have any label actions configured, Would You like to add label actions now?'

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
      .then(answer => {
        if (answer['labels-exist'] === CHOICES.ADD) {
          addLabel()
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
      .then(answer => {
        if (answer['labels-default'] === 'Yes') {
          addLabel()
        }
      })
  }
}

//TODO remove checkLabels after release
checkLabels()
