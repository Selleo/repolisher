import {Command} from '@oclif/command'
import {checkPRTemplate, checkDefaultIssueTemplate} from '../common'
import * as inquirer from 'inquirer'
export default class Init extends Command {
  async run() {
    return inquirer.prompt({
      name: 'what-to-do',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Setup PR Template', 'Setup Default Issue Template', 'Finish'],
    }).then(answer => {
      if (answer['what-to-do'] === 'Setup PR Template') {
        checkPRTemplate()
      } else if (answer['what-to-do'] === 'Setup Default Issue Template') {
        checkDefaultIssueTemplate()
      } else
        return this.log('tu nie')
    })
  }
}
