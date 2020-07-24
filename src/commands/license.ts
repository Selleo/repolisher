import { Command } from '@oclif/command'
import { checkLicense } from '../common'

export default class License extends Command {
  async run() {
    return checkLicense()
  }
}
