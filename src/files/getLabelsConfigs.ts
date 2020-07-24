import * as glob from 'glob'
import * as path from 'path'

export const getLabelsConfigs = () =>
  glob
    .sync(
      path.join(__dirname, '..', '..', 'src', 'files', 'labelConfigurations', '*.yaml')
    )
    .concat(
      glob.sync(
        path.join(__dirname, '..', '..', 'src', 'files', 'labelConfigurations', '*.yml')
      )
    )
