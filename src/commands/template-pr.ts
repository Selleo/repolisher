/* eslint-disable no-console */
/* eslint-disable no-restricted-imports */

import {Command} from '@oclif/command'
import * as glob from 'glob'
import * as fs from 'fs'
import * as inquirer from 'inquirer'
import * as jsdiff from 'diff'
import * as colors from 'colors'

export default class TemplatePr extends Command {
  async run() {
    let equal = true
    const compareTemplates = (files: string[], newTemplate: string) => {
      const actualTemplate = fs.readFileSync(files[0], 'utf-8')
      const diff = jsdiff.diffChars(actualTemplate, newTemplate)

      diff.forEach(part => {
        const color = part.added ? 'green' :
          part.removed ? 'red' : 'grey'

        if (color !== 'grey')
          equal = false

        process.stdout.write(colors[color](part.value))
      })
    }

    glob('**/PULL_REQUEST_TEMPLATE.md', (err, files) => {
      if (err)
        this.log(`Error: ${err}`)

      const newTemplate = fs.readFileSync(`${__dirname}/files/PULL_REQUEST_TEMPLATE.md`, 'utf-8')

      if (files.length > 0) {
        this.log('You already have PR template in Your repository')
        compareTemplates(files, newTemplate)
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
      }

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
    })
  }
}
