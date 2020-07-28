import * as path from 'path'
import * as fs from 'fs'

import { compareLabels } from './compareLabels'
import { forEach, includes } from 'lodash'

import { getLabelsActionsTeampltes } from '../../files/getLabelsActionsTemplates'
import { findIndex } from 'lodash'
import { findExistingLabels } from './findExistingLabels'

import { addLabelConfigurationFiles } from './addLabelsConfig'
import { labelNamesTranslations } from './labelNamesTranslations'
import { LabelTranslations } from './models'

export const addSingleLabel = (pickedChoice: string, mode: 'edit' | 'add') => {
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
  const existingLabels = findExistingLabels()

  const checkIfFileExistInRepo = (file: string) => {
    let result: boolean = false
    forEach(existingLabels, label => {
      if (label.includes(file)) {
        result = true
      }
    })
    return result
  }

  const getExistingLabelIndex = (label: string) => {
    let existingIndex: number = -1
    forEach(existingLabels, (existingLabel, index) => {
      if (includes(existingLabel, label)) {
        existingIndex = index
        return
      }
    })

    return existingIndex
  }

  const writeLabelToDrive = () => {
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

  const updateLabelOnDrive = () => {
    const fileExistsInRepo = checkIfFileExistInRepo(label)
    if (!fileExistsInRepo) {
      writeLabelToDrive()
    } else {
      let equal = true
      const existingLabelIndex = getExistingLabelIndex(label)
      const existingFile = fs.readFileSync(existingLabels[existingLabelIndex], 'utf-8')

      equal = compareLabels(existingFile, choosenLabel, equal)
      if (equal) {
        return console.log('No changes between actual and new label action')
      } else {
        writeLabelToDrive()
      }
    }
  }

  mode === 'add' ? writeLabelToDrive() : updateLabelOnDrive()
}
