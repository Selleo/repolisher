import { Command } from '@oclif/command'
import {
  checkPRTemplate,
  checkDefaultIssueTemplate,
  checkLicense,
  checkLabels
} from '../common'
import * as inquirer from 'inquirer'
export default class Init extends Command {
  async run() {
    return inquirer
      .prompt({
        name: 'what-to-do',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'Setup PR Template',
          'Setup Default Issue Template',
          'Setup License',
          'Setup Labels actions',
          'Finish'
        ]
      })
      .then(answer => {
        if (answer['what-to-do'] === 'Setup PR Template') {
          checkPRTemplate()
        } else if (answer['what-to-do'] === 'Setup Default Issue Template') {
          checkDefaultIssueTemplate()
        } else if (answer['what-to-do'] === 'Setup License') {
          checkLicense()
        } else if (answer['what-to-do'] === 'Setup Labels actions') {
          checkLabels()
        } else return this.log('tu nie')
      })
  }
}
