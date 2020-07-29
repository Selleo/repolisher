import * as glob from 'glob'
import * as path from 'path'

export const getLabelsActionsTeampltes = () =>
  glob
    .sync(path.join(__dirname, '..', '..', 'src', 'files', 'labelTeamplates', '*.yaml'))
    .concat(
      glob.sync(
        path.join(__dirname, '..', '..', 'src', 'files', 'labelTeamplates', '*.yml')
      )
    )
