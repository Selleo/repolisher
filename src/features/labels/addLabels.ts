import * as inquirer from 'inquirer'

import { addLabel } from './addLabel'
import { labelNamesTranslations } from './labelNamesTranslations'

export const addLabels = async () => {
  const choices = Object.entries(labelNamesTranslations).map(([value, name]) => ({
    value,
    name
  }))

  await inquirer
    .prompt({
      name: 'create-label',
      type: 'checkbox',
      message: 'Choose to what workflow you want add labels',
      choices,
      suffix: '\n(ctrl + c to exit)'
    })
    .then(answer => {
      const pickedChoicesArr: string[] = answer['create-label']
      pickedChoicesArr.forEach(pickedChoice => addLabel(pickedChoice))
    })
}
