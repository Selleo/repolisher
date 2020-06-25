import {Command} from '@oclif/command'
import {checkPRTemplate, checkDefaultIssueTemplate} from '../common'

export default class Check extends Command {
  async run() {
    interface Option {
      name: string;
      status: boolean;
      callback: Function;
    }

    const availableOptions: Option[] = [
      {
        name: 'PR Template',
        status: false,
        callback: checkPRTemplate,
      },
      {
        name: 'Default Issue Template',
        status: false,
        callback: checkDefaultIssueTemplate,
      },
    ]

    return Promise.all(availableOptions.map((option, index) => {
      this.log(`Checking ${index + 1} of ${availableOptions.length}`)
      return option.callback()
    })).then(() => {
      if (availableOptions.filter(option => {
        console.log(option.status)
        return option.status === true
      }).length === availableOptions.length) {
        this.log('Check finished')
      }
    })
  }
}
