import * as glob from 'glob'
import * as path from 'path'

export const getLabelsActionsTeampltes = () =>
  glob
    .sync(path.join('src', 'files', 'labelTeamplates', '*.yaml'))
    .concat(glob.sync(path.join('src', 'files', 'labelTeamplates', '*.yml')))
