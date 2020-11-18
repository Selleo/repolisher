import * as fs from 'fs'

import { findExistingDefaultIssueTemplate } from '../issueTemplate'
import { newDefaultIssueTemplatePath } from '../../files/locateDefaultFile'
import { createIssueTemplate } from './createIssueTemplate'
import { updateIssueTemplate } from './updateIssueTemplate'

export const checkDefaultIssueTemplate = () => {
  const template = fs.readFileSync(newDefaultIssueTemplatePath, 'utf-8')
  const existingIssueTemplate = findExistingDefaultIssueTemplate()

  if (!existingIssueTemplate.exists) return createIssueTemplate(template)
  if (existingIssueTemplate.isLatest) return console.log('Your Default Issue template is up to date.')

  return updateIssueTemplate(existingIssueTemplate.path, template)
}
