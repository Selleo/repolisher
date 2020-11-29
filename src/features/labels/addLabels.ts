import * as inquirer from 'inquirer'

import { addLabel } from './addLabel'
import { labelNamesTranslations } from './labelNamesTranslations'
import { LabelsNames, LabelStatus } from './models'

export const addLabels = async (labels: LabelStatus[]) => {
  const choices = labels
    .filter(({ exists, isLatest }) => !exists || !isLatest)
    .map(({ name }) => ({ value: name, name: labelNamesTranslations[name] }))

  await inquirer
    .prompt({
      name: 'add-label',
      type: 'checkbox',
      message: 'Choose to what workflow you want add or update labels',
      choices,
      suffix: '\n(ctrl + c to exit)'
    })
    .then(answer => {
      const pickedChoicesArr: LabelsNames[] = answer['add-label']
      pickedChoicesArr.forEach(pickedChoice => {
        const selectedLabel = labels.find(
          ({ name }) => name === pickedChoice
        ) as LabelStatus
        const mode = selectedLabel.exists ? 'update' : 'create'
        addLabel(mode, pickedChoice, selectedLabel.path)
      })
    })
}
