import * as inquirer from 'inquirer'
import * as fs from 'fs'

export const updateIssueTemplate = async (filePath: string, template: string) => {
  await inquirer
    .prompt({
      name: 'template-issue-default',
      type: 'list',
      message: 'Would you like to update a Default Issue Template?',
      choices: ['Yes', 'No'],
      default: 'Yes',
      suffix: '\n(ctrl + c to exit)'
    })
    .then(answer => {
      if (answer['template-issue-default'] === 'Yes') {
        fs.writeFile(filePath, template, 'utf-8', err => {
          return err
            ? console.log(`Error: ${err}`)
            : console.log('Default Issue Template updated successfully')
        })
      }
    })
}
