import * as inquirer from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'

export const createPrTemplate = async (template: string) => {
  await inquirer
    .prompt({
      name: 'template-pr',
      type: 'list',
      message: 'You don`t have a Pull Request Template, Would you like to generate it?',
      choices: ['Yes', 'No'],
      default: 'Yes',
      suffix: '\n(ctrl + c to exit)'
    })
    .then(answer => {
      if (answer['template-pr'] === 'Yes') {
        fs.mkdirSync('.github', { recursive: true })
        fs.writeFile(
          path.join('.github', 'PULL_REQUEST_TEMPLATE.md'),
          template,
          'utf-8',
          err => {
            return err
              ? console.log(`Error: ${err}`)
              : console.log('PR template generated successfully')
          }
        )
      }
    })
}
