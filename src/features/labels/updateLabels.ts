import * as inquirer from 'inquirer'

import { LabelsNames, LabelStatus } from './models'
import { labelNamesTranslations } from './labelNamesTranslations'
import { updateLabel } from './updateLabel'
import { addLabel } from './addLabel'

export const updateLabels = async (labels: LabelStatus[]) => {
  const choices = labels
    .filter(({ exists, isLatest }) => !exists || !isLatest)
    .map(({ name }) => ({ value: name, name: labelNamesTranslations[name] }))

  await inquirer
    .prompt({
      choices,
      message: 'Choose to what workflow you want add labels',
      name: 'update-label',
      suffix: '\n(ctrl + c to exit)',
      type: 'checkbox'
    })
    .then(answer => {
      const pickedChoicesArr: LabelsNames[] = answer['update-label']
      pickedChoicesArr.forEach(pickedChoice => {
        const selectedLabel = labels.find(
          ({ name }) => name === pickedChoice
        ) as LabelStatus
        selectedLabel.exists
          ? updateLabel(pickedChoice, selectedLabel.path!)
          : addLabel(pickedChoice)
      })
    })
}
