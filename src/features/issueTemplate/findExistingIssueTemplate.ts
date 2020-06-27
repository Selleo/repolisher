import * as glob from 'glob'
import * as path from 'path'

export const findExistingDefaultIssueTemplate = () =>
  glob
    .sync(path.join('.github', 'issue_template.md'))
    .concat(glob.sync(path.join('docs', 'issue_template.md')))
    .concat(glob.sync(path.join('.github', 'ISSUE_TEMPLATE', 'issue_template.md')))
    .concat(glob.sync(path.join('docs', 'ISSUE_TEMPLATE', 'issue_template.md')))
    .concat(glob.sync(path.join('ISSUE_TEMPLATE', 'issue_template.md')))
    .concat(glob.sync('issue_template.md'))
