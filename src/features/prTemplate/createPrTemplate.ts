import * as fs from 'fs'
import * as path from 'path'

import { newPullRequestTemplatePath } from '../../files/locateDefaultFile'

type Mode = 'create' | 'update'

export const createPrTemplate = async (mode: Mode, filePath?: string) => {
  const template = fs.readFileSync(newPullRequestTemplatePath, 'utf-8')
  const writePath = filePath || path.join('.github', 'PULL_REQUEST_TEMPLATE.md')

  mode === 'create' && fs.mkdirSync('.github', { recursive: true })
  fs.writeFile(writePath, template, 'utf-8', err => {
    return err
      ? console.log(`Error: ${err}`)
      : console.log(`PR template ${mode}d successfully`)
  })

}
