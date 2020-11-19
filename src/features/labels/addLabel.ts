import * as path from 'path'
import * as fs from 'fs'

import { addLabelConfigurationFiles } from './addLabelsConfig'

type Mode = 'create' | 'update'

export const addLabel = (mode: Mode, labelName: string, filePath?: string) => {
  const templatePath = path.join('src', 'files', 'labelTeamplates', `${labelName}.yml`)
  const template = fs.readFileSync(templatePath, 'utf8')
  const isCreate = mode === 'create'
  const writePath = filePath || path.join('.github', 'workflows', `${labelName}.yml`)

  isCreate && fs.mkdirSync(path.join('.github', 'workflows'), { recursive: true })
  fs.writeFile(
    writePath,
    template,
    'utf-8',
    err => {
      if (err) return console.log(`Error: ${err}`)
      else {
        addLabelConfigurationFiles(labelName)
        return console.log(`${labelName} file ${mode}d successfully`)
      }
    }
  )
}
