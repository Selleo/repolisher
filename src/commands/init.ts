import {Command} from '@oclif/command'
import * as inquirer from 'inquirer'
import * as glob from 'glob'
import * as fs from 'fs'
import * as jsdiff from 'diff'
import * as colors from 'colors'

export default class Init extends Command {
  async run() {
    // const questions = [
    //   {
    //     name: 'what-to-do',
    //     type: 'list',
    //     message: 'What would you like to do?',
    //     choices: ['PR Template', 'Finish']
    //   }
    // ]
    return inquirer.prompt({
      name: 'what-to-do',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Setup PR Template', 'Finish'],
    }).then(answer => {
      if (answer['what-to-do'] === 'Setup PR Template') {
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
      } else
        return this.log('tu nie')
    })
  }
}
