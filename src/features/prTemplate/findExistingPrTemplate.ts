import * as glob from 'glob'
import * as path from 'path'

export const findExistingPRTemplate = () =>
  glob
    .sync(path.join('.github', 'PULL_REQUEST_TEMPLATE.md'))
    .concat(glob.sync(path.join('docs', 'PULL_REQUEST_TEMPLATE.md')))
    .concat(glob.sync('PULL_REQUEST_TEMPLATE.md'))
