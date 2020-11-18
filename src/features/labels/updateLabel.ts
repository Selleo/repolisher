import * as path from 'path'
import * as fs from 'fs'

import { addLabelConfigurationFiles } from './addLabelsConfig'

export const updateLabel = (labelName: string, fileName: string) => {
  const templatePath = path.join('src', 'files', 'labelTeamplates', `${labelName}.yml`)
  const template = fs.readFileSync(templatePath, 'utf8')

  fs.mkdirSync(path.join('.github', 'workflows'), { recursive: true })
  fs.writeFile(path.join('.github', 'workflows', fileName), template, 'utf-8', err => {
    if (err) return console.log(`Error: ${err}`)
    else {
      addLabelConfigurationFiles(labelName)
      return console.log(`${labelName} files generated successfully`)
    }
  })
}
