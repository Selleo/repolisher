import * as glob from 'glob'
import * as path from 'path'
import * as fs from 'fs'
import * as emoji from 'node-emoji'

import { newPullRequestTemplatePath } from '../../files/locateDefaultFile'
import { compareTextWithDiff } from '../../utils/utils'

export const findExistingPRTemplate = () => {
  const template = fs.readFileSync(newPullRequestTemplatePath, 'utf-8')
  const existingPrTemplates = glob
    .sync(path.join('.github', 'PULL_REQUEST_TEMPLATE.md'))
    .concat(glob.sync(path.join('docs', 'PULL_REQUEST_TEMPLATE.md')))
    .concat(glob.sync('PULL_REQUEST_TEMPLATE.md'))

  const [filePath] = existingPrTemplates
  const exists = !!existingPrTemplates.length
  const isLatest = exists && compareTextWithDiff(filePath, template)

  if (existingPrTemplates.length > 1)
    console.log(
      `${emoji.get('warning')} You have duplicated default PR template located at:\n` +
        existingPrTemplates.join('\n')
    )

  return {
    exists,
    isLatest,
    name: 'pr-template',
    path: filePath
  }
}
