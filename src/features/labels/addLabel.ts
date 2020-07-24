import * as inquirer from 'inquirer'
import * as path from 'path'
import * as fs from 'fs'

import { getLabelsActionsTeampltes } from '../../files/getLabelsActionsTemplates'
import { map, findIndex } from 'lodash'
import { addLabelConfigurationFiles } from './addLabelsConfig'

export const addLabel = () => {
  const templates = getLabelsActionsTeampltes()
  const labelNames = map(
    templates,
    el => el.substr(el.lastIndexOf('/') + 1).split('.')[0]
  )
  inquirer
    .prompt({
      name: 'create-label',
      type: 'rawlist',
      message: 'Choose to what workflow you want to add labels',
      choices: [...labelNames],
      default: labelNames[0],
      suffix: '\n(ctrl + c to exit)'
    })
    .then(choice => {
      const answer = choice['create-label']
      const templateIndex = findIndex(templates, template => template.includes(answer))
      const choosenTemplatePath = templates[templateIndex]
      const choosenTemplate = fs.readFileSync(choosenTemplatePath, 'utf-8')
      fs.mkdirSync('.github/workflows', { recursive: true })
      fs.writeFile(
        path.join('.github', 'workflows', `${answer}.yml`),
        choosenTemplate,
        'utf-8',
        err => {
          return err
            ? console.log(`Error: ${err}`)
            : console.log(`${answer} Label file generated successfully`)
        }
      )
      addLabelConfigurationFiles(answer)
    })
}
