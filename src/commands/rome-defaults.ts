import { Command } from '@oclif/command'

import { checkRomeDefaults } from '../features/rome-defaults'

export default class RomeDefaults extends Command {
  static description = 'execute rome init'

  async run() {
    return checkRomeDefaults()
  }
}
