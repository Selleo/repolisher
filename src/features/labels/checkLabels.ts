import * as inquirer from 'inquirer'
import * as colors from 'colors/'
import * as Table from 'cli-table3'

import { findExistingLabels } from './findExistingLabels'
import { addLabels } from './addLabels'
import { booleanToEmoji } from '../../utils/utils'

export const checkLabels = () => {
  const labels = findExistingLabels()
  const noLabels = !labels.some(({ exists }) => exists)
  const allLatest = labels.every(({ isLatest }) => isLatest)

  const EXIST_MESSAGE =
    'Labels has been found in this project, What would you like to do?'
  const NOT_EXIST_MESSAGE =
    'You don`t have any labels actions configured, Would you like to add label actions now?'
  const CHOICES = {
    CANCEL: 'Leave it as it is',
    EDIT: 'Restore Labels actions to default'
  }
  const labelsStatuses = new Table({ head: ['name', 'exists', 'latest'] })
  labels.forEach(label =>
    labelsStatuses.push([
      label.name,
      booleanToEmoji(label.exists),
      booleanToEmoji(label.isLatest)
    ])
  )

  if (allLatest) return console.log(colors.bold('All labels are up to date.'))

  if (noLabels)
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
        if (answer['labels-default'] === 'Yes') return await addLabels(labels)
      })

  return inquirer
    .prompt({
      name: 'labels-exist',
      type: 'list',
      message: EXIST_MESSAGE,
      choices: [...Object.values(CHOICES)],
      default: 'Yes',
      suffix: `\n${labelsStatuses.toString()}\n(ctrl + c to exit)`
    })
    .then(async answer => {
      if (answer['labels-exist'] === CHOICES.EDIT) return await addLabels(labels)
      else return
    })
}
