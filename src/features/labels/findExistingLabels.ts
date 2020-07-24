import * as glob from 'glob'
import * as path from 'path'

export const findExistingLabels = () =>
  glob
    .sync(path.join('.github', 'workflows', '*.yaml'))
    .concat(glob.sync(path.join('.github', 'workflows', '.yml')))
