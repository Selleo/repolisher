import * as inquirer from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'

export const createIssueTemplate = async (template: string) => {
  await inquirer
    .prompt({
      name: 'template-issue-default',
      type: 'list',
      message: 'You don`t have a Default Issue Template, Would you like to generate it?',
      choices: ['Yes', 'No'],
      default: 'Yes',
      suffix: '\n(ctrl + c to exit)'
    })
    .then(answer => {
      if (answer['template-issue-default'] === 'Yes') {
        fs.mkdirSync(path.join('.github', 'ISSUE_TEMPLATE'), { recursive: true })
        fs.writeFile(
          path.join('.github', 'ISSUE_TEMPLATE', 'issue_template.md'),
          template,
          'utf-8',
          err => {
            return err
              ? console.log(`Error: ${err}`)
              : console.log('Default Issue Template generated successfully')
          }
        )
      }
    })
}
