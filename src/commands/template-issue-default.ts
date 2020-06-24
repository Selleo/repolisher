import {Command} from '@oclif/command'
import {checkDefaultIssueTemplate} from '../common'

export default class TemplatePr extends Command {
  async run() {
    return checkDefaultIssueTemplate()
  }
}
