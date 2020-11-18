import * as glob from 'glob'
import * as path from 'path'

export const getLabelsConfigs = () =>
  glob
    .sync(path.join('src', 'files', 'labelConfigurations', '*.yaml'))
    .concat(glob.sync(path.join('src', 'files', 'labelConfigurations', '*.yml')))
