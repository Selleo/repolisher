import * as fs from 'fs'

import { findExistingPRTemplate } from '../prTemplate'
import { newPullRequestTemplatePath } from '../../files/locateDefaultFile'
import { updatePrTemplate } from './updatePrTemplate'
import { createPrTemplate } from './createPrTemplate'

export const checkPRTemplate = () => {
  const template = fs.readFileSync(newPullRequestTemplatePath, 'utf-8')
  const existingPrTemplates = findExistingPRTemplate()

  if (!existingPrTemplates.exists) return createPrTemplate(template)
  if (existingPrTemplates.isLatest) return console.log('Your default PR template is up to date.')
  return updatePrTemplate(existingPrTemplates.path, template)
}
