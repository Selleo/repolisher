import { Command } from '@oclif/command'
import { checkPRTemplate, checkDefaultIssueTemplate } from '../common'

export default class Check extends Command {
  async run() {
    interface Option {
      name: string
      status: boolean
      callback: Function
    }

    const availableOptions: Option[] = [
      {
        name: 'PR Template',
        status: false,
        callback: checkPRTemplate
      },
      {
        name: 'Default Issue Template',
        status: false,
        callback: checkDefaultIssueTemplate
      }
    ]

    let index = 1
    for (const option of availableOptions) {
      this.log(`Checking ${index} of ${availableOptions.length}`)
      await option.callback()
      index++
    }
    this.log('Check finished')
  }
}
