import * as inquirer from 'inquirer'
import * as fs from 'fs'

export const updatePrTemplate = async (filePath: string, template: string) => {
  await inquirer
    .prompt({
      name: 'template-pr',
      type: 'list',
      message: 'Would you like to update a pull request template?',
      choices: ['Yes', 'No'],
      default: 'Yes',
      suffix: '\n(ctrl + c to exit)'
    })
    .then(answer => {
      if (answer['template-pr'] === 'Yes') {
        fs.writeFile(filePath, template, 'utf-8', err => {
          return err
            ? console.log(`Error: ${err}`)
            : console.log('PR template updated successfully')
        })
      }
    })
}
