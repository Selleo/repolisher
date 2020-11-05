import { Command } from '@oclif/command'
import {
  checkPRTemplate,
  checkDefaultIssueTemplate,
  checkLicense,
  checkLabels,
  checkRomeDefaults
} from '../common'
import * as inquirer from 'inquirer'

const choices = [
  'Setup PR Template',
  'Setup Default Issue Template',
  'Setup License',
  'Setup Labels actions',
  'Setup rome defaults',
  'Finish'
] as const

type Choices = typeof choices[number]

export default class Init extends Command {
  async run() {
    return inquirer
      .prompt({
        name: 'what-to-do',
        type: 'list',
        message: 'What would you like to do?',
        choices
      })
      .then((answer: { 'what-to-do': Choices }) => {
        if (answer['what-to-do'] === 'Setup PR Template') {
          checkPRTemplate()
        } else if (answer['what-to-do'] === 'Setup Default Issue Template') {
          checkDefaultIssueTemplate()
        } else if (answer['what-to-do'] === 'Setup License') {
          checkLicense()
        } else if (answer['what-to-do'] === 'Setup Labels actions') {
          checkLabels()
        } else if (answer['what-to-do'] === 'Setup rome defaults') {
          checkRomeDefaults()
        } else return this.log('Exited')
      })
  }
}
