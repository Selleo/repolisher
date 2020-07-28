import * as inquirer from 'inquirer'

import { addSingleLabel } from './addSingleLabel'
import { labelNamesTranslations } from './labelNamesTranslations'

export const addLabels = async () => {
  const choices = [...Object.values(labelNamesTranslations)]
  await inquirer
    .prompt({
      name: 'create-label',
      type: 'checkbox',
      message: 'Choose to what workflow you want add labels',
      choices,
      default: choices[0],
      suffix: '\n(ctrl + c to exit)'
    })
    .then(answer => {
      const pickedChoicesArr: string[] = answer['create-label']
      pickedChoicesArr.forEach(pickedChoice => addSingleLabel(pickedChoice))
    })
}
