import {Command} from '@oclif/command'
import {checkPRTemplate} from '../common'

export default class TemplatePr extends Command {
  async run() {
    return checkPRTemplate()
  }
}
