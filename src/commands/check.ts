/* eslint-disable no-restricted-imports */
import {Command} from '@oclif/command'
import * as glob from 'glob'
import * as fs from 'fs'
import * as inquirer from 'inquirer'
import * as jsdiff from 'diff'
import * as colors from 'colors'

export default class Check extends Command {
  compareTemplates(file: string, newTemplate: string, _equal: boolean) {
    const actualTemplate = fs.readFileSync(file, 'utf-8')
    const diff = jsdiff.diffChars(actualTemplate, newTemplate)

    diff.forEach(part => {
      const color = part.added ? 'green' :
        part.removed ? 'red' : 'grey'

      if (color !== 'grey')
        _equal = false

      process.stdout.write(colors[color](part.value))
    })

    return _equal
  }

  async checkPRTemplate() {
    let equal = true

    let pr_template_exists = false
    const newTemplate = fs.readFileSync(`${__dirname}/files/PULL_REQUEST_TEMPLATE.md`, 'utf-8')
    glob.sync('**/PULL_REQUEST_TEMPLATE.md').forEach(file => {
      pr_template_exists = true

      this.log('You already have PR template in Your repository')
      equal = this.compareTemplates(file, newTemplate, equal)

      if (equal)
        return this.log('No changes between actual and new template')

      return inquirer.prompt({
        name: 'template-pr',
        type: 'list',
        message: 'Would You like to update a pull request template?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)',
      }).then(answer => {
        if (answer['template-pr'] === 'Yes') {
          fs.writeFile('PULL_REQUEST_TEMPLATE.md', newTemplate, 'utf-8', err => {
            return err ? this.log(`Error: ${err}`) : this.log('PR template updated successfully')
          })
        }
      })
    })

    if (!pr_template_exists) {
      return inquirer.prompt({
        name: 'template-pr',
        type: 'list',
        message: 'You don`t have a Pull Request Template, Would You like to generate it?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)',
      }).then(answer => {
        if (answer['template-pr'] === 'Yes') {
          fs.writeFile('PULL_REQUEST_TEMPLATE.md', newTemplate, 'utf-8', err => {
            return err ? this.log(`Error: ${err}`) : this.log('PR template generated successfully')
          })
        }
      })
    }
  }

  async run() {
    const availableOptions: any = [
      {
        name: 'PR template',
        status: false,
      },
    ]
    let counter = 1
    return Promise.all(availableOptions.map(async option => {
      this.log(`Checking ${counter} of ${availableOptions.length}`)
      const {name} = option
      counter++
      if (name === 'PR template')
        await this.checkPRTemplate()
    })).then(() => {
      // console.log(123)
      if (availableOptions.filter(option => option.status === true).length === availableOptions.length) {
        this.log('Check finished')
      }
    })
  }
}
