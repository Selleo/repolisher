import {Command} from '@oclif/command'
import {checkPRTemplate} from '../common'

export default class Check extends Command {
  async run() {
    interface Option {
      name: string;
      status: boolean;
    }

    const availableOptions: Option[] = [
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
        await checkPRTemplate()
    })).then(() => {
      if (availableOptions.filter(option => option.status === true).length === availableOptions.length) {
        this.log('Check finished')
      }
    })
  }
}
