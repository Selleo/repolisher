import {Command} from '@oclif/command'
import {checkPRTemplate, checkDefaultIssueTemplate} from '../common'

export default class Check extends Command {
  async run() {
    interface Option {
      name: string;
      status: boolean;
    }

    const availableOptions: Option[] = [
      {
        name: 'PR Template',
        status: false,
      },
      {
        name: 'Default Issue Template',
        status: false,
      },
    ]
    let counter = 1
    return Promise.all(availableOptions.map(async option => {
      this.log(`Checking ${counter} of ${availableOptions.length}`)
      const {name} = option
      counter++
      if (name === 'PR Template')
        await checkPRTemplate()
      if (name === 'Default Issue Template')
        await checkDefaultIssueTemplate()
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
