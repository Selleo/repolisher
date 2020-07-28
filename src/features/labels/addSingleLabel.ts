import * as path from 'path'
import * as fs from 'fs'

import { getLabelsActionsTeampltes } from '../../files/getLabelsActionsTemplates'
import { findIndex } from 'lodash'

import { addLabelConfigurationFiles } from './addLabelsConfig'
import { labelNamesTranslations } from './labelNamesTranslations'
import { LabelTranslations } from './models'

export const addSingleLabel = (pickedChoice: string) => {
  const templates = getLabelsActionsTeampltes()
  const keyValueFromPickedChoice = (
    labelNamesTranslations: LabelTranslations,
    pickedChoice: string
  ) => {
    return Object.keys(labelNamesTranslations).find(
      key => labelNamesTranslations[key] === pickedChoice
    )
  }

  const label = keyValueFromPickedChoice(labelNamesTranslations, pickedChoice) as string
  const templateIndex = findIndex(templates, template => template.includes(label))
  const choosenTemplatePath = templates[templateIndex]
  const choosenLabel = fs.readFileSync(choosenTemplatePath, 'utf-8')

  fs.mkdirSync('.github/workflows', { recursive: true })
  fs.writeFile(
    path.join('.github', 'workflows', `${label}.yml`),
    choosenLabel,
    'utf-8',
    err => {
      return err
        ? console.log(`Error: ${err}`)
        : console.log(`${label} file generated successfully`)
    }
  )
  addLabelConfigurationFiles(label)
}
