import { Command } from '@oclif/command'
import { checkLabels } from '../common'

export default class Labels extends Command {
  async run() {
    return checkLabels()
  }
}
