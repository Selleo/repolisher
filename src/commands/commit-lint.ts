import { Command } from '@oclif/command'
import { checkCommitLint } from '../features/commitLint/checkCommitLint'

export default class CommitLint extends Command {
  async run() {
    checkCommitLint()
  }
}
