import * as inquirer from 'inquirer'

import { findExistingCommitLint } from './findExistingCommitLint'
import { createCommitLint } from './createCommitLint'

export const checkCommitLint = async () => {
  const {
    commitLintCliExists,
    commitLintConfigExists,
    exists,
    huskyVer,
    huskyExists,
    isLatest
  } = findExistingCommitLint()

  const outDateHusky = huskyVer && Number(huskyVer.match(/\d/)) < 1

  if (outDateHusky) return console.log('Please upgrade your husky version to 4.x')

  if (isLatest) return console.log('Your commit lint git hook is up to date.')

  const message = exists
    ? 'Would you like to update a commit lint git hook?'
    : 'You don`t have a commit lint git hook. Would you like to generate it?'

  await inquirer
    .prompt({
      name: 'commit-lint',
      type: 'list',
      message,
      choices: ['Yes', 'No'],
      default: 'Yes',
      suffix: '\n(ctrl + c to exit)'
    })
    .then(answer => {
      if (answer['commit-lint'] === 'Yes') {
        createCommitLint(huskyExists, commitLintCliExists, commitLintConfigExists)
      }
    })
}
