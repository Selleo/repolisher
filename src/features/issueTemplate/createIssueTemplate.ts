import * as inquirer from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'

import { newDefaultIssueTemplatePath } from '../../files/locateDefaultFile'

type Mode = 'create' | 'update'

export const createIssueTemplate = async (mode: Mode, filePath?: string) => {
  const template = fs.readFileSync(newDefaultIssueTemplatePath, 'utf-8')
  const writePath =
    filePath || path.join('.github', 'ISSUE_TEMPLATE', 'issue_template.md')

  mode === 'create' &&
    fs.mkdirSync(path.join('.github', 'ISSUE_TEMPLATE'), { recursive: true })
  fs.writeFile(writePath, template, 'utf-8', err => {
    return err
      ? console.log(`Error: ${err}`)
      : console.log(`Default Issue Template ${mode}d successfully`)
  })
}
