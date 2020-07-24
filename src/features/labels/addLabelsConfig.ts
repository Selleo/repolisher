import * as path from 'path'
import * as fs from 'fs'

// import { getLabelsActionsTeampltes } from '../../files/getLabelsActionsTemplates'
// import { map, findIndex } from 'lodash'

import { getLabelsConfigs } from '../../files/getLabelsConfigs'

//TODO add label config files

const labelConfigs = getLabelsConfigs()

export const addLabelConfigurationFiles = choosenAnswer => {
  fs.mkdirSync('.github', { recursive: true })
  fs.writeFile(
    path.join('.github', `${choosenAnswer}.yml`),
    choosenTemplate,
    'utf-8',
    err => {
      return err ? console.log(`Error: ${err}`) : null
    }
  )
}
