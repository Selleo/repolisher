import * as glob from 'glob'
import * as path from 'path'
import * as fs from 'fs'
import * as emoji from 'node-emoji'

import { newDefaultIssueTemplatePath } from '../../files/locateDefaultFile'
import { compareTextWithDiff } from '../../utils/utils'

export const findExistingDefaultIssueTemplate = () => {
  const template = fs.readFileSync(newDefaultIssueTemplatePath, 'utf-8')
  const existingIssueTemplates = glob
    .sync(path.join('.github', 'issue_template.md'))
    .concat(glob.sync(path.join('docs', 'issue_template.md')))
    .concat(glob.sync(path.join('.github', 'ISSUE_TEMPLATE', 'issue_template.md')))
    .concat(glob.sync(path.join('docs', 'ISSUE_TEMPLATE', 'issue_template.md')))
    .concat(glob.sync(path.join('ISSUE_TEMPLATE', 'issue_template.md')))
    .concat(glob.sync('issue_template.md'))

  const [filePath] = existingIssueTemplates
  const exists = !!existingIssueTemplates.length
  const isLatest = exists && compareTextWithDiff(filePath, template)

  if (existingIssueTemplates.length > 1)
    console.log(
      `${emoji.get('warning')}You have duplicated default PR template located at:\n` +
        existingIssueTemplates.join('\n')
    )

  return {
    exists,
    isLatest,
    name: 'default-issue-template',
    path: filePath
  }
}
