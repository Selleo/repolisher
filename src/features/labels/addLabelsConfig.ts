import * as path from 'path'
import * as fs from 'fs'
import { findIndex } from 'lodash'

import { getLabelsConfigs } from '../../files/getLabelsConfigs'

export const addLabelConfigurationFiles = (choosenAnswer: string) => {
  const labelConfigs = getLabelsConfigs()
  const labelIndex = findIndex(labelConfigs, config => config.includes(choosenAnswer))
  const labelPath = labelConfigs[labelIndex]
  const choosenConfig = fs.readFileSync(labelPath, 'utf-8')

  fs.mkdirSync('.github', { recursive: true })
  fs.writeFile(
    path.join('.github', `${choosenAnswer}.yml`),
    choosenConfig,
    'utf-8',
    err => {
      return err ? console.log(`Error: ${err}`) : null
    }
  )

  if (choosenAnswer === 'qa-labeler') {
    const featureConfigIndex = findIndex(labelConfigs, config =>
      config.includes('feature-branch')
    )
    const featureConfigPath = labelConfigs[featureConfigIndex]
    const featureBranchConfig = fs.readFileSync(featureConfigPath, 'utf-8')

    fs.mkdirSync('.github', { recursive: true })
    fs.writeFile(
      path.join('.github', `feature-branch-labeler.yml`),
      featureBranchConfig,
      'utf-8',
      err => {
        return err ? console.log(`Error: ${err}`) : null
      }
    )
  }
}
