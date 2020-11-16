import { Command } from '@oclif/command'

import { checkLabels } from '../common'

export default class Update extends Command {
  async run() {
    checkLabels()
  }
}
