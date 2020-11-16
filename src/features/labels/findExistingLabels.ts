import * as path from 'path'
import * as fs from 'fs'

import { LabelsNames, LabelStatus } from './models'
import { checkIfFileIsLatestVersion } from '../../utils/utils'

const directoryPath = path.join('.github', 'workflows')
const templatesPath = path.join('src', 'files', 'labelTeamplates')

export const findExistingLabels = () => {
  const labelTemplates = fs.readdirSync(templatesPath)
  const projectLabels = fs.existsSync(directoryPath) ? fs.readdirSync(directoryPath) : []

  const labelerFiles: LabelStatus[] = labelTemplates.map(label => {
    const labelWithNoExtension = label.replace('.yml', '')
    const projectLabelName = projectLabels.find(userLabels =>
      userLabels.includes(labelWithNoExtension)
    ) // in case of user files are .yaml, not .yml

    const isLatest =
      !!projectLabelName &&
      checkIfFileIsLatestVersion(
        path.join(directoryPath, projectLabelName),
        path.join(templatesPath, label)
      )

    return {
      exists: !!projectLabelName,
      isLatest,
      name: labelWithNoExtension as LabelsNames,
      path: projectLabelName
    }
  })

  return labelerFiles
}
