import {Command} from '@oclif/command'
import {checkPRTemplate} from '../common'
import * as inquirer from 'inquirer'
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
        checkPRTemplate()
      } else
        return this.log('tu nie')
    })
  }
}
