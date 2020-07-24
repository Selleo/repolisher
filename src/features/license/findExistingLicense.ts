import * as glob from 'glob'
import * as path from 'path'

export const findExistingDefaultLicenseTemplate = () =>
  glob
    .sync(path.join('.github', 'license.md'))
    .concat(glob.sync(path.join('.github', 'license.txt')))
    .concat(glob.sync(path.join('.github', 'LICENSE', 'license.md')))
    .concat(glob.sync(path.join('.github', 'LICENSE', 'license.txt')))
    .concat(glob.sync(path.join('docs', 'license.md')))
    .concat(glob.sync(path.join('docs', 'license.txt')))
    .concat(glob.sync('license.md'))
    .concat(glob.sync('license.txt'))
    .concat(glob.sync(path.join('LICENSE', 'license.txt')))
    .concat(glob.sync(path.join('LICENSE', 'license.md')))
